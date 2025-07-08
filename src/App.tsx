import { useState, useEffect } from "react";
import { toast, Toaster } from "react-hot-toast"; // Import toast for user feedback
import { ChatMessage } from "./components/ChatMessage";
import { ChatInput } from "./components/ChatInput";
import { sendChatMessage } from "./services/chatService";
import type { ChatState, Message } from "./types/chat";
import Logo from "./assets/Logo.png";
import Navbar from "./components/Navbar";
import Typewriter from "typewriter-effect";
import { ChatAnimation } from "./components/ChatAnimation";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "./firebase/config";
import Carousel from "./components/Carousel";
import { LoginScreen } from "./components/LoginScreen";

// Interface for the current user's state
interface CurrentUser {
  isLoggedIn: boolean;
  storeName: string; // This will act as the StoreID
  email: string;
}

function App() {
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [showChat, setShowChat] = useState(false);
  const [chatState, setChatState] = useState<ChatState>({
    messages: [],
    isLoading: false,
    error: null,
  });
  const [inputDisabled, setInputDisabled] = useState(false);

  // Check for existing session in localStorage when the app loads
  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn');
    const storeName = localStorage.getItem('storeName');
    const email = localStorage.getItem('email'); // Get email from storage
    if (loggedIn === 'true' && storeName && email) { // Check for email
      setCurrentUser({ isLoggedIn: true, storeName, email }); // Set email in state
    }
  }, []);

  // Inactivity timer logic: Hides the chat screen after 2 minutes of inactivity
  useEffect(() => {
    let inactivityTimer: NodeJS.Timeout;

    const resetInactivityTimer = () => {
      clearTimeout(inactivityTimer);
      if (showChat) {
        inactivityTimer = setTimeout(() => {
          setShowChat(false); // Go back to the carousel screen
        }, 120000); // 120,000 milliseconds = 2 minutes
      }
    };

    const events: (keyof DocumentEventMap)[] = ["mousemove", "keydown", "touchstart"];
    events.forEach((event) => document.addEventListener(event, resetInactivityTimer));
    resetInactivityTimer(); // Initial call

    return () => {
      // Cleanup listeners and timer when component unmounts or `showChat` changes
      events.forEach((event) => document.removeEventListener(event, resetInactivityTimer));
      clearTimeout(inactivityTimer);
    };
  }, [showChat]);

  // Initialize session message count
  useEffect(() => {
    if (!sessionStorage.getItem("messageCount")) {
      sessionStorage.setItem("messageCount", "0");
    }
  }, []);

  // Handles successful login, storing user data in state and localStorage
  const handleLoginSuccess = (storeName: string, email: string) => {
    const userData = { isLoggedIn: true, storeName, email };
    setCurrentUser(userData);
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('storeName', storeName);
    localStorage.setItem('email', email); // Store email
  };

  // Handles user logout
  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.clear(); // Clears all items (isLoggedIn, storeName, email)
    sessionStorage.clear();
    setShowChat(false);
    toast.success("You have been logged out.");
  };

  // Clears the current chat session messages from the UI
  const handleClearChat = () => {
    setChatState({ messages: [], isLoading: false, error: null });
    sessionStorage.removeItem('last3Messages'); // Clear memory of last messages
    toast.success("Chat has been cleared.");
  };

  // Handles sending a new message
  const handleMessage = async (content: string) => {
    if (!currentUser) {
      toast.error("You must be logged in to send a message.");
      return;
    }

    const messageCount = parseInt(sessionStorage.getItem("messageCount") || "0", 10);
    // Rate limiting: 20 messages per minute
    if (messageCount >= 20) {
      setInputDisabled(true);
      setShowChat(false); // Temporarily hide chat
      toast.error("You have sent too many messages. Please wait a minute.");
      setTimeout(() => {
        sessionStorage.setItem("messageCount", "0");
        setInputDisabled(false);
      }, 60000); // 1 minute cooldown
      return;
    }

    const userMessage: Message = { role: "user", content };
    setChatState((prev) => ({ ...prev, messages: [...prev.messages, userMessage], isLoading: true, error: null }));

    // Maintain a history of the last 3 messages for context
    const previousMessages: Message[] = JSON.parse(sessionStorage.getItem('last3Messages') || '[]');
    const messagesToStore = [...previousMessages, userMessage].slice(-3);
    sessionStorage.setItem('last3Messages', JSON.stringify(messagesToStore));

    try {
      // Get response from the chat service
      const response = await sendChatMessage(messagesToStore);
      const assistantMessage: Message = { role: "assistant", content: response };
      setChatState((prev) => ({ ...prev, messages: [...prev.messages, assistantMessage], isLoading: false }));

      // **HERE IS THE CHANGE**
      // Upload the chat log to Firestore, including StoreID (storeName) and email
      await addDoc(collection(db, "messages"), {
        user: content,
        bot: response,
        timestamp: Timestamp.now(),
        storeName: currentUser.storeName, // This is the StoreID
        email: currentUser.email,         // This is the user's email
      });

      // Increment the session message count
      sessionStorage.setItem("messageCount", (messageCount + 1).toString());

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to get a response from the assistant.";
      setChatState((prev) => ({ ...prev, isLoading: false, error: errorMessage }));
      toast.error(errorMessage);
    }
  };

  // --- RENDER LOGIC ---

  // If there is no logged-in user, show the login screen
  if (!currentUser) {
    return (
      <>
        <Toaster position="top-right" />
        <LoginScreen onLoginSuccess={handleLoginSuccess} />
      </>
    );
  }

  // If the user is logged in but the chat is not active, show the carousel
  if (!showChat) {
    return <Carousel onChatClick={() => setShowChat(true)} />;
  }

  // Main chat interface
  return (
    <div className="flex flex-col h-screen bg-[#1a1a1a]">
      <Toaster position="top-right" />
      
      <Navbar
        storeName={currentUser.storeName}
        email={currentUser.email}
        onLogout={handleLogout}
        onClearChat={handleClearChat}
      />

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-4">
          {chatState.messages.length === 0 ? (
            // Welcome screen for an empty chat
            <div className="flex flex-col items-center justify-center h-full text-center p-8">
              <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mb-4">
                <img src={Logo} alt="Chat Assistant Logo" className="w-8 h-8 object-contain" />
              </div>
              <h2 className="text-2xl font-semibold text-white mb-2">
                Welcome to Danfe Tea
              </h2>
              <p className="text-white max-w-md text-lg">
                <Typewriter
                  options={{
                    strings: ["Hello! 😊 I'm your Resident Tea Expert at Danfe Tea. <br>How may I help you?"],
                    autoStart: true,
                    loop: false,
                    delay: 50,
                  }}
                />
              </p>
            </div>
          ) : (
            // Render the list of chat messages
            chatState.messages.map((message, index) => <ChatMessage key={index} message={message} />)
          )}

          {/* Show loading animation while waiting for a response */}
          {chatState.isLoading && (
            <div className="p-4 text-center text-gray-500">
              <ChatAnimation />
            </div>
          )}

          {/* Display any errors that occur */}
          {chatState.error && <div className="p-4 text-center text-red-500">{chatState.error}</div>}
        </div>
      </div>

      <ChatInput onSendMessage={handleMessage} disabled={chatState.isLoading || inputDisabled} />
    </div>
  );
}

export default App;
import { useState, useEffect } from "react";
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

function App() {
  const [showChat, setShowChat] = useState(false);
  
  const [chatState, setChatState] = useState<ChatState>({
    messages: [],
    isLoading: false,
    error: null,
  });
  let inactivityTimer: NodeJS.Timeout;
  useEffect(() => {
    const events = ["mousemove", "keydown", "touchstart"];
    events.forEach((event) => document.addEventListener(event, resetInactivityTimer));

    return () => {
      events.forEach((event) => document.removeEventListener(event, resetInactivityTimer));
      clearTimeout(inactivityTimer);
    };
  }, [showChat]);
  const resetInactivityTimer = () => {
    clearTimeout(inactivityTimer);
    if (showChat) {
      inactivityTimer = setTimeout(() => {
        setShowChat(false);
      }, 120000); // 30 seconds
    }
  };

  const [inputDisabled, setInputDisabled] = useState(false);

  // Initialize or retrieve the session message count
  useEffect(() => {
    if (!sessionStorage.getItem("messageCount")) {
      sessionStorage.setItem("messageCount", "0");
    }
  }, []);

  const handleMessage = async (content: string) => {
    const messageCount = parseInt(sessionStorage.getItem("messageCount") || "0", 10);

    if (messageCount >= 20) {
      console.log("Session Ended");
      setInputDisabled(true);
      setShowChat(false); // Return to carousel view

      // Disable input for 1 minute
      setTimeout(() => {
        sessionStorage.setItem("messageCount", "0"); // Reset session count
        setInputDisabled(false);
        console.log("Session Reset: You can chat now.");
      }, 60000);

      return;
    }

    const userMessage: Message = { role: "user", content };

    setChatState((prev) => ({
      ...prev,
      messages: [...prev.messages, userMessage],
      isLoading: true,
      error: null,
    }));

    // **Session Storage Logic for last 3 messages:**
    const previousMessagesJSON = sessionStorage.getItem('last3Messages') || '[]';
    const previousMessages: Message[] = JSON.parse(previousMessagesJSON);
    const currentMessagesToSend: Message[] = [...previousMessages, userMessage];
    const messagesToStore = currentMessagesToSend.slice(-3); // Keep only last 3
    sessionStorage.setItem('last3Messages', JSON.stringify(messagesToStore));


    try {
      // **Send only the last 3 messages (or fewer if less than 3 in session)**
      const response = await sendChatMessage(messagesToStore);

      const assistantMessage: Message = {
        role: "assistant",
        content: response,
      };

      setChatState((prev) => ({
        ...prev,
        messages: [...prev.messages, assistantMessage],
        isLoading: false,
      }));

      // **Database Upload - Keep uploading individual messages (user and bot)**
      await addDoc(collection(db, "messages"), {
        user: content,
        bot: response,
        timestamp: Timestamp.now(),
      });

      sessionStorage.setItem("messageCount", (messageCount + 1).toString());
    } catch (error) {
      setChatState((prev) => ({
        ...prev,
        isLoading: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to get response. Please try again.",
      }));
    }
  };

  if (!showChat) {
    return <Carousel onChatClick={() => setShowChat(true)} />;
  }

  return (
    <div className="flex flex-col h-screen bg-surfacea10">
      <Navbar />

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          {chatState.messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center p-8 animate-pulse">
              <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mb-4">
                <img
                  src={Logo}
                  alt="Chat Assistant Logo"
                  className="w-8 h-8 object-contain"
                />
              </div>
              <h2 className="text-2xl font-semibold text-white mb-2">
                Welcome to Danfe Tea
              </h2>
              <p className="text-white max-w-md text-lg">
                <Typewriter
                  options={{
                    strings: [
                      "Hello! 😊 I'm your Resident Tea Expert at Danfe Tea. <br>How may I help you?",
                    ],
                    autoStart: true,
                    loop: false,
                    delay: 50,
                  }}
                />
              </p>
            </div>
          ) : (
            chatState.messages.map((message, index) => (
              <ChatMessage key={index} message={message} />
            ))
          )}

          {chatState.isLoading && (
            <div className="p-4 text-center text-gray-500">
              <ChatAnimation />
            </div>
          )}

          {chatState.error && (
            <div className="p-4 text-center text-red-500">
              {chatState.error}
            </div>
          )}
        </div>
      </div>

      <ChatInput
        onSendMessage={handleMessage}
        disabled={chatState.isLoading || inputDisabled}
      />
    </div>
  );
}

export default App;
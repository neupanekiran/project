import { useState } from "react";
import { ChatAnimation, ChatMessage } from "./components/ChatMessage";
import { ChatInput } from "./components/ChatInput";
import { sendChatMessage } from "./services/chatService";
import type { ChatState, Message } from "./types/chat";
import Logo from "./assets/Logo.png";
import Navbar  from "./components/Navbar"; 
function  App() {
  const [chatState, setChatState] = useState<ChatState>({
    messages: [],
    isLoading: false,
    error: null,
  });

  const handleMessage = async (content: string) => {
    const userMessage: Message = { role: "user", content };

    setChatState((prev) => ({
      ...prev,
      messages: [...prev.messages, userMessage],
      isLoading: true,
      error: null,
    }));

    try {
      const response = await sendChatMessage([
        ...chatState.messages,
        userMessage,
      ]);
      const assistantMessage: Message = {
        role: "assistant",
        content: response,
      };

      setChatState((prev) => ({
        ...prev,
        messages: [...prev.messages,  assistantMessage],
        isLoading: false,
      }));
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

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}

        <Navbar /> 

      {/* Chat Messages */}
       <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          {chatState.messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center p-8">
              <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mb-4">
                <img
                  src={Logo}
                  alt="Chat Assistant Logo"
                  className="w-8 h-8 object-contain"
                />
              </div> 
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                Welcome to Danfe Tea
              </h2>
              <p className="text-gray-600 max-w-md">
                Hello!😊 I'm your Resident Tea Expert at Danfe Tea. <br></br>
                How may I help you?
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

      {/* Chat Input */}
      <ChatInput onSendMessage={handleMessage} disabled={chatState.isLoading} />
    </div>
  );
}

export default App;

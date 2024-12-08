
import { Bot, User } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import type { Message } from '../types/chat';

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isBot = message.role === 'assistant';

  return (
    <div className={`chat ${isBot ? 'chat-start' : 'chat-end'} `}>
      
    <div className={`chat-bubble h-auto p-4 ${isBot ? 'bg-white text-cyan-800 border-r-2' : 'bg-white text-cyan-800  border-r-2  flex  h-auto  rounded-full'}`}>
    <div className="prose prose-sm mt-2 mr-1">
        <ReactMarkdown>{message.content}</ReactMarkdown>
      </div>
      
      
    </div>
    <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
          isBot ? 'bg-blue-400 text-white' : 'bg-blue-400 text-white'
        }`}>
          {isBot ? <Bot className='roudned-full' size={20} /> : <User className='rounded-full' size={20} />}
        </div>
        
      </div>
  </div>
  
  );
}

 export function ChatAnimation(){ 

  return (
    <>
   <div className=' chat chat-start  bg-inherit flex flex-row items-center align-center rounded-full'> 
    <div className='  bg-blue-400 text-white h-10 w-10 rounded-full items-center p-2 '> 
      <Bot size={20} /> 
      </div>
    <div className='chat-bubble  border-r-2 bg-white '> 
    <span className="loading loading-dots loading-md text-slate-300"></span>
    </div> 
    </div>
    </>
  );


 } 

import React, { useState } from 'react';
import { getCareerAdvice } from '../lib/gemini';
import { ChatHeader } from './chat/ChatHeader';
import { ChatMessage } from './chat/ChatMessage';
import { ChatInput } from './chat/ChatInput';

interface Message {
  text: string;
  isBot: boolean;
}

export function ChatBot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input;
    setInput('');
    setMessages((prev) => [...prev, { text: userMessage, isBot: false }]);
    setIsLoading(true);

    try {
      const response = await getCareerAdvice(userMessage);
      setMessages((prev) => [...prev, { text: response, isBot: true }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages((prev) => [
        ...prev,
        { 
          text: "I apologize, but I encountered an error. Please try again.",
          isBot: true 
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[600px] bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <ChatHeader />
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center text-gray-500 dark:text-gray-400 mt-4">
            Start a conversation by asking a question
          </div>
        )}
        
        {messages.map((message, index) => (
          <ChatMessage 
            key={index} 
            text={message.text} 
            isBot={message.isBot}
          />
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg text-gray-800 dark:text-gray-200">
              Thinking...
            </div>
          </div>
        )}
      </div>

      <ChatInput 
        input={input}
        setInput={setInput}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
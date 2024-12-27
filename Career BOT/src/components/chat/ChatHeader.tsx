import React from 'react';
import { Bot } from 'lucide-react';

export function ChatHeader() {
  return (
    <div className="p-4 border-b bg-indigo-600 dark:bg-indigo-700 rounded-t-lg">
      <div className="text-xl text-white flex items-center gap-2 font-bold">
        <Bot className="w-6 h-6" />
        Career Assistant
      </div>
      <p className="text-indigo-100 text-sm mt-1">Ask specific questions for focused guidance</p>
    </div>
  );
}
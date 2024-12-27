import React from 'react';

interface ChatMessageProps {
  text: string;
  isBot: boolean;
}

export function ChatMessage({ text, isBot }: ChatMessageProps) {
  const cleanText = text.replace(/^\*+|\*+$/g, '').trim();
  const sections = cleanText.split('\n\n').filter(section => section.trim());
  
  return (
    <div className={`flex ${isBot ? 'justify-start' : 'justify-end'}`}>
      <div
        className={`max-w-[80%] p-3 rounded-lg ${
          isBot
            ? 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100'
            : 'bg-indigo-600 text-white dark:bg-indigo-500'
        }`}
      >
        {isBot ? (
          <div className="space-y-3">
            {sections.map((section, index) => {
              if (index === 0) {
                return (
                  <h3 key={index} className="text-lg font-semibold">
                    {section.trim()}
                  </h3>
                );
              }
              return (
                <p key={index} className="text-sm">
                  {section.trim()}
                </p>
              );
            })}
          </div>
        ) : (
          <p className="text-sm whitespace-pre-wrap">{cleanText}</p>
        )}
      </div>
    </div>
  );
}
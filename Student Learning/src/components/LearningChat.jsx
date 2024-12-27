import { useState } from 'react';
import { getChatResponse } from '../services/gemini';
import toast from 'react-hot-toast';

export default function LearningChat({ context }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sanitizeText = (text) => {
    // Remove markdown-style formatting
    return text
      .replace(/\*\*/g, '')  // Remove bold
      .replace(/\*/g, '')    // Remove italics
      .replace(/`/g, '')     // Remove code blocks
      .replace(/#{1,6}\s/g, '') // Remove headers
      .replace(/\n\s*\n/g, '\n') // Replace multiple newlines with single
      .trim();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { type: 'user', content: userMessage }]);
    setLoading(true);

    try {
      const response = await getChatResponse(context, userMessage);
      const cleanedResponse = sanitizeText(response);
      setMessages(prev => [...prev, { type: 'bot', content: cleanedResponse }]);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-semibold mb-4">Learning Assistant</h3>
      
      <div className="h-96 overflow-y-auto mb-4 space-y-4 p-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg ${
              message.type === 'user'
                ? 'bg-blue-100 ml-auto max-w-[80%]'
                : 'bg-gray-100 mr-auto max-w-[80%]'
            }`}
          >
            <p className="text-gray-800 whitespace-pre-line">
              {message.content}
            </p>
          </div>
        ))}
        {loading && (
          <div className="flex items-center space-x-2 text-gray-500">
            <div className="animate-bounce">●</div>
            <div className="animate-bounce delay-100">●</div>
            <div className="animate-bounce delay-200">●</div>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question about this topic..."
          className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50"
        >
          Send
        </button>
      </form>
    </div>
  );
}
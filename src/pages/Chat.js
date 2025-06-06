import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, User, RefreshCw, Paperclip } from 'lucide-react';

function Chat() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [uploadedFile, setUploadedFile] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();

    if (inputMessage.trim() || uploadedFile) {
      const messageContent = inputMessage;
      const userMessage = {
        id: `msg-${Date.now()}-user`,
        content: messageContent + (uploadedFile ? ` (Attached: ${uploadedFile.name})` : ''),
        role: 'user',
        timestamp: new Date().toISOString(),
      };

      setMessages(prev => [...prev, userMessage]);
      setInputMessage('');
      setUploadedFile(null);

      setTimeout(() => {
        const aiMessage = {
          id: `msg-${Date.now()}-assistant`,
          content: `Simulated response to: "${messageContent}"`,
          role: 'assistant',
          timestamp: new Date().toISOString(),
        };
        setMessages(prev => [...prev, aiMessage]);
      }, 1000);
    }
  };

  const handleRefresh = () => {
    setMessages([]);
    setInputMessage('');
    setUploadedFile(null);
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  return (
    <div className="h-screen w-full bg-gray-50 flex">
      {/* Chat box pinned to right */}
      <div className="w-[400px] ml-auto border-l border-gray-200 bg-white shadow-lg flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
          <h2 className="font-semibold text-gray-700">Chat</h2>
          <button
            onClick={handleRefresh}
            className="text-gray-500 hover:text-red-500 p-1 rounded-md hover:bg-red-100"
            title="Clear chat"
          >
            <RefreshCw size={18} />
          </button>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <h3 className="text-black font-semibold mb-2">How can I help you?</h3>
                <p className="text-gray-600 text-sm">Ask me anything or attach a file...</p>
              </div>
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {message.role === 'assistant' && (
                  <div className="flex-shrink-0 w-7 h-7 rounded-full bg-green-500 flex items-center justify-center text-white">
                    <Bot size={16} />
                  </div>
                )}
                <div
                  className={`max-w-[85%] rounded-lg px-3 py-2 text-sm ${
                    message.role === 'user'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {message.content}
                </div>
                {message.role === 'user' && (
                  <div className="flex-shrink-0 w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-white">
                    <User size={16} />
                  </div>
                )}
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div className="border-t border-gray-200 p-3">
          <form onSubmit={handleSendMessage}>
            <div className="relative flex items-center">
              {/* Text Area */}
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage(e);
                  }
                }}
                placeholder="Ask your question..."
                className="w-full pl-3 resize-none rounded-lg border border-gray-300 bg-white py-3 pr-10 text-sm text-black focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                rows={3}
              />

              {/* Send Button */}
             <button
                type="submit"
                disabled={!inputMessage.trim() && !uploadedFile}
                className={`absolute bottom-1 right-2 rounded-md p-1 ${
                inputMessage.trim() || uploadedFile
            ? 'text-blue-500 hover:bg-blue-50'
            : 'text-gray-400 cursor-not-allowed'
        }`}
      >
                <Send size={18} />
              </button>
              {/* File Upload Pin - Bottom Left */}
              <label className="absolute bottom-2 left-2 text-gray-500 hover:text-blue-500 cursor-pointer">
              <Paperclip size={18} />
              <input
                type="file"
                className="hidden"
                onChange={handleFileChange}
                />
                </label>
                </div>

            {/* Show file name if selected */}
            {uploadedFile && (
              <div className="mt-1 text-xs text-gray-500">
                Attached: <strong>{uploadedFile.name}</strong>
              </div>
            )}

            <div className="mt-1 text-xs text-gray-400">
              <span className="opacity-50">Shift + Enter for new line</span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Chat;

import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, User, RefreshCw, Paperclip } from 'lucide-react';
import axios from 'axios'



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

  const canvasRef = useRef(null)
  
  // ...existing code...

useEffect(() => {
  const canvas = canvasRef.current;
  if (!canvas) return;

  // Get the latest AI message
  const lastAI = [...messages].reverse().find(m => m.role === 'ai');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (lastAI && lastAI.text) {
    // Convert <br> and \n to line breaks, strip other HTML tags
    let text = lastAI.text
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/<\/?[^>]+(>|$)/g, '') // remove all HTML tags
      .replace(/\\n/g, '\n'); // handle escaped newlines

    // Optional: decode HTML entities
    const textarea = document.createElement('textarea');
    textarea.innerHTML = text;
    text = textarea.value;

    ctx.font = '16px Arial';
    ctx.fillStyle = '#222';
    const lineHeight = 22;
    const maxWidth = canvas.width - 20;
    let x = 10, y = 30;

    text.split('\n').forEach(paragraph => {
      let words = paragraph.split(' ');
      let line = '';
      for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + ' ';
        const metrics = ctx.measureText(testLine);
        const testWidth = metrics.width;
        if (testWidth > maxWidth && n > 0) {
          ctx.fillText(line, x, y);
          line = words[n] + ' ';
          y += lineHeight;
        } else {
          line = testLine;
        }
      }
      ctx.fillText(line, x, y);
      y += lineHeight;
    });
  }
}, [messages]);
const [showIframe, setShowIframe] = useState(false);

const lastAI = [...messages].reverse().find(m => m.role === 'ai');

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (inputMessage.trim() || uploadedFile) {
      const messageContent = inputMessage;
      // const userMessage = {
      //   // id: `msg-${Date.now()}-user`,
      //   // content: messageContent + (uploadedFile ? ` (Attached: ${uploadedFile.name})` : ''),
      //   role: 'user',
      //   text: messageContent
      //   // timestamp: new Date().toISOString(),
      // };
      const userMessage = {
  id: `msg-${Date.now()}-${Math.random()}`,
  role: 'user',
  text: messageContent
};

      setMessages(prev => [...prev, userMessage]);
      setInputMessage('');
      setUploadedFile(null);

      try{
        const res = await axios.post('http://localhost:4000/api/chat', {
          message: messageContent
        })
       const aiMessage = { 
  id: `msg-${Date.now()}-${Math.random()}`,
  role: 'ai', 
  text: res.data.reply.html_content
};
        setMessages(prev => [...prev, aiMessage])
        console.log(messages)
      } catch (error) {
        console.error('logs:', error)
        const errorMsg = { 
  id: `msg-${Date.now()}-${Math.random()}`,
  role: 'ai', 
  text: 'AI failed response' 
};
        setMessages((prev) => [...prev, errorMsg])
      }

      // setTimeout(() => {
      //   const aiMessage = {
      //     id: `msg-${Date.now()}-assistant`,
      //     content: `Simulated response to: "${messageContent}"`,
      //     role: 'assistant',
      //     timestamp: new Date().toISOString(),
      //   };
      //   setMessages(prev => [...prev, aiMessage]);
      // }, 1000);
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
    <div className="bg-gray-50  h-[90%]">
      <div className="w-[340px] ml-auto border-b border-gray-200 bg-white dark:bg-gray-900 shadow-lg flex flex-col justify-between h-full">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-300 px-4 py-3">
          <h1 className="font-semibold text-[20px] text-gray-700 font-Sans dark:text-white ">GenBuilder-AI</h1>
          <button
            onClick={handleRefresh}
            className="text-gray-500 dark:text-white hover:text-red-500 dark:hover:text-red-500 p-1 rounded-md hover:bg-red-200"
            title="Clear chat"
          >
            <RefreshCw size={18} />
          </button>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 p-4">
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <h3 className="text-black dark:text-white font-semibold mb-2">How can I help you?</h3>
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
                  className={`rounded-lg px-3 py-2 text-sm ${
                    message.role === 'user'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {message.role === 'user'
                    ? message.text
                    : 'Your page is ready. Click on the button at the bottom to preview.'}
                </div>
                {message.role === 'user' && (
                  <div className="flex-shrink-0 w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-white">
                    <User size={16} />
                  </div>
                )}
              </div>
            ))
          )}
          <div />
        </div>

        {/* Message Input */}
        <div className="border-t border-gray-200  dark:border-gray-500 p-3">
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
  className="w-full resize-none rounded-lg border border-gray-300 bg-white dark:bg-gray-800 dark:border-gray-500  px-3 pt-3 pb-5 text-sm text-black placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
  rows={2}
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
                <Send size={15} />
              </button>
              {/* File Upload Pin - Bottom Left */}
              <label className="absolute bottom-2 left-2 text-gray-500 hover:text-blue-500 cursor-pointer">
              <Paperclip size={15} />
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
       {lastAI && lastAI.text && (
          <div className="p-4 flex justify-end">
            <button
              className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={() => setShowIframe(true)}
            >
              Show AI Response
            </button>
          </div>
        )}
        {/* Canvas area for AI response */}
        {/* <div className="p-4">
          <canvas
            ref={canvasRef}
            width={300}
            height={150}
            style={{ border: '1px solid #ccc', background: '#fff', borderRadius: 8 }}
          />
        </div> */}
        {showIframe && lastAI && (
        <div
          style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}
        >
          <div
            style={{
              background: '#fff',
              borderRadius: 8,
              padding: 16,
              minWidth: 350,
              minHeight: 200,
              boxShadow: '0 2px 16px rgba(0,0,0,0.2)',
              position: 'relative'
            }}
          >
            <button
              onClick={() => setShowIframe(false)}
              style={{
                position: 'absolute',
                top: 8,
                right: 8,
                background: '#eee',
                border: 'none',
                borderRadius: '50%',
                width: 28,
                height: 28,
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
              title="Close"
            >×</button>
            <iframe
              title="AI Response"
              srcDoc={lastAI.text}
              style={{
                width: 1024,
                height: 700,
                border: '1px solid #ccc',
                borderRadius: 6
              }}
            />
          </div>
        </div>
      )}
    </div>
    
  );
}

export default Chat;

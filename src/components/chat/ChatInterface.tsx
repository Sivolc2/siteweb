import React, { useState, useRef, useEffect, ReactNode } from 'react';
import { MessageCircle, Send, Loader2, ChevronDown, ChevronUp } from 'lucide-react';
import { useChat } from './ChatContext';
import ReactMarkdown from 'react-markdown';
import type { Components } from 'react-markdown';

export const ChatInterface = () => {
  const { messages, sendMessage, isLoading, error } = useChat();
  const [input, setInput] = useState('');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isOverLimit, setIsOverLimit] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const hasMessages = messages.length > 0;
  const CHARACTER_LIMIT = 200;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const message = input.trim();
    setInput('');
    await sendMessage(message);
  };

  const toggleChat = () => {
    if (hasMessages) {
      setIsCollapsed(!isCollapsed);
    }
  };

  return (
    <div className={`fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-blue-500 transition-all duration-300 ease-in-out
      ${isCollapsed ? 'h-[60px]' : hasMessages ? 'h-[40vh]' : 'h-[120px]'}`}>
      
      {/* Header - now entirely clickable */}
      <div 
        onClick={toggleChat}
        className={`flex items-center justify-between p-3 border-b border-blue-500 cursor-pointer hover:bg-gray-800 transition-colors ${hasMessages ? '' : 'cursor-default'}`}
      >
        <div className="flex items-center gap-2 text-blue-400">
          <MessageCircle className="w-5 h-5" />
          <span className="font-mono text-sm">Chat Assistant</span>
        </div>
        {hasMessages && (
          <div className="text-blue-400">
            {isCollapsed ? (
              <ChevronUp className="w-5 h-5" />
            ) : (
              <ChevronDown className="w-5 h-5" />
            )}
          </div>
        )}
      </div>

      {/* Chat content - only show when not collapsed */}
      {!isCollapsed && (
        <div className="flex flex-col h-[calc(100%-60px)]">
          {/* Messages area - only show when there are messages */}
          {hasMessages && (
            <div className="flex-1 overflow-y-auto px-4 py-2 space-y-4">
              <div className="max-w-4xl mx-auto">
                {messages.map((msg, index) => (
                  <div
                    key={`${msg.timestamp}-${index}`}
                    className={`flex ${
                      msg.role === 'assistant' ? 'justify-start' : 'justify-end'
                    }`}
                  >
                    <div
                      className={`max-w-[85%] p-3 rounded-lg ${
                        msg.role === 'assistant'
                          ? 'bg-gray-800 text-gray-300'
                          : 'bg-blue-600 text-white'
                      }`}
                    >
                      <div className="text-sm break-words">
                        <ReactMarkdown
                          components={{
                            p: ({ node, children, ...props }) => (
                              <p className="mb-1 last:mb-0" {...props}>{children}</p>
                            ),
                            pre: ({ node, children, ...props }) => (
                              <pre className="bg-black/30 p-2 rounded my-1 overflow-x-auto" {...props}>
                                {children}
                              </pre>
                            ),
                            code: ({ node, children, ...props }) => (
                              <code className="bg-black/30 px-1 py-0.5 rounded font-mono text-xs" {...props}>
                                {children}
                              </code>
                            ),
                            ul: ({ node, children, ...props }) => (
                              <ul className="list-disc ml-4 my-1" {...props}>{children}</ul>
                            ),
                            ol: ({ node, children, ...props }) => (
                              <ol className="list-decimal ml-4 my-1" {...props}>{children}</ol>
                            ),
                            li: ({ node, children, ...props }) => (
                              <li className="my-0.5" {...props}>{children}</li>
                            ),
                          }}
                        >
                          {msg.content.trim().replace(/\n{3,}/g, '\n\n')}
                        </ReactMarkdown>
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </div>
          )}

          {/* Error message */}
          {error && (
            <div className="max-w-4xl mx-auto px-4 text-red-500 text-sm mb-2">{error}</div>
          )}

          {/* Input form */}
          <div className="p-4 border-t border-blue-500">
            <div className="max-w-4xl mx-auto">
              <form onSubmit={handleSubmit} className="flex items-center gap-2">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => {
                      const newValue = e.target.value;
                      if (newValue.length <= CHARACTER_LIMIT) {
                        setInput(newValue);
                        setIsOverLimit(false);
                      } else {
                        setIsOverLimit(true);
                      }
                    }}
                    placeholder="Ask about Clovis' projects, skills, or experiences."
                    className={`w-full bg-gray-800 border rounded px-4 py-2 text-gray-300 text-sm font-mono focus:outline-none focus:border-blue-400 ${
                      isOverLimit ? 'border-red-500' : 'border-gray-700'
                    }`}
                    disabled={isLoading}
                  />
                  <div className={`absolute right-2 bottom-[-20px] text-xs ${
                    isOverLimit ? 'text-red-500' : 'text-gray-500'
                  }`}>
                    {input.length}/{CHARACTER_LIMIT}
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={isLoading || !input.trim() || isOverLimit}
                  className="p-2 text-blue-400 hover:text-blue-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Send className="w-5 h-5" />
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}; 
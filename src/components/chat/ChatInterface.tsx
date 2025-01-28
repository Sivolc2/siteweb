import React, { useState, useRef, useEffect, ReactNode } from 'react';
import { MessageCircle, Send, Loader2, ChevronDown, ChevronUp } from 'lucide-react';
import { useChat } from './ChatContext';
import ReactMarkdown from 'react-markdown';
import type { Components } from 'react-markdown';

export const ChatInterface = () => {
  const { messages, sendMessage, isLoading, error } = useChat();
  const [input, setInput] = useState('');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const hasMessages = messages.length > 0;

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 80)}px`;
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [input]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    if (input.length > 200) {
      alert('Please keep your message under 200 characters');
      return;
    }

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
        <div className="flex flex-col h-[calc(100%-60px)] relative">
          {/* Messages area - shrinks to accommodate input */}
          {hasMessages && (
            <div className="flex-1 overflow-y-auto px-4 py-2 space-y-4 pb-[140px]">
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
            <div className="max-w-4xl mx-auto px-4 text-red-500 text-sm">{error}</div>
          )}

          {/* Input form - now fixed at bottom */}
          <div className="absolute bottom-0 left-0 right-0 border-t border-blue-500 bg-gray-900">
            <div className="max-w-4xl mx-auto">
              <form onSubmit={handleSubmit} className="p-4 bg-gray-800">
                <div className="flex gap-2">
                  <textarea
                    ref={textareaRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask me about this website..."
                    className="flex-1 bg-gray-700 text-white rounded-lg p-2 min-h-[40px] max-h-[80px] resize-none overflow-y-auto"
                    style={{ wordWrap: 'break-word' }}
                    maxLength={200}
                    rows={1}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSubmit(e);
                      }
                    }}
                  />
                  <button
                    type="submit"
                    disabled={isLoading || !input.trim()}
                    className="bg-blue-600 text-white p-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <Send className="w-5 h-5" />
                    )}
                  </button>
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  {input.length}/200 characters
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}; 
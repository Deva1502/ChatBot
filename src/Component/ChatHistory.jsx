import React from 'react';
import './ChatHistory.css';
import ReactMarkdown from 'react-markdown';

// No need for formatMessage function since we're using ReactMarkdown

export function ChatHistory({ messages }) {
  return (
    <div className="chat-history">
      {messages.map((message, index) => (
        <div 
          key={index} 
          className={`message-container ${message.isUser ? 'user-message' : 'bot-message'}`}
        >
          <div className="message-avatar">
            <div className="avatar-circle">
              {message.isUser ? 'U' : 'C'}
            </div>
          </div>
          <div className="message-bubble">
            {message.isUser ? (
              <div className="message-text">{message.text}</div>
            ) : (
              <div className="message-text markdown-content">
                <ReactMarkdown>{message.text}</ReactMarkdown>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
import { useState } from 'react';
import './ChatInput.css';

export function ChatInput({ onSendMessage, disabled }) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <div className="chat-input-container">
      <form onSubmit={handleSubmit} className="chat-input-form">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask Your question..."
          disabled={disabled}
          className="chat-input"
          autoFocus
        />
        <button 
          type="submit" 
          disabled={!message.trim() || disabled}
          className={`send-button ${(!message.trim() || disabled) ? 'disabled' : ''}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
      </form>
      <div className="input-footer">
        <span className="branding">Powered by ChatApp</span>
        {disabled && <span className="status-indicator">Processing...</span>}
      </div>
    </div>
  );
}
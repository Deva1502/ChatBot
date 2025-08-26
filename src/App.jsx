import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { ChatInput } from "./Component/ChatInput";
import { ChatHistory } from "./Component/ChatHistory";
import { ThemeToggle } from "./Component/ThemeToggle";
import "./App.css";

function App() {
  const [messages, setMessages] = useState([
    {
      text: "Hi there! I'm Chantty AI. How can I help you today?",
      isUser: false,
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom whenever messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  async function handleSendMessage(userMessage) {
    if (!userMessage.trim()) return;

    // Add user message to chat
    setMessages((prev) => [...prev, { text: userMessage, isUser: true }]);

    // Set loading state
    setIsLoading(true);
    setIsTyping(true);

    try {
      // Make API call to Gemini
      const response = await axios({
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${import.meta.env.VITE_GOOGLE_API_KEY}`,
        data: {
          contents: [
            {
              parts: [
                {
                  text: userMessage,
                },
              ],
            },
          ],
        },
      });

      console.log("API Response:", response.data);

      // Extract bot response from API
      let botResponse = "Sorry, I couldn't generate a response.";

      if (
        response.data &&
        response.data.candidates &&
        response.data.candidates[0]?.content?.parts?.length > 0
      ) {
        botResponse = response.data.candidates[0].content.parts[0].text;
      }

      // Simulate gradual typing effect
      setIsTyping(false);

      // Add bot response to chat
      setMessages((prev) => [...prev, { text: botResponse, isUser: false }]);
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      setMessages((prev) => [
        ...prev,
        {
          text: `Error: ${error.message || "Failed to get response"}`,
          isUser: false,
        },
      ]);
      setIsTyping(false);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="chatbot-container">
      <header className="chatbot-header">
        <div className="logo-container">
          <div className="logo-icon">C</div>
          <h1>ChatApp Assistant</h1>
        </div>
        <div className="header-actions">
          <ThemeToggle />
        </div>
      </header>

      <main className="chatbot-main">
        <ChatHistory messages={messages} />

        {isTyping && (
          <div className="message-container bot-message">
            <div className="message-avatar">
              <div className="avatar-circle">C</div>
            </div>
            <div className="message-bubble">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </main>

      <footer className="chatbot-footer">
        <ChatInput onSendMessage={handleSendMessage} disabled={isLoading} />
      </footer>
    </div>
  );
}

export default App;

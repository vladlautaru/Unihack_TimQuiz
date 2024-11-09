import React, { useState, useRef } from 'react';
import '../css/Chatbox.css';
import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI('AIzaSyBNmOqyrUxTrgOirYuj48hHbM7EBjzOvMg');
function ChatBox() {
    const [messages, setMessages] = useState([
        { text: 'Hi there 👋\nHow can I help you today?', type: 'incoming' }
    ]);
    const [inputValue, setInputValue] = useState('');
    const chatboxRef = useRef(null);
    const chatInputRef = useRef(null);

    // Function to add a new message to the chat
    const addMessage = (message, type) => {
        setMessages((prevMessages) => [
            ...prevMessages,
            { text: message, type }
        ]);
        setTimeout(() => {
            if (chatboxRef.current) {
                chatboxRef.current.scrollTo(0, chatboxRef.current.scrollHeight);
            }
        }, 100);
    };

    // Function to handle sending a message
    const handleSendMessage = () => {
        if (!inputValue.trim()) return;

        // Add the user's message
        addMessage(inputValue, 'outgoing');

        // Clear the input field
        setInputValue('');

        // Add the "Thinking..." message
        addMessage('Thinking...', 'incoming');

        // Simulate a response after 600ms
        setTimeout(() => {
            addMessage('The answer is yes', 'incoming');
        }, 600);
    };

    // Handle input height adjustment
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    // Handle pressing enter to send message
    const handleInputKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey && window.innerWidth > 800) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <div>
            <button className="chatbot-toggler" onClick={() => document.body.classList.toggle('show-chatbot')}>
                <span className="material-symbols-rounded">mode_comment</span>
                <span className="material-symbols-outlined">close</span>
            </button>

            <div className="chatbot">
                <header>
                    <h2>Chatbot</h2>
                    <span
                        className="close-btn material-symbols-outlined"
                        onClick={() => document.body.classList.remove('show-chatbot')}
                    >
            close
          </span>
                </header>

                <ul className="chatbox" ref={chatboxRef}>
                    {messages.map((msg, index) => (
                        <li key={index} className={`chat ${msg.type}`}>
                            {msg.type === 'incoming' && (
                                <span className="material-symbols-outlined">smart_toy</span>
                            )}
                            <p>{msg.text}</p>
                        </li>
                    ))}
                </ul>

                <div className="chat-input">
          <textarea
              ref={chatInputRef}
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleInputKeyDown}
              placeholder="Enter a message..."
              spellCheck="false"
              required
          />
                    <span className="material-symbols-rounded" onClick={handleSendMessage}>
            send
          </span>
                </div>
            </div>
        </div>
    );
}

export default ChatBox;

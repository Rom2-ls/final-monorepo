import React, { useState, useRef, useEffect } from 'react';
import { Conversation } from './LeftSidebar';
import './Chat.css';

interface Message {
    id: number;
    text: string;
    sender: string;
    timestamp: number;
}

interface ChatProps {
    selectedConversation: Conversation | null;
}

const Chat: React.FC<ChatProps> = ({ selectedConversation }) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState<string>('');

    const chatContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = () => {
        if (newMessage.trim() === '') return;

        const message: Message = {
            id: messages.length + 1,
            text: newMessage,
            sender: 'Me',
            timestamp: Date.now(),
        };

        setMessages([...messages, message]);
        setNewMessage('');
    };

    return (
        <div className="chat-container">
            <div className="chat-header">
                {selectedConversation && (
                    <h3>Discussion avec {selectedConversation.name}</h3>
                )}
            </div>
            <div className="chat-messages" ref={chatContainerRef}>
                {messages.map(message => (
                    <div
                        key={message.id}
                        className={`message ${message.sender === 'Me' ? 'sent' : 'received'}`}
                    >
                        <div className="message-content">
                            <span className="message-text">{message.text}</span>
                            <span className="message-timestamp">{new Date(message.timestamp).toLocaleTimeString()}</span>
                        </div>
                    </div>
                ))}
            </div>
            <div className="chat-input">
                <textarea
                    value={newMessage}
                    onChange={e => setNewMessage(e.target.value)}
                    placeholder="Écrire un message..."
                ></textarea>
                <button onClick={handleSend}>Envoyer</button>
            </div>
        </div>
    );
}

export default Chat;

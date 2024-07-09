// LeftSidebar.tsx
import React, { useState } from 'react';
import './LeftSidebar.css';

export interface Conversation {
    id: number;
    name: string;
    status: string;
}

const LeftSidebar: React.FC<{ setSelectedConversation: (conversation: Conversation | null) => void }> = ({ setSelectedConversation }) => {
    const [conversations, setConversations] = useState<Conversation[]>([
        { id: 1, name: 'John Doe', status: 'online' },
        { id: 2, name: 'Jane Smith', status: 'offline' },
        { id: 3, name: 'Alice Johnson', status: 'online' },
    ]);

    const handleConversationClick = (conversation: Conversation) => {
        setSelectedConversation(conversation);
    };

    return (
        <div className="left-sidebar">
            <div className="logo-container">
                <img src="/path/to/logo.png" alt="Logo" className="logo" />
            </div>
            <div className="actions">
                <button className="new-message-btn">
                    <i className="fas fa-comment"></i> Nouveau message
                </button>
                <i className="fas fa-search search-icon"></i>
            </div>
            <div className="conversations">
                <h3>Mes conversations</h3>
                {conversations.map(conversation => (
                    <div
                        key={conversation.id}
                        className={`conversation`}
                        onClick={() => handleConversationClick(conversation)}
                    >
                        <div className={`status-indicator ${conversation.status === 'online' ? 'green' : conversation.status === 'offline' ? 'grey' : 'orange'}`}></div>
                        <span className="person-name">{conversation.name}</span>
                    </div>
                ))}
            </div>
            <div className="settings">
                <button className="settings-btn">
                    <i className="fas fa-cog"></i> Paramètres
                </button>
                <button className="logout-btn">
                    <i className="fas fa-sign-out-alt"></i> Déconnexion
                </button>
            </div>
        </div>
    );
}

export default LeftSidebar;

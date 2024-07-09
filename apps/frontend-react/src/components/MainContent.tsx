import React from 'react';
import './MainContent.css';
import { type Conversation } from './LeftSidebar';
import Chat from './Chat';

interface MainContentProps {
    selectedConversation: Conversation | null;
}

const MainContent: React.FC<MainContentProps> = ({ selectedConversation }) => {
    return (
        <div className="main-content">
            {selectedConversation ? (
                <Chat selectedConversation={selectedConversation} /> 
            ) : (
                <div className="no-conversation-selected">
                    Sélectionnez une conversation pour commencer le chat.
                </div>
            )}
        </div>
    );
}

export default MainContent;
    
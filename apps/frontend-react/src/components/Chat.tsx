import React, { useState, useRef, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";

import { Conversation } from "./LeftSidebar";
import "./Chat.css";

const GET_MESSAGES_BY_GROUP = gql`
  query Get_Messages_By_Group($groupId: String!) {
    messagesByGroup(groupId: $groupId) {
      id
      content
      user {
        name
      }
      createdAt
    }
  }
`;

interface ChatProps {
  selectedConversation: Conversation | null;
}

const Chat: React.FC<ChatProps> = ({ selectedConversation }) => {
  const [newMessage, setNewMessage] = useState<string>("");
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const {
    data: messages,
    loading: messagesLoading,
    error: messagesError,
  } = useQuery<any>(GET_MESSAGES_BY_GROUP, {
    variables: {
      groupId: "clydieym60002zzav447se3eo",
    },
  });

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {};

  if (messagesLoading) return <div>Loading...</div>;
  if (messagesError) return <div>Error: {messagesError.message}</div>;

  console.log(messages.messagesByGroup);

  return (
    <div className="chat-container">
      <div className="chat-header">
        {selectedConversation && <h3>{selectedConversation.name}</h3>}
      </div>

      <div className="chat-messages" ref={chatContainerRef}>
        {messages.messagesByGroup.map((message: any) => (
          <div
            key={message.id}
            className={`message ${message.sender === "Me" ? "sent" : "received"}`}
          >
            <div className="message-content">
              <span className="message-text">{message.content}</span>
              <span className="message-timestamp">
                {new Intl.DateTimeFormat("fr-FR", {
                  year: "numeric",
                  timeZone: "Europe/Paris",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                }).format(message.createdAt)}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="chat-input">
        <textarea
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Écrire un message..."
        ></textarea>
        <button onClick={handleSend}>Envoyer</button>
      </div>
    </div>
  );
};

export default Chat;

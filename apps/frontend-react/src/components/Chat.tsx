import React, { useRef, useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useQuery, gql } from "@apollo/client";
import { useParams } from "react-router-dom";

import "./Chat.css";
import { io } from "socket.io-client";

const GET_GROUP = gql`
  query Get_Group($id: String!) {
    group(id: $id) {
      id
      name
      users {
        id
        name
        email
      }
    }
  }
`;

const GET_MESSAGES_BY_GROUP = gql`
  query Get_Messages_By_Group($groupId: String!) {
    messagesByGroup(groupId: $groupId) {
      id
      content
      createdAt
      user {
        id
        name
      }
    }
  }
`;

type MessageInputs = {
  content: string;
  userId: string;
  groupId: string;
};

const Chat: React.FC = () => {
  const { groupId } = useParams();
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [currentUser] = useState(
    JSON.parse(localStorage.getItem("user") || "{}")
  );

  const socket = io("http://localhost:3100");

  socket.on("connect", function () {
    console.log("Connected");
    socket.emit("identity", 0, (response: any) =>
      console.log("Identity:", response)
    );
  });
  socket.on("newMessage", function (data) {
    console.log("newMessage", data);
  });

  const { register, handleSubmit, reset } = useForm<MessageInputs>({
    defaultValues: {
      content: "",
      userId: currentUser.id,
      groupId: groupId,
    },
  });

  const {
    data: group,
    loading: groupLoading,
    error: groupError,
  } = useQuery<any>(GET_GROUP, {
    variables: {
      id: groupId,
    },
    fetchPolicy: "no-cache",
  });

  const {
    data: messages,
    loading: messagesLoading,
    error: messagesError,
  } = useQuery<any>(GET_MESSAGES_BY_GROUP, {
    variables: {
      groupId: groupId,
    },
    fetchPolicy: "no-cache",
  });

  const onSubmit: SubmitHandler<MessageInputs> = (data) => {
    reset();

    socket.emit("createMessage", {
      content: data.content,
      userId: data.userId,
      groupId: data.groupId,
    });
  };

  if (groupLoading) return <div>Loading...</div>;
  if (messagesLoading) return <div>Loading...</div>;
  if (groupError) return <div>Error: {groupError.message}</div>;
  if (messagesError) return <div>Error: {messagesError.message}</div>;

  console.log("group", group);
  console.log("messages", messages);

  return (
    <div className="chat-container">
      <div className="chat-header">{group && <h3>{group.group.name}</h3>}</div>

      <div className="chat-messages" ref={chatContainerRef}>
        {messages.messagesByGroup.map((message: any) => (
          <div
            key={message.id}
            className={`message ${message.sender === "Me" ? "sent" : "received"}`}
          >
            <div className="message-content">
              <span className="message-text">
                {message.content} {message.user.name}
              </span>
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
        <Test groupId={groupId!} />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="chat-input">
        <input
          type="text"
          {...register("content", { required: true })}
          placeholder="Écrire un message..."
        ></input>
        <button type="submit">Envoyer</button>
      </form>
    </div>
  );
};

const Test = ({ groupId }: { groupId: string }) => {
  const [messages, setMessages] = useState<any[]>([]);

  const socket = io("http://localhost:3100");

  useEffect(() => {
    socket.emit("joinRoom", { groupId });

    socket.on("newMessage", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Cleanup on unmount
    return () => {
      socket.off("newMessage");
    };
  }, [groupId, socket]);

  return (
    <div>
      {messages.map((msg, index) => (
        <p key={index}>
          {msg.content}
          {msg.user.name}
          <span className="message-timestamp">
            {new Intl.DateTimeFormat("fr-FR", {
              year: "numeric",
              timeZone: "Europe/Paris",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
            }).format(new Date(msg.createdAt))}
          </span>
        </p>
      ))}
    </div>
  );
};

export default Chat;

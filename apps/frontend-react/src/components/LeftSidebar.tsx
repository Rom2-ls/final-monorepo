// LeftSidebar.tsx
import React from "react";
import { useQuery, gql } from "@apollo/client";

import "./LeftSidebar.css";

export interface Conversation {
  id: number;
  name: string;
  status: string;
}

const GET_GROUPS_BY_USER = gql`
  query Get_Groups_By_User($userId: String!) {
    groupsByUser(userId: $userId) {
      id
      name
      messages {
        id
        content
      }
    }
  }
`;

// const GET_USERS = gql`
//   query Get_Users {
//     users {
//       id
//       name
//       email
//       password
//       messages {
//         id
//         content
//       }
//       groups {
//         id
//         name
//       }
//     }
//   }
// `;

// const MESSAGE_SUBSCRIPTION = gql`
//   subscription OnMessageAdded($groupId: String!) {
//     messageAdded(groupId: $groupId) {
//       content
//     }
//   }
// `;

const LeftSidebar: React.FC<{
  setSelectedConversation: (conversation: Conversation | null) => void;
}> = ({ setSelectedConversation }) => {
  const {
    data: groups,
    error: groupsError,
    loading: groupsLoading,
  } = useQuery(GET_GROUPS_BY_USER, {
    variables: {
      userId: "clydicdg90000zzavyjrjctk0",
    },
  });

  // const { data: message, error: messageError } = useSubscription(
  //   MESSAGE_SUBSCRIPTION,
  //   {
  //     variables: { groupId: "clydieym60002zzav447se3eo" },
  //   }
  // );

  // if (messageError) return <p>Message error :{messageError.message}</p>;

  if (groupsLoading) return <p>Groups loading...</p>;
  if (groupsError) return <p>Groups error :{groupsError.message}</p>;

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
        {groups.groupsByUser.map((group: any) => (
          <div
            key={group.id}
            className="conversation"
            onClick={() => handleConversationClick(group)}
          >
            <span className="person-name">{group.name}</span>
            <span className="message-preview">
              {group.messages.length > 0 ? group.messages[0].content : ""}
            </span>
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
};

export default LeftSidebar;

import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { Link, useNavigate } from "react-router-dom";
import "./LeftSidebar.css";

export interface Conversation {
  id: string;
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

const LeftSidebar: React.FC = () => {
  const [currentUser] = useState(
    JSON.parse(localStorage.getItem("user") || "{}")
  );
  const navigate = useNavigate();

  const {
    data: groups,
    error: groupsError,
    loading: groupsLoading,
  } = useQuery(GET_GROUPS_BY_USER, {
    variables: {
      userId: currentUser.id,
    },
  });

  if (groupsLoading) return <p>Groups loading...</p>;
  if (groupsError) return <p>Groups error :{groupsError.message}</p>;

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="side-bar">
      <div className="side-bar-logo-container">
        <img src="/path/to/logo.png" alt="Logo" className="side-bar-logo" />
      </div>
      <div className="side-bar-actions">
        <button
          className="side-bar-new-message-btn"
          onClick={() => navigate("new-group")}
        >
          Nouveau message
        </button>
      </div>
      <div className="side-bar-conversations">
        <h3>Mes conversations</h3>
        <div className="side-bar-group-container">
          {groups.groupsByUser.map((group: any) => (
            <Link
              key={group.id}
              to={`group/${group.id}`}
              className="side-bar-group-item"
            >
              {group.name}
            </Link>
          ))}
        </div>
      </div>
      <div className="side-bar-settings">
        <p>Information utilisateur</p>
        <p>{currentUser.name}</p>
        <p>{currentUser.email}</p>
        <button className="side-bar-logout-btn" onClick={handleLogout}>
          Déconnexion
        </button>
      </div>
    </div>
  );
};

export default LeftSidebar;

import { useState } from "react";
import LeftSidebar, { type Conversation } from "./LeftSidebar";
import MainContent from "./MainContent";
import "./DashboardPage.css";

const DashboardPage = () => {
  const [selectedConversation, setSelectedConversation] =
    useState<Conversation | null>(null);

  return (
    <div className="dashboard">
      <LeftSidebar setSelectedConversation={setSelectedConversation} />
      <MainContent selectedConversation={selectedConversation} />
    </div>
  );
};

export default DashboardPage;

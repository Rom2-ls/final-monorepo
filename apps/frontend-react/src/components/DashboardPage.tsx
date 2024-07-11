import LeftSidebar from "./LeftSidebar";
import "./DashboardPage.css";
import { Outlet } from "react-router-dom";

const DashboardPage = () => {
  return (
    <div className="dashboard">
      <LeftSidebar />
      <Outlet />
    </div>
  );
};

export default DashboardPage;

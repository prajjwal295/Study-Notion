import React from "react";
import Sidebar from "../components/core/Dashboard/Sidebar";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const authLoading = useSelector((store) => store.auth.loading);
  const profileLoading = useSelector((store) => store.profile.loading);

  if (profileLoading || authLoading) {
    return <div className="mt-10">Loading...</div>;
  }
  return (
    <div className="relative flex min-h-[calc(100vh-3.5rem)]">
      <Sidebar />
      <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
        <div className="mx-auto w-11/12 max-w-[1000px] py-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

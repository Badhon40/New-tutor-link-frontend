import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import Sidebar from "@/components/dashboard/student/SideBar";
import React from "react";

const Dashboardlayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen dark:bg-gray-900">
      {/* Top Navigation */}
      <DashboardNavbar />

      {/* Layout Body */}
      <div className="flex">
        {/* Sidebar */}
        <div className="md:w-64">
        <Sidebar />
        </div>

        {/* Main Content Area */}
        <main className="flex-1 pt-8 md:pt-24 p-8 pb-10 ">
          {/* Add padding inside the children area */}
          <div className="  rounded-lg shadow">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboardlayout;

import React from "react";
import { Outlet } from "react-router-dom";
// conponents
import Sidebar from "./components/Sidebar";
import Rightbar from "./components/Rightbar";
import Topbar from "./components/Topbar";
const Layout = () => {
  return (
    <>
      <Topbar/>
      <div id="main">
        <Sidebar />
        <div className="Main w-100">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Layout;

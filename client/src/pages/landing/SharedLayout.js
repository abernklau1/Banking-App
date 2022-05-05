import React from "react";
import { Navbar, Footer, SideBar } from "../../components";
import { Outlet } from "react-router-dom";
const SharedLayout = () => {
  return (
    <div>
      <Navbar />
      <SideBar />
      <div>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default SharedLayout;

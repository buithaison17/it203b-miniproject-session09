import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/footer";

const Layout = (): React.ReactElement => {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Header />


      <main className="content-container">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default Layout;

import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/footer";

const Layout = (): React.ReactElement => {
  const location = useLocation();

  const showHeaderFooter = location.pathname.startsWith("/vivu");

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {showHeaderFooter && <Header />}

      <main className="flex-1">
        <Outlet />
      </main>

      {showHeaderFooter && <Footer />}
    </div>
  );
};

export default Layout;

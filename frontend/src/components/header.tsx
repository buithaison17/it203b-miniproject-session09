import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

import Bus from "../assets/icons/bus.png";
import Mail from "../assets/icons/email-icon.png";
import Phone from "../assets/icons/call-icon.png";
import Logo from "../assets/icons/logo-web.png";
import MenuBar from "../assets/icons/Component 3.png";
import LogoSearch from "../assets/icons/search.png";

import "../components/styles/layouts.css";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: "/vivu", label: "TRANG CHỦ" },
    { path: "/vivu/introduction", label: "GIỚI THIỆU" },
    { path: "/vivu/bus-company", label: "THÔNG TIN NHÀ XE" },
    { path: "/vivu/station", label: "BẾN XE" },
    { path: "/vivu/trip", label: "TUYẾN ĐƯỜNG" },
    { path: "/check-ticket", label: "KIỂM TRA VÉ" },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="heading-nav">
      <header>
        <div className="heading">
          <div className="heading-left">
            <img src={Bus} alt="coach" />
            <span>Hệ thống Đặt Vé Xe Toàn Quốc</span>
          </div>

          <div className="heading-right">
            <div className="item">
              <img src={Mail} alt="email" />
              <span>info.vivutoday@gmail.com</span>
            </div>

            <div className="line-vertical"></div>

            <div className="item">
              <img src={Phone} alt="phone" />
              <span>1900 0152</span>
            </div>
          </div>
        </div>
      </header>

      <nav>
        <img className="menu-bar" src={MenuBar} alt="menu-bar" />

        <img src={Logo} alt="logo-web" />

        <div className="menu">
          {navItems.map((item) => (
            <div
              key={item.path}
              className={`item ${isActive(item.path) ? "link-active" : ""}`}
              onClick={() => navigate(item.path)}
            >
              <span>{item.label}</span>
            </div>
          ))}

          <div className="search">
            <img src={LogoSearch} alt="search" />
          </div>
        </div>
      </nav>
    </div>
  );
}

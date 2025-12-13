import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import Bus from "../assets/icons/bus.png";
import Mail from "../assets/icons/email-icon.png";
import Phone from "../assets/icons/call-icon.png";
import Logo from "../assets/icons/logo-web.png";
import MenuBar from "../assets/icons/Component 3.png";
import LogoSearch from "../assets/icons/search.png";
import AvatarImg from "../assets/images/character.png";

import "../components/styles/layouts.css";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [openAvatarMenu, setOpenAvatarMenu] = useState(false);


  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const menuRef = useRef<any>(null);
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenAvatarMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navItems = [
    { path: "/vivu", label: "TRANG CHỦ" },
    { path: "/vivu/introduction", label: "GIỚI THIỆU" },
    { path: "/vivu/bus-company", label: "THÔNG TIN NHÀ XE" },
    { path: "/vivu/station", label: "BẾN XE" },
    { path: "/vivu/trip", label: "TUYẾN ĐƯỜNG" },
    { path: "/vivu/check-ticket", label: "KIỂM TRA VÉ" },
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

          {/* Avatar */}
          <div
            className="avatar-box"
            onClick={() => setOpenAvatarMenu(!openAvatarMenu)}
            ref={menuRef}
          >
            <img className="avatar-img" src={AvatarImg} alt="avatar" />

            {openAvatarMenu && (
              <div className="avatar-menu">
                <div
                  className="menu-item"
                  onClick={() => navigate("/profile")}
                >
                  Thông tin tài khoản
                </div>
                <div
                  className="menu-item"
                  onClick={() => navigate("/vivu/booking-history")}
                >
                  Lịch sử đặt vé
                </div>
                <div
                  className="menu-item logout"
                  onClick={() => console.log("Logout")}
                >
                  Đăng xuất
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

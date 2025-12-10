import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Bus from "../assets/icons/bus.png";
import Mail from "../assets/icons/email-icon.png";
import Phone from "../assets/icons/call-icon.png";
import Logo from "../assets/icons/logo-web.png";

function NavItem({ href, label, active = false, onClick }: { href: string; label: string; active?: boolean; onClick?: () => void }) {
  const navigate = useNavigate();
  
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(href);
    if (onClick) onClick();
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className={`
        block lg:inline-block w-full lg:w-fit 
        px-4 lg:px-3 py-3 lg:py-0 
        text-sm font-normal lg:font-bold 
        border-b lg:border-b-0 border-white/30 lg:border-none 
        transition-all duration-200 lg:leading-[41px]

        ${active 
          ? "lg:bg-[#1190d4] lg:text-white lg:rounded-[7px] text-white" 
          : "text-white lg:text-[#1190d4]"}

        lg:hover:bg-[#1190d4]
        lg:hover:text-white
        lg:hover:rounded-[7px]
      `}
    >
      {label}
    </a>
  );
}

export default function Header() {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [userMenuOpen, setUserMenuOpen] = React.useState(false);
  const location = useLocation();

  const navItems = [
    { href: "/", label: "TRANG CHỦ" },
    { href: "/Introduction", label: "GIỚI THIỆU" },
    { href: "/bus-company", label: "THÔNG TIN NHÀ XE" },
    { href: "/station", label: "BẾN XE" },
    { href: "/trip", label: "TUYẾN ĐƯỜNG" },
    { href: "/CheckTicket", label: "KIỂM TRA VÉ" },
  ];

  const isActiveLink = (href: string) => {
    const pathname = location.pathname.toLowerCase();
    const hrefLower = href.toLowerCase();
    
    // Exact match
    if (pathname === hrefLower) {
      return true;
    }
    
    // Home page
    if (hrefLower === "/" && (pathname === "/" || pathname === "")) {
      return true;
    }
    
    return false;
  };


  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="bg-[#1295db] h-[30px] px-4 sm:px-8 lg:px-[170px]">
        <div className="h-full flex justify-between items-center">
          <div className="flex gap-1 items-center">
            <img src={Bus} alt="coach" className="w-4 h-4" />
            <span className="text-white text-xs font-normal leading-4">
              Hệ thống Đặt Vé Xe Toàn Quốc
            </span>
          </div>

          <div className="hidden md:flex gap-3">
            <div className="flex gap-1 items-center">
              <img src={Mail} alt="email" className="w-4 h-3" />
              <span className="text-white text-xs opacity-60">info.vivutoday@gmail.com</span>
            </div>

            <div className="h-4 border-l border-white/50"></div>

            <div className="flex gap-1 items-center">
              <img src={Phone} alt="phone" className="w-4 h-4" />
              <span className="text-white text-xs opacity-60">1900 0152</span>
            </div>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div
          className="fixed lg:hidden inset-0 bg-black/50 z-30 top-[90px]"
          onClick={() => setMenuOpen(false)}
        ></div>
      )}

      <nav className="bg-white h-[60px] px-4 sm:px-8 lg:px-[170px] shadow-md flex items-center justify-between lg:gap-20">
        <button
          className="lg:hidden w-7 h-7"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <div className="flex-1 lg:flex-none flex justify-end lg:justify-start">
          <img src={Logo} alt="logo-web" className="w-[100px] h-full object-contain" />
        </div>

        <div
          className={`${menuOpen ? "block" : "hidden"} lg:flex lg:relative lg:bg-transparent lg:flex-row lg:items-center lg:gap-2 lg:p-0 lg:shadow-none lg:w-auto lg:h-auto
            lg:flex-1 lg:ml-6
            fixed lg:static top-[90px] left-0 w-[250px] h-[670px]
            bg-[#1190d4] lg:bg-white shadow-lg lg:shadow-none z-40 flex-col overflow-y-auto`}
        >
          <div className="lg:hidden p-4 border-b border-white/30">
            <div className="flex items-center bg-white rounded-full px-3 py-2">
              <input
                type="text"
                placeholder="Tìm kiếm"
                className="flex-1 text-sm outline-none text-black"
              />
              <svg className="w-5 h-5 text-[#1190d4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          <div className="hidden lg:flex lg:items-center lg:gap-2">
            {navItems.map((item) => (
              <NavItem 
                key={item.label}
                href={item.href} 
                label={item.label} 
                active={isActiveLink(item.href)}
                onClick={() => setMenuOpen(false)}
              />
            ))}
          </div>

          <div className="lg:hidden flex flex-col w-full">
            {navItems.map((item) => (
              <NavItem 
                key={item.label}
                href={item.href} 
                label={item.label} 
                active={isActiveLink(item.href)}
                onClick={() => setMenuOpen(false)}
              />
            ))}
          </div>

          <div className="hidden lg:flex rounded-[5px] border border-black/5 bg-[#ffa901] p-2 ml-4">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        
            <div className="relative">
              <div
                className="w-10 h-10 bg-[#ffa901] rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition duration-150"
                onClick={() => setUserMenuOpen(!userMenuOpen)}
              >
                <span className="text-white font-bold text-sm">NV</span>
              </div>

              {userMenuOpen && (
                <div className="absolute right-0 top-[50px]  w-40 bg-white shadow-lg rounded-md overflow-hidden border-none z-50">
                  <button className="w-full text-left px-4 py-2 hover:bg-gray-100">Thông tin</button>
                  <button className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100">Đăng xuất</button>
                </div>
              )}
            </div>

      </nav>
    </header>   
  );
}

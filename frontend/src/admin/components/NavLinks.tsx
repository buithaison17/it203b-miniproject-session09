import { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/icons/logo.png";
import "../styles/Navlink.css";

export default function NavLinks() {
  const [openDropdown, setOpenDropdown] = useState(false);

  const toggleDropdown = () => {
    setOpenDropdown(!openDropdown);
  };

  return (
    <div className="dashboard-left ">
      <div className="logo-project">
        <img src={logo} className="logo-web" alt="Logo-Web" />
      </div>

      <div className="list-manager">
        <a className="dropdown-item"href="">Quản lý Người Dùng</a>
        <NavLink to="/admin/station" className="dropdown-item">Quản lý Bến Xe</NavLink>
        <a className="dropdown-item"href="">Quản lý Nhà Xe</a>
        <a className="dropdown-item"href="">Quản lý Xe</a>
        <a className="dropdown-item"href="">Quản lý Ghế</a>
        <a className="dropdown-item"href="">Quản lý Tuyến Đường</a>
        <a className="dropdown-item"href="">Quản lý Lịch Trình</a>
        <NavLink className="dropdown-item" to="/admin/order">Quản lý Đơn Vé</NavLink>
        <a className="dropdown-item"href="">Quản lý Hủy Vé</a>
        <a className="dropdown-item"href="">Quản lý Đánh Giá</a>
        <a className="dropdown-item"href="">Quản lý Banner</a>
        <a className="dropdown-item"href="">Quản lý Nhà Thanh Toán</a>

        {/* DROPDOWN MENU – React Version */}
        <div className={`dropdown ${openDropdown ? "active" : ""}`}>
          <div className="menu-link  dropdown-item" onClick={toggleDropdown}>
            Báo Cáo & Thống Kê
            <span className="dropdown-arrow">▶</span>
          </div>

          {openDropdown && (
            <div className="dropdown-content">
              <a href="" className="dropdown-item">Doanh thu</a>
              <a href="" className="dropdown-item">Khách hàng</a>
              <a href="" className="dropdown-item">Thống kê đánh giá</a>
              <a href="" className="dropdown-item">Tỷ lệ hủy</a>
              <a href="" className="dropdown-item">Thống kê thanh toán</a>
              <a href="" className="dropdown-item">Thống kê tần suất</a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

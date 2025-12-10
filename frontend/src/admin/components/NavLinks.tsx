import { NavLink } from "react-router-dom";
import logo from "../../assets/icons/logo.png";
import "../styles/Navlink.css";

export default function NavLinks() {



  return (
    <div className="dashboard-left ">
      <div className="logo-project">
        <img src={logo} className="logo-web" alt="Logo-Web" />
      </div>

      <div className="list-manager">
        <NavLink end className="dropdown-item" to="/admin">Quản lý Người Dùng</NavLink>
        <NavLink end to="/admin/station" className="dropdown-item">Quản lý Bến Xe</NavLink>
        <NavLink end className="dropdown-item" to="/admin">Quản lý Nhà Xe</NavLink>
        <NavLink end className="dropdown-item" to="/admin" >Quản lý Xe</NavLink>
        <NavLink end className="dropdown-item" to="/admin">Quản lý Ghế</NavLink>
        <NavLink end className="dropdown-item" to="/admin">Quản lý Tuyến Đường</NavLink>
        <NavLink end className="dropdown-item" to="/admin">Quản lý Lịch Trình</NavLink>
        <NavLink end to="/admin/order" className="dropdown-item">Quản lý Đơn Vé</NavLink>
        <NavLink end className="dropdown-item" to="/admin">Quản lý Hủy Vé</NavLink>
        <NavLink end className="dropdown-item" to="/admin">Quản lý Đánh Giá</NavLink>
        <NavLink end className="dropdown-item" to="/admin">Quản lý Banner</NavLink>
        <NavLink end className="dropdown-item" to="/admin">Quản lý Nhà Thanh Toán</NavLink>
        <NavLink end to="/admin/report" className="dropdown-item">Báo cáo & Thống kê</NavLink>
      </div>
    </div>
  );
}

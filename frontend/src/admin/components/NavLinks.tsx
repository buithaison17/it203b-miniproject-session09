import logo from "../../assets/icons/logo.png";
import '../styles/Navlink.css'
import { NavLink } from 'react-router-dom';

export default function NavLinks() {

  return (
        <div className="dashboard-left">
      <div className="logo-project">
        <img src={logo} className="logo-web" alt="Logo-Web" />
      </div>
      <div className="list-manager">
        <a href=""> Quản lý Người Dùng</a>
        <a href="">Quản lý Bến Xe</a>
        <a href="">Quản lý Nhà Xe</a>
        <a href="">Quản lý Xe</a>
        <a href="">Quản lý Ghế</a>
        <a href="">Quản lý Tuyến Đường</a>
        <a href="">Quản lý Lịch Trình</a>
        <NavLink to="/admin/order">Quản lý Đơn Vé</NavLink>
        <a href="">Quản lý Hủy Vé</a>
        <a href="">Quản lý Đánh Giá</a>
        <a href="">Quản lý Banner</a>
        <a href="">Quản lý Nhà Thanh Toán</a>
        <a href="">
          Báo Cáo & Thống Kê
          <span className="dropdown-arrow"> ▶</span>
          <div className="dropdown-content">
            <a href="" className="dropdown-item">
              Doanh thu
            </a>
            <a href="" className="dropdown-item">
              Khách hàng
            </a>
            <a href="" className="dropdown-item">
              Thống kê đánh giá
            </a>
            <a href="" className="dropdown-item">
              Tỷ lệ hủy
            </a>
            <a href="" className="dropdown-item">
              Thống kê thanh toán
            </a>
            <a href="" className="dropdown-item">
              Thống kê tần suất
            </a>
          </div>
        </a>
      </div>
    </div>
  )
}

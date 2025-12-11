import React from "react";

import Dmca from "../assets/icons/dmca.png";
import Bct from "../assets/icons/bct.png";
import Ncsc from "../assets/icons/ncsc.png";

import "../components/styles/layouts.css";

export default function Footer() {
  return (
    <footer>
      <div className="info-coach">
        <div className="info-1">
          <div className="news">
            <h4>Tin tức</h4>
            <p>
              Xe Limousine – Đẳng cấp hạng thương gia thời đại mới
            </p>
            <p>
              Tổng quan các bến xe Vũng Tàu – Giới thiệu thông tin lịch trình
              nhà xe
            </p>
            <p> Top 31 nhà xe limousine, xe giường nằm đi Đà Lạt </p>
          </div>

          <div className="roads">
            <h4>Tuyến đường</h4>
            <p> Xe đi Buôn Mê Thuột từ Sài Gòn </p>
            <p> Xe đi Vũng Tàu từ Sài Gòn </p>
            <p> Xe đi Nha Trang từ Sài Gòn </p>
            <p> Xe đi Đà Lạt từ Sài Gòn </p>
            <p> Xe đi Sapa từ Hà Nội </p>
            <p> Xe đi Hải Phòng từ Hà Nội </p>
            <p> Xe đi Vinh từ Hà Nội </p>
          </div>

          <div className="limousine">
            <h4>Xe Limousine</h4>
            <p> Xe Limousine đi Đà Lạt từ Sài Gòn </p>
            <p> Xe Limousine đi Vũng Tàu từ Sài Gòn </p>
            <p> Xe Limousine đi Nha Trang từ Sài Gòn </p>
            <p> Xe Limousine đi Hải Phòng từ Hà Nội </p>
            <p> Xe Limousine đi Hạ Long từ Hà Nội </p>
            <p> Xe Limousine đi Sapa Từ Hà Nội </p>
            <p> Xe Limousine đi Quảng Ninh từ Hà Nội </p>
          </div>
        </div>

        <div className="info-2">
          <div className="bus-station">
            <h4>Bến xe</h4>
            <p> Bến xe Miền Đông </p>
            <p> Bến xe Trung tâm Đà Nẵng </p>
            <p> Bến xe Gia Lâm </p>
            <p> Bến xe Mỹ Đình </p>
            <p> Bến xe An Sương </p>
            <p> Bến xe Nước Ngầm </p>
            <p> Bến xe Miền Tây </p>
          </div>

          <div className="list-title-coach">
            <div className="coach">
              <h4>Nhà xe</h4>

              <p> Xe Sao Việt </p>
              <p> Xe Hoa Mai </p>
              <p> Xe Hạ Long Travel </p>
              <p> Xe Quốc Đạt </p>
              <p> Xe Thanh Bình Xanh </p>
              <p> Xe Thiện Thành limousine </p>
              <p> Xe Hồng Sơn Phú Yên </p>
              <p> Xe Tiến Oanh </p>
            </div>

            <div className="coach">
              <p> Xe Hải Âu </p>
              <p> Xe Chín Nghĩa </p>
              <p> Xe Hưng Long </p>
              <p> Xe Kim Mạnh Hùng </p>
              <p> Xe Tuấn Hưng </p>
              <p> Xe Khanh Phong </p>
              <p> Xe An Anh (Quê Hương) </p>
              <p> Xe Minh Quốc </p>
            </div>

            <div className="coach">
              <p> Xe Văn Minh </p>
              <p> Xe Anh Tuyên </p>
              <p> Xe Điền Linh </p>
              <p> Xe Hạnh Cafe </p>
              <p> Xe Tuấn Nga </p>
              <p> Xe Ngọc Ánh Sài Gòn </p>
              <p> Xe Hùng Cường </p>
              <p> Xe Thuận Tiến </p>
            </div>
          </div>
        </div>
      </div>

      <div className="contact">
        <div className="about-us">
          <h4>Về Chúng Tôi</h4>
          <p> Giới Thiệu Vivutoday </p>
          <p> Liên Hệ </p>
          <p> Giá trị cốt lõi </p>
        </div>

        <div className="about-us">
          <h4>Hỗ Trợ</h4>
          <p> Chính sách bảo mật </p>
          <p> Chính sách điều khoản và giao dịch chung </p>
          <p> Chính sách đổi trả và hoàn tiền </p>
          <p> Chính sách thanh toán </p>
          <p> Quy chế hoạt động </p>
        </div>

        <div className="about-us">
          <h4>Liên hệ</h4>

          <div className="item-phone">
            <p className="p-1">
              Hotline: <strong>1900 0152</strong>
            </p>
            <p className="p-2">(Cước phí: 3.000 đồng/phút)</p>
          </div>

          <div className="item-phone">
            <p className="p-1">
              Hotline: <strong>1900.996.678</strong>
            </p>
            <p className="p-2">(Cước phí: 1.000 đồng/phút)</p>
          </div>

          <div className="item-phone">
            <p className="p-1">
              Hotline: <strong>1900.0179</strong>
            </p>
            <p className="p-2">
              Cước phí: 8.000 đồng/phút (Dịch vụ đặt vé nhanh 24/7)
            </p>
          </div>
        </div>

        <div className="about-us">
          <h4>Chứng nhận</h4>

          <img className="img1" src={Dmca} alt="cn1" />
          <img className="img2" src={Bct} alt="cn2" />
          <img className="img3" src={Ncsc} alt="cn3" />
        </div>
      </div>
    </footer>
  );
}

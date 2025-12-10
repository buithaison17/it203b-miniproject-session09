import React from 'react';
import Dmca from "../assets/icons/dmca.png";
import Ncsc from "../assets/icons/ncsc.png";
import Bct from "../assets/icons/bct.png";

export default function Footer() {
  return (
    <footer className="bg-[#fff7f5] pt-12 px-4 lg:px-[170px]">
      <div className="w-full flex flex-col">

        {/* ====================== ROW 1 ====================== */}
        <div className="w-full flex flex-wrap lg:flex-nowrap mb-6">

          {/* Col 1: Tin tức */}
          <div className="w-full lg:w-1/2 p-4 flex flex-col gap-2">
            <p className="text-black font-bold text-[14.766px]">Tin tức</p>
            <a href="#" className="text-[#767676] hover:opacity-60 text-[15px]">
              Xe Limousine – Đẳng cấp hạng thương gia thời đại mới
            </a>
            <a href="#" className="text-[#767676] hover:opacity-60 text-[15px]">
              Tổng quan các bến xe Vũng Tàu – Giới thiệu thông tin lịch trình nhà xe
            </a>
            <a href="#" className="text-[#767676] hover:opacity-60 text-[15px]">
              Top 31 nhà xe limousine, xe giường nằm đi Đà Lạt
            </a>
          </div>

          {/* Col 2: Tuyến đường */}
          <div className="w-full lg:w-1/4 p-4 flex flex-col gap-3">
            <p className="text-black font-bold text-[14.766px]">Tuyến đường</p>
            <a href="#" className="text-[#767676] hover:opacity-60 text-[15px]">Xe đi Buôn Mê Thuột từ Sài Gòn</a>
            <a href="#" className="text-[#767676] hover:opacity-60 text-[15px]">Xe đi Vũng Tàu từ Sài Gòn</a>
            <a href="#" className="text-[#767676] hover:opacity-60 text-[15px]">Xe đi Nha Trang từ Sài Gòn</a>
            <a href="#" className="text-[#767676] hover:opacity-60 text-[15px]">Xe đi Đà Lạt từ Sài Gòn</a>
            <a href="#" className="text-[#767676] hover:opacity-60 text-[15px]">Xe đi Sapa từ Hà Nội</a>
            <a href="#" className="text-[#767676] hover:opacity-60 text-[15px]">Xe đi Hải Phòng từ Hà Nội</a>
            <a href="#" className="text-[#767676] hover:opacity-60 text-[15px]">Xe đi Vinh từ Hà Nội</a>
          </div>

          {/* Col 3: Xe Limousine */}
          <div className="w-full lg:w-1/4 p-4 flex flex-col gap-3">
            <p className="text-black font-bold text-[14.766px]">Xe Limousine</p>
            <a href="#" className="text-[#767676] hover:opacity-60 text-[15px]">Xe Limousine đi Đà Lạt từ Sài Gòn</a>
            <a href="#" className="text-[#767676] hover:opacity-60 text-[15px]">Xe Limousine đi Vũng Tàu từ Sài Gòn</a>
            <a href="#" className="text-[#767676] hover:opacity-60 text-[15px]">Xe Limousine đi Nha Trang từ Sài Gòn</a>
            <a href="#" className="text-[#767676] hover:opacity-60 text-[15px]">Xe Limousine đi Hải Phòng từ Hà Nội</a>
            <a href="#" className="text-[#767676] hover:opacity-60 text-[15px]">Xe Limousine đi Hạ Long từ Hà Nội</a>
            <a href="#" className="text-[#767676] hover:opacity-60 text-[15px]">Xe Limousine đi Sapa Từ Hà Nội</a>
            <a href="#" className="text-[#767676] hover:opacity-60 text-[15px]">Xe Limousine đi Quảng Ninh từ Hà Nội</a>
          </div>
        </div>



        {/* ====================== ROW 2 ====================== */}
        <div className="w-full flex flex-wrap lg:flex-nowrap mb-6">

          {/* Col 1: Bến xe */}
          <div className="w-full lg:w-1/4 p-4 flex flex-col gap-3">
            <p className="text-black font-bold text-[14.766px]">Bến xe</p>
            <a href="#" className="text-[#767676] hover:opacity-60 text-[15px]">Bến xe Miền Đông</a>
            <a href="#" className="text-[#767676] hover:opacity-60 text-[15px]">Bến xe Trung tâm Đà Nẵng</a>
            <a href="#" className="text-[#767676] hover:opacity-60 text-[15px]">Bến xe Gia Lâm</a>
            <a href="#" className="text-[#767676] hover:opacity-60 text-[15px]">Bến xe Mỹ Đình</a>
            <a href="#" className="text-[#767676] hover:opacity-60 text-[15px]">Bến xe An Sương</a>
            <a href="#" className="text-[#767676] hover:opacity-60 text-[15px]">Bến xe Nước Ngầm</a>
            <a href="#" className="text-[#767676] hover:opacity-60 text-[15px]">Bến xe Miền Tây</a>
          </div>

          {/* Col 2-4: Nhà xe */}
          <div className="w-full lg:w-3/4 flex flex-wrap">

            {/* Col 2 */}
            <div className="w-full lg:w-1/3 p-4 flex flex-col gap-2">
            <p className="text-black font-bold text-[14.766px]">Nhà xe</p>
              <a href="#" className="text-[#767676] hover:opacity-60 text-[15px]">Xe Sao Việt</a>
              <a href="#" className="text-[#767676] hover:opacity-60 text-[15px]">Xe Hoa Mai</a>
              <a href="#" className="text-[#767676] hover:opacity-60 text-[15px]">Xe Hạ Long Travel</a>
              <a href="#" className="text-[#767676] hover:opacity-60 text-[15px]">Xe Quốc Đạt</a>
              <a href="#" className="text-[#767676] hover:opacity-60 text-[15px]">Xe Thanh Bình Xanh</a>
              <a href="#" className="text-[#767676] hover:opacity-60 text-[15px]">Xe Thiện Thành limousine</a>
              <a href="#" className="text-[#767676] hover:opacity-60 text-[15px]">Xe Hồng Sơn Phú Yên</a>
            </div>

            {/* Col 3 */}
            <div className="w-full lg:w-1/3 p-4 flex flex-col gap-2">
              <a href="#" className="text-[#767676] hover:opacity-60 text-[15px]">Xe Hải Âu</a>
              <a href="#" className="text-[#767676] hover:opacity-60 text-[15px]">Xe Chín Nghĩa</a>
              <a href="#" className="text-[#767676] hover:opacity-60 text-[15px]">Xe Hưng Long</a>
              <a href="#" className="text-[#767676] hover:opacity-60 text-[15px]">Xe Kim Mạnh Hùng</a>
              <a href="#" className="text-[#767676] hover:opacity-60 text-[15px]">Xe Tuấn Hưng</a>
              <a href="#" className="text-[#767676] hover:opacity-60 text-[15px]">Xe Khanh Phong</a>
              <a href="#" className="text-[#767676] hover:opacity-60 text-[15px]">Xe An Anh (Quê Hương)</a>
            </div>

            {/* Col 4 */}
            <div className="w-full lg:w-1/3 p-4 flex flex-col gap-2">
              <a href="#" className="text-[#767676] hover:opacity-60 text-[15px]">Xe Minh Quốc</a>
              <a href="#" className="text-[#767676] hover:opacity-60 text-[15px]">Xe Văn Minh</a>
              <a href="#" className="text-[#767676] hover:opacity-60 text-[15px]">Xe Anh Tuyên</a>
              <a href="#" className="text-[#767676] hover:opacity-60 text-[15px]">Xe Điền Linh</a>
              <a href="#" className="text-[#767676] hover:opacity-60 text-[15px]">Xe Hạnh Cafe</a>
              <a href="#" className="text-[#767676] hover:opacity-60 text-[15px]">Xe Tuấn Nga</a>
              <a href="#" className="text-[#767676] hover:opacity-60 text-[15px]">Xe Hùng Cường</a>
            </div>

          </div>
        </div>



        {/* ====================== ROW 3 ====================== */}
        <div className="w-full flex flex-wrap lg:flex-nowrap gap-4">

          {/* Về chúng tôi */}
          <div className="w-full lg:w-1/4 p-4 flex flex-col gap-3">
            <p className="text-black font-bold text-[14.766px]">Về Chúng Tôi</p>
            <a href="#" className="text-[#767676] hover:opacity-60 text-[15px]">Giới Thiệu Vivutoday</a>
            <a href="#" className="text-[#767676] hover:opacity-60 text-[15px]">Liên Hệ</a>
            <a href="#" className="text-[#767676] hover:opacity-60 text-[15px]">Giá trị cốt lõi</a>
          </div>

          {/* Hỗ trợ */}
          <div className="w-full lg:w-1/4 p-4 flex flex-col gap-3">
            <p className="text-black font-bold text-[14.766px]">Hỗ Trợ</p>
            <a href="#" className="text-[#767676] hover:opacity-60 text-[15px]">Chính sách bảo mật</a>
            <a href="#" className="text-[#767676] hover:opacity-60 text-[15px]">Chính sách điều khoản và giao dịch chung</a>
            <a href="#" className="text-[#767676] hover:opacity-60 text-[15px]">Chính sách đổi trả và hoàn tiền</a>
            <a href="#" className="text-[#767676] hover:opacity-60 text-[15px]">Chính sách thanh toán</a>
            <a href="#" className="text-[#767676] hover:opacity-60 text-[15px]">Quy chế hoạt động</a>
          </div>

          {/* Liên hệ */}
          <div className="w-full lg:w-1/4 p-4 flex flex-col gap-3">
            <p className="text-black font-bold text-[14.766px]">Liên hệ</p>

            <div>
              <p className="text-black text-sm">Hotline: <strong>1900 0152</strong></p>
              <p className="text-black/54 text-[11.3px]">(Cước phí: 3.000 đồng/phút)</p>
            </div>
            <div>
              <p className="text-black text-sm">Hotline: <strong>1900.996.678</strong></p>
              <p className="text-black/54 text-[11.3px]">(Cước phí: 1.000 đồng/phút)</p>
            </div>
            <div>
              <p className="text-black text-sm">Hotline: <strong>1900.0179</strong></p>
              <p className="text-black/54 text-[11.3px]">Cước phí: 8.000 đồng/phút (Dịch vụ đặt vé nhanh 24/7)</p>
            </div>
          </div>

          {/* Chứng nhận */}
          <div className="w-full lg:w-1/4 p-4 flex flex-col gap-3">
            <p className="text-black font-bold text-[14.766px]">Chứng nhận</p>
            <img src={Dmca} className="h-[55px] max-w-[98px]" />
            <img src={Ncsc} className="h-[44.53px] max-w-[98px]" />
            <img src={Bct} className="h-[37.06px] max-w-[98px]" />
          </div>

        </div>
      </div>
    </footer>
  );
}

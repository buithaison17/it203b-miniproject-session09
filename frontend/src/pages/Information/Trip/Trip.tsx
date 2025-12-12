import React from "react";
import Location from "../../../assets/icons/location.png";
import benxe from "../../../assets/imgs/ben-xe1.png";
export default function Trip() {
  const busCompanies = [
    {
      id: 1,
      name: "Tuyến đường Thanh Nhung",
      img: {benxe},
      route: "Từ tự chọn - 4X6 Xóm Giếng, Q. Ngô Quyền, TP. Bắc Giang",
    },
    {
      id: 2,
      name: "Tuyến đường Xuân Quỳnh",
      img: "/img/xuan-quynh.jpg",
      route: "Từ tự chọn - Bãi Từ Xuân, P. Lê Thành Nghị, Hải Dương",
    },
    {
      id: 3,
      name: "Tuyến đường Quang Giang ",
      img: "/img/quang-giang.jpg",
      route: "Từ tự chọn - 17 Thị trấn Phố, P. Nguyễn Trãi, TP. Hà Giang",
    },
    {
      id: 4,
      name: "Tuyến đường Văn Năm",
      img: "/img/van-nam.jpg",
      route: "Từ tự chọn - K. Phương Vĩ H., Cẩm Lệ",
    },
    {
      id: 5,
      name: "Tuyến đường Chí Tâm",
      img: "/img/chi-tam.jpg",
      route: "Từ tự chọn - Tân Lập 4, K. Phong Dảng, K. Krông, Đắk Lắk",
    },
    {
      id: 6,
      name: "Tuyến đường Hồng Thịnh",
      img: "/img/hong-thinh.jpg",
      route: "Từ tự chọn - Q. Đạm Phán, Tổ 1, P. Hưng Thanh, TP. Hà Tĩnh",
    },
    {
      id: 7,
      name: "Tuyến đường Bình Hà",
      img: "/img/binh-ha.jpg",
      route: "Từ tự chọn - Quốc Lộ 2B 1, K. Bình Minh, Lạng Sơn",
    },
    {
      id: 8,
      name: "Tuyến đường Khang Phát",
      img: "/img/khang-phat.jpg",
      route: "Từ tự chọn - 212 Nguyễn Tất Thành, Q. Thanh Khê, TP. Đà Nẵng",
    },
  ];

  return (
      <div className=" pr-[170px] pl-[170px]" >
      {/* TITLE */}
      <div className="flex pb-6 justify-center items-center gap-2 ">
        <div className="w-[3px] h-[40px] bg-yellow-500"></div>
        <h2 className="pt-4 pb-4 text-4xl font-bold tracking-wide">TUYẾN ĐƯỜNG</h2>
      </div>


      {/* GRID CARDS */}
      <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
        {busCompanies.map((bus) => (
          <div
            key={bus.id}
            className="w-[260px] h-[300px] bg-white rounded-2xl shadow hover:shadow-xl transition cursor-pointer flex flex-col ">
            <div className="relative">
              <img
                src={benxe}
                alt={bus.name}
                className="w-full h-[160px] object-cover rounded-xl"
              />
            </div>

            {/* TAG + BRAND */}
            

            {/* NAME + ROUTE */}
            <div className="p-4">
              <h3 className="font-semibold text-[15px] leading-tight ">
                {bus.name}
              </h3>
              <div className="flex items-start gap-1 mt-1">
                <div className="w-[20px] h-[13px]">
                  <img src={Location} alt="" />
                </div>
                <div>                
                  <p className="text-xs text-black line-clamp-2 flex-1">{bus.route}</p>
                  </div>
            

              </div>
            </div>

          </div>
        ))}
      </div>


      {/* PAGINATION */}
      <div className="flex justify-center gap-2 mt-10 mb-6">
        {[1, 2, 3, 4, 0, 149].map((p, i) => (
          <button
            key={i}
            className={`w-8 h-8 flex items-center justify-center rounded-full border 
              ${
                p === 1
                  ? "bg-blue-500 text-white"
                  : p === 0
                  ? "border-none text-black"
                  : "bg-white text-black hover:bg-gray-200"
              }
            `}
          >
            {p === 0 ? "..." : p}
          </button>
        ))}
      </div>


      {/* FOOTER */}
      <p className="text-sm text-gray-600 ">
        Tuyến đường – Vivutoday.com | Hệ thống đặt vé xe online cao cấp, dễ dàng tra cứu giá vé,
        lịch trình, số điện thoại, tuyến đường của 1000+ hãng xe chất lượng tốt nhất.
      </p>
    </div>
  );
}

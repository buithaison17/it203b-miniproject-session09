import React from "react";

export default function Trip() {
  const busCompanies = [
    { id: 1, name: "Nhà xe Thanh Nhung", img: "" },
    { id: 2, name: "Nhà xe Xuân Quỳnh", img: "" },
    { id: 3, name: "Nhà xe Quang Giang (Quang Tuyền)", img: "" },
    { id: 4, name: "Nhà xe Văn Năm", img: "" },
    { id: 5, name: "Nhà xe Chí Tâm", img: "" },
    { id: 6, name: "Nhà xe Hồng Thịnh", img: "" },
    { id: 7, name: "Nhà xe Bình Hà", img: "" },
    { id: 8, name: "Nhà xe Khang Phát", img: "" },
  ];

  return (
    <div className="w-full px-4 md:px-10 lg:px-32 mt-20 mb-20">

      {/* TITLE */}
      <div className="flex justify-center items-center gap-2 mb-6">
        <div className="w-[3px] h-[40px] bg-yellow-400"></div>
        <h2 className="text-4xl font-bold">TUYẾN ĐƯỜNG</h2>
      </div>

      {/* GRID CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
        {busCompanies.map((bus) => (
          <div
            key={bus.id}
            className="w-[260px] h-[286px] bg-white rounded-xl shadow hover:shadow-lg transition p-2 cursor-pointer flex flex-col"
          >
            <img
              src={bus.img}
              alt={bus.name}
              className="w-full h-[160px] object-cover rounded-lg"
            />

            <div className="mt-3 flex-1 flex flex-col">
              <h3 className="font-semibold text-[15px] leading-tight">{bus.name}</h3>
              <p className="text-xs mt-1 text-black flex-1">
                Ảnh xe + Tuyến đường chi tiết (demo)
              </p>


            </div>
          </div>
        ))}
      </div>

      {/* PAGINATION */}
      <div className="flex justify-center gap-2 mt-10">
        {[1,2,3,4,5, "...", 149].map((p, i) => (
          <button
            key={i}
            className={`w-8 h-8 flex items-center justify-center rounded-full border 
              ${p === 1 ? "bg-blue-500 text-white" : "bg-white text-black hover:bg-gray-200"}
            `}
          >
            {p}
          </button>
        ))}
      </div>

      {/* FOOTER TEXT */}
      <p className="text-center mt-10 text-sm text-gray-600 max-w-3xl mx-auto">

      </p>
    </div>
  );
}

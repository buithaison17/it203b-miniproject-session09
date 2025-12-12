import React, { useEffect } from "react";
import Location from "../../../assets/icons/location.png";
import benxe from "../../../assets/imgs/ben-xe1.png";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../../stores/store";
import { featBusCompany } from "../../../apis/bus_companies.api";
export default function BusCompany() {
  const dispatch = useDispatch<AppDispatch>();
  const { busCompany, status } = useSelector((s: RootState) => s.busCompanys);

  useEffect(() => {
    if (status === "idle") {
      dispatch(featBusCompany());
    }
  }, [dispatch, status]);

  return (
      <div className="pt-[140px] pr-[170px] pl-[170px]" >
      {/* TITLE */}
      <div className="flex pb-6 justify-center items-center gap-2 ">
        <div className="w-[3px] h-[40px] bg-yellow-500"></div>
        <h2 className="pt-4 pb-4 text-4xl font-bold tracking-wide">NHÀ XE</h2>
      </div>


      {/* GRID CARDS */}
      <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
        {busCompany.map((bus) => (
          <div
            key={bus.bus_companies_id}
            className="w-[260px] h-[300px] bg-white rounded-2xl shadow hover:shadow-xl transition cursor-pointer flex flex-col ">
            <div className="relative">
              <img
                src={bus.image || (benxe as unknown as string)}
                alt={bus.company_name}
                className="w-full h-[160px] object-cover rounded-xl"
              />
            </div>

            {/* TAG + BRAND */}
            

            {/* NAME + ROUTE */}
            <div className="p-4">
              <h3 className="font-semibold text-[15px] leading-tight ">
                {bus.company_name}
              </h3>
              <div className="flex items-start gap-1 mt-1">
                <div className="w-[20px] h-[13px]">
                  <img src={Location} alt="" />
                </div>
                <div>                
                  <p className="text-xs text-black line-clamp-2 flex-1">{bus.descriptions}</p>
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
        Nhà xe – Vivutoday.com | Hệ thống đặt vé xe online cao cấp, dễ dàng tra cứu giá vé,
        lịch trình, số điện thoại, tuyến đường của 1000+ hãng xe chất lượng tốt nhất.
      </p>
    </div>
  );
}

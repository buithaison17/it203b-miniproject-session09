import { useEffect, useState } from "react";
import RangeSlider from "../../components/RangeSlider/RangeSlider";
import CardItem from "./CardItem";
import BookingModal from "./BookingModal";
import { storage } from "../../utils/storage";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import type { Station } from "../../interfaces/Station";
import type { Bus, BusCompany, Seat } from "../../interfaces/Bus";
import type { Schedules } from "../../interfaces/Schedules";
import type { Payment, PaymentProvider } from "../../interfaces/Payment";
import type { Routes } from "../../interfaces/Routes";
import { db } from "./mockData";
import { find } from "../../utils/find";

export default function BookingScreen() {
  const [stationsData, setStationsData] = useState<Station[]>([]);
  const [busesData, setBusesData] = useState<Bus[]>([]);
  const [scheduleData, setScheduleData] = useState<Schedules[]>([]);
  const [paymentProviderData, setPaymentProviderData] = useState<
    PaymentProvider[]
  >([]);
  const [paymentData, setPaymentData] = useState<Payment[]>([]);
  const [seatsData, setSeatsData] = useState<Seat[]>([]);
  const [routesData, setRoutesData] = useState<Routes[]>([]);
  const [busCompanyData, setBusCompanyData] = useState<BusCompany[]>([]);

  //fetch data
  const fetchData = () => {
    setStationsData(db.stations);
    setBusesData(db.buses);
    setScheduleData(db.schedules);
    setSeatsData(db.seats);
    setPaymentProviderData(db.paymentProviders);
    setPaymentData(db.payments);
    setRoutesData(db.routes);
    setBusCompanyData(db.busCompanies);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // bokking modal
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [hasToken, setHasToken] = useState<boolean>(false);
  const navigate = useNavigate();
  useEffect(() => {
    setHasToken(storage.has("currentUser"));
  }, []);
  const bookingModal = () => {
    // if (!hasToken) {
    //   Swal.fire({
    //     title: "Bạn cần đăng nhập!",
    //     text: "Bạn cần đăng nhập để sử dụng chức năng đặt xe!",
    //     icon: "warning",
    //     showCancelButton: true,
    //     confirmButtonColor: "#3085d6",
    //     cancelButtonColor: "#d33",
    //     confirmButtonText: "Chuyển đến trang đăng nhập!",
    //     cancelButtonText: "Huỷ!",
    //   }).then((result) => {
    //     if (result.isConfirmed) navigate("/");
    //   });
    // } else {
    //   setIsOpenModal(isOpenModal ? false : true);
    // }
    setIsOpenModal(isOpenModal ? false : true);
  };

  //aside content
  const popularCriteria = () => {
    return (
      <>
        <aside className="flex flex-col border border-[#C0C0C0] p-6 gap-6 w-sm rounded-lg h-fit">
          <h4 className="text-[#484848] font-bold text-md/snug">
            Tiêu chí phổ biến
          </h4>
          <div>
            <div className="flex flex-row items-center gap-2">
              <input
                className="border-[#D9D9D9] rounded-xs w-4 h-4"
                type="checkbox"
                id="sale"
              />
              <label htmlFor="sale">Chuyến giảm giá (370)</label>
            </div>
            <div className="flex flex-row items-center gap-2">
              <input
                className="border-[#D9D9D9] rounded-xs w-4 h-4"
                type="checkbox"
                id="vip"
              />
              <label htmlFor="vip">Xe VIP Limousine (433)</label>
            </div>
          </div>
          <div className="space-y-8 max-w-md flex flex-col gap-6">
            <RangeSlider
              label="Giờ đi"
              min={0}
              max={1439}
              minLabel="00:00"
              maxLabel="23:59"
            />

            <RangeSlider
              label="Giá vé"
              min={0}
              max={2000000}
              minLabel="0"
              maxLabel="2.000.000"
            />
          </div>
          <div className="flex flex-col gap-3">
            <h4 className="text-[#484848] font-semibold mb-3">Nhà xe</h4>
            <input
              className="border border-[#D9D9D9] w-full p-3 rounded-sm"
              type="text"
            />
            {/* Todo : Loop render option */}
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex flex-row items-center gap-2">
                <input
                  className="border-[#D9D9D9] rounded-xs w-4 h-4"
                  type="checkbox"
                  id={String(i)}
                />
                <label htmlFor={String(i)}>Anh Huy Đất Cảng</label>
              </div>
            ))}
          </div>
          {/* ---------------------------- */}
          <button className="bg-[#EFEFEF] rounded-sm pt-[7px] pb-[7px] pr-3.5 pl-3.5 w-fit self-center hover:cursor-pointer hover:bg-[#c7c7c7]">
            Xoá đã chọn
          </button>
        </aside>
      </>
    );
  };

  return (
    <>
      <main className="pl-[170px] pr-[170px] flex flex-col gap-4">
        <div className="flex flex-row justify-center gap-4 align-middle items-center">
          <h4 className="text-[#428BCA] font-normal text-md/snug">
            Sắp xếp theo tuyến đường
          </h4>
          <select
            className="border rounded-sm h-9 w-fit p-2"
            name="depatureTime"
            id="depatureTime"
          >
            <option value="0">Giờ đi</option>
            <option value="1">1h</option>
          </select>
          <select
            className="border rounded-sm h-9 w-fit p-2"
            name="prive"
            id="prive"
          >
            <option value="0">Mức Giá</option>
            <option value="2">100k-200k</option>
          </select>
        </div>
        <div className="flex gap-10">
          {popularCriteria()}
          <section className="w-full">
            <div className="flex flex-col gap-6">
              {scheduleData.map((element, index) => {
                const busElement = find.byKey(db.buses, "id", element.bus_id);
                const routesElement = find.byKey(
                  db.routes,
                  "id",
                  element.route_id
                );
                if (busElement && routesElement) {
                  const seatsFilter = db.seats.filter(
                    (item: Seat) =>
                      item.status === "active" && item.bus_id === busElement.id
                  );
                  return (
                    <CardItem
                      key={index}
                      bookingModal={bookingModal}
                      busesData={busElement}
                      scheduleData={element}
                      routesData={routesElement}
                      totalSeats={seatsFilter ? seatsFilter.length : 0}
                    />
                  );
                }
              })}
            </div>
          </section>
        </div>
      </main>
      {isOpenModal && <BookingModal bookingModal={bookingModal} />}
    </>
  );
}

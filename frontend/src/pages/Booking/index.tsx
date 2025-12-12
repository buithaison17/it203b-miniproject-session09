import { useEffect, useState } from "react";
import RangeSlider from "../../components/RangeSlider/RangeSlider";
import CardItem from "./CardItem";
import type { Bus, Seat } from "../../interfaces/Bus";
import type { Schedules } from "../../interfaces/Schedules";
import type { Routes } from "../../interfaces/Routes";
import { db } from "./mockData";
import { find } from "../../utils/find";
import Search from "../../components/Search";
import { useAppDispatch, useAppSelector } from "../../hooks/CustomHook";
import { featBus } from "../../apis/buses.api";
import { featSchedule } from "../../apis/schedule.api";
import { featRoutes } from "../../apis/routes.api";
import { filterScheduleData, setRoutesId } from "../../stores/searchSlice";

export default function BookingScreen() {
  //redux
  const searchReducer = useAppSelector((state) => state.searchSlice);
  const { routes, status: routesStatus } = useAppSelector(
    (state) => state.routes
  );
  const { buses } = useAppSelector((state) => state.buses);
  const { schedules, status: schedulesStatus } = useAppSelector(
    (state) => state.schedules
  );
  const dispatch = useAppDispatch();
  //data
  const [busesData, setBusesData] = useState<Bus[]>([]);
  const [scheduleData, setScheduleData] = useState<Schedules[]>([]);
  const [seatsData, setSeatsData] = useState<Seat[]>([]);
  const [routesData, setRoutesData] = useState<Routes[]>([]);

  //fetch data
  const fetchData = async () => {
    await dispatch(featBus());
    await dispatch(featSchedule());
    // dispatch ghế
    await dispatch(featRoutes());
  };

  const filterData = async () => {
    await dispatch(setRoutesId({ routesData }));
    await dispatch(filterScheduleData({ scheduleData }));
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (routesStatus === "fulfilled" && schedulesStatus === "fulfilled") {
      setRoutesData(routes);
      setBusesData(buses);
      setScheduleData(schedules);
      setSeatsData(db.seats);
    }
    filterData();
  }, [
    routes,
    buses,
    schedules,
    routesData,
    busesData,
    scheduleData,
    searchReducer.input,
  ]);

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
      <main className="pl-[170px] pr-[170px] pt-12 pb-20 flex flex-col gap-4">
        <div className="flex flex-col gap-6 mb-16">
          <h1 className="text-[#1867AA] mx-auto font-bold text-2xl">
            {searchReducer.input.departure}{" "}
            <span className="font-normal">Đến</span>{" "}
            {searchReducer.input.arrival}
          </h1>
          <Search />
        </div>

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
              {searchReducer.schedulesFilter.length === 0 && (
                <p className="text-center text-2xl font-bold">
                  Hiện không có chuyến xe nào phù hợp!
                </p>
              )}
              {searchReducer.schedulesFilter.map((element, index) => {
                const busElement = find.byKey(busesData, "id", element.bus_id);
                const routesElement = find.byKey(
                  routesData,
                  "id",
                  element.route_id
                );
                if (busElement && routesElement) {
                  const seatsFilter = seatsData.filter(
                    (item: Seat) => item.bus_id === busElement.id
                  );
                  return (
                    <CardItem
                      key={index}
                      busesData={busElement}
                      scheduleData={element}
                      routesData={routesElement}
                      seats={seatsFilter}
                    />
                  );
                }
              })}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}

import { useEffect, useState } from "react";
import type { Routes } from "../interfaces/Routes";
import { useAppDispatch, useAppSelector } from "../hooks/CustomHook";
import { featRoutes } from "../apis/routes.api";
import _, { debounce } from "lodash";
import moment from "moment";
import Swal from "sweetalert2";
import { searchRoutes } from "../stores/searchSlice";
import { useNavigate } from "react-router-dom";
interface Input {
  departure: string;
  arrival: string;
  departureDate: string;
}

export default function Search() {
  const navigate = useNavigate();
  //input
  const [input, setInput] = useState<Input>({
    departure: "",
    arrival: "",
    departureDate: "",
  });

  const [departureFocus, setDepartureFocus] = useState<boolean>(false);
  const [arrivalFocus, setArrivalFocus] = useState<boolean>(false);

  const [routesData, setRoutesData] = useState<Routes[]>([]);
  const [filterDepartureRoutes, setFilterDepartureRoutes] = useState<Routes[]>(
    []
  );
  const [filterArrivalRoutes, setFilterArrivalRoutes] = useState<Routes[]>([]);

  // fetch data
  const { routes, status: routesStatus } = useAppSelector(
    (state) => state.routes
  );

  const dispath = useAppDispatch();

  const fetchData = async () => {
    await dispath(featRoutes());
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (routesStatus === "fulfilled") {
      setRoutesData(routes);
    }
  }, [routesStatus, routes]);

  // redux
  const dispatch = useAppDispatch();
  return (
    // diem khoi hanh
    <div className="flex flex-row justify-center gap-3 border border-[#E0E0E0] bg-[#FFFFFFB2] pl-4 pr-4 pt-7 pb-7 rounded-md">
      <section className="flex-1 relative">
        <div className="flex-1 bg-[#ffffffad] rounded-lg shadow-md px-6 py-5 text-center min-h-[100px] flex flex-col justify-center hover:shadow-lg transition-shadow cursor-pointer">
          <p className="text-gray-800 font-bold text-sm leading-none mb-1">
            Điểm Khởi Hành
          </p>
          <input
            type="text"
            className="text-gray-500 text-sm text-center p-2 focus:outline-none focus:ring-0"
            placeholder="Chọn điểm khởi hành"
            onFocus={() => setDepartureFocus(true)}
            onBlur={() => setTimeout(() => setDepartureFocus(false), 200)}
            value={input.departure}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              const value = event.target.value;

              setInput((prev) => ({
                ...prev,
                departure: value,
              }));

              setFilterDepartureRoutes(
                _.uniqBy(
                  routesData.filter((element: Routes) =>
                    element.departure_station_name
                      .trim()
                      .toLowerCase()
                      .includes(value.trim().toLowerCase())
                  ),
                  "departure_station_name"
                )
              );
            }}
          />
        </div>
        {departureFocus &&
          filterDepartureRoutes.length !== 0 &&
          input.departure.length !== 0 && (
            <div className="absolute bg-white w-full max-h-50 overflow-y-auto z-9999">
              <ul className="p-3">
                {filterDepartureRoutes.map((element, index) => {
                  if (element)
                    return (
                      <li
                        key={index}
                        className="text-lg border-b pb-1 hover:cursor-pointer"
                        onClick={() =>
                          setInput((prev) => ({
                            ...prev,
                            departure: element.departure_station_name,
                          }))
                        }
                      >
                        {element.departure_station_name}
                      </li>
                    );
                })}
              </ul>
            </div>
          )}
      </section>

      {/*diem den*/}
      <section className="flex-1 relative">
        <div className="flex-1 bg-[#ffffffad] rounded-lg shadow-md px-6 py-5 text-center min-h-[100px] flex flex-col justify-center hover:shadow-lg transition-shadow cursor-pointer">
          <p className="text-gray-800 font-bold text-sm leading-none mb-1">
            Điểm Đến
          </p>
          <input
            type="text"
            className="text-gray-500 text-sm text-center p-2 focus:outline-none focus:ring-0"
            placeholder="Chọn điểm đến"
            value={input.arrival}
            onFocus={() => setArrivalFocus(true)}
            onBlur={() => setTimeout(() => setArrivalFocus(false), 200)}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              const value = event.target.value;

              setInput((prev) => ({
                ...prev,
                arrival: value,
              }));

              setFilterArrivalRoutes(
                _.uniqBy(
                  routesData.filter((element: Routes) =>
                    element.arrival_station_name
                      .trim()
                      .toLowerCase()
                      .includes(value.trim().toLowerCase())
                  ),
                  "arrival_station_name"
                )
              );
            }}
          />
        </div>
        {arrivalFocus &&
          filterArrivalRoutes.length !== 0 &&
          input.arrival.length !== 0 && (
            <div className="absolute bg-white w-full max-h-50 overflow-y-auto z-9999">
              <ul className="p-3">
                {filterArrivalRoutes.map((element, index) => {
                  if (element)
                    return (
                      <li
                        key={index}
                        className="text-lg border-b pb-1 hover:cursor-pointer"
                        onClick={() =>
                          setInput((prev) => ({
                            ...prev,
                            arrival: element.arrival_station_name,
                          }))
                        }
                      >
                        {element.arrival_station_name}
                      </li>
                    );
                })}
              </ul>
            </div>
          )}
      </section>

      {/*ngay khoi hanh*/}
      <section className="flex-1 relative">
        <div className="flex-1 bg-[#ffffffad] rounded-lg shadow-md px-6 py-5 text-center min-h-[100px] flex flex-col justify-center hover:shadow-lg transition-shadow cursor-pointer">
          <p className="text-gray-800 font-bold text-sm leading-none mb-2">
            Ngày Khởi Hành
          </p>
          <div className="flex items-center justify-center gap-3 text-gray-500">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <input
              className="text-sm"
              type="date"
              placeholder="Chọn ngày"
              value={input.departureDate}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setInput((prev) => ({
                  ...prev,
                  departureDate: event.target.value,
                }))
              }
            />
          </div>
        </div>
      </section>

      {/*search button*/}
      <div
        className="font-bold text-base flex items-center justify-center gap-3 min-h-[100px] text-white flex-1 bg-orange-400 rounded-lg shadow-md hover:bg-orange-500 hover:cursor-pointer transition-colors"
        onClick={debounce(() => {
          if (moment(input.departureDate).isBefore(moment(), "date")) {
            Swal.fire({
              title: "Ngày được chọn không được nhỏ hơn ngày hiện tại!",
              text: "Bạn cần chọn thời gian hợp lệ!",
              icon: "warning",
            });
            return;
          }
          if (
            input.departure.length === 0 ||
            input.departure.length === 0 ||
            input.departureDate.length === 0
          ) {
            Swal.fire({
              title: "Bạn cần nhập đầy đủ thông tin!",
              text: "Bạn cần nhập đầy đủ điểm khởi hành và điểm đến và ngày khởi hành!",
              icon: "warning",
            });
            return;
          }
          dispatch(searchRoutes(input));
          navigate("/vivu/booking");
        }, 1000)}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        Tìm Chuyến Xe
      </div>
    </div>
  );
}

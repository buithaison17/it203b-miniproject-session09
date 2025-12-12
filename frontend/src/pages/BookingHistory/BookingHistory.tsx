import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../stores/store";
import { featBooking } from "../../apis/booking.api";
import { featBus } from "../../apis/buses.api";
import { featBusCompany } from "../../apis/bus_companies.api";
import { featSchedule } from "../../apis/schedule.api";
import { featRoutes } from "../../apis/routes.api";


type Status = "upcoming" | "completed" | "canceled";

type Booking = {
  id: string;
  company: string;
  route: string;
  departAt: string;
  code: string;
  price: number;
  status: Status;
};

export default function BookingHistoryScreen() {
  const dispatch = useDispatch<AppDispatch>();
  const { tickets } = useSelector((s: RootState) => s.tickets);
  const { buses } = useSelector((s: RootState) => s.buses);
  const { busCompanys } = useSelector((s: RootState) => s);
  const { schedules } = useSelector((s: RootState) => s.schedules);
  const { routes } = useSelector((s: RootState) => s.routes);

  useEffect(() => {
    dispatch(featBooking());
    dispatch(featBus());
    dispatch(featBusCompany());
    dispatch(featSchedule());
    dispatch(featRoutes());
  }, [dispatch]);

  const [status, setStatus] = useState<Status | "all">("all");
  const [company, setCompany] = useState<string>("all");

  const getCompanyNameByBusId = useMemo(() => {
    const companyMap = new Map<string, string>();
    busCompanys.busCompany.forEach((c) => companyMap.set(c.bus_companies_id, c.company_name));
    const busToCompany = new Map<string, string>();
    buses.forEach((b) => busToCompany.set(b.id, companyMap.get(b.company_id) || "Không rõ"));
    return (busId: string) => busToCompany.get(busId) || "Không rõ";
  }, [busCompanys.busCompany, buses]);

  const getRouteStrByScheduleId = useMemo(() => {
    const routeMap = new Map<string, string>();
    routes.forEach((r) =>
      routeMap.set(r.id, `${r.departure_station_name} → ${r.arrival_station_name}`)
    );
    const scheduleToRoute = new Map<string, string>();
    schedules.forEach((sc) => scheduleToRoute.set(sc.id, routeMap.get(sc.route_id) || ""));
    return (scheduleId: string) => scheduleToRoute.get(scheduleId) || "";
  }, [routes, schedules]);

  const bookings = useMemo<Booking[]>(() => {
    return tickets.map((t) => {
      const departISO = typeof t.departure_time === "string"
        ? t.departure_time
        : new Date(t.departure_time).toISOString();
      const departLabel = new Date(departISO).toLocaleString();
      const now = new Date();
      const depDate = new Date(departISO);
      const uiStatus: Status =
        t.status === "Cancelled"
          ? "canceled"
          : depDate.getTime() > now.getTime()
          ? "upcoming"
          : "completed";
      return {
        id: t.id,
        company: getCompanyNameByBusId(t.bus_id),
        route: getRouteStrByScheduleId(t.schedule_id),
        departAt: departLabel,
        code: t.id,
        price: t.price,
        status: uiStatus,
      };
    });
  }, [tickets, getCompanyNameByBusId, getRouteStrByScheduleId]);

  const companies = useMemo(() => {
    const set = new Set(bookings.map((b) => b.company));
    return ["all", ...Array.from(set)];
  }, [bookings]);

  const filtered = useMemo(() => {
    return bookings.filter((b) => {
      const byStatus = status === "all" ? true : b.status === status;
      const byCompany = company === "all" ? true : b.company === company;
      return byStatus && byCompany;
    });
  }, [status, company, bookings]);

  const chipClass = (s: Status) =>
    s === "completed"
      ? "bg-green-100 text-green-700"
      : s === "upcoming"
      ? "bg-blue-100 text-blue-700"
      : "bg-red-100 text-red-700";

  return (
    <div className=" pr-[170px] pl-[170px] min-h-screen bg-gray-50">
      <div className="flex justify-center items-center gap-2 mb-6">
        <div className="w-[3px] h-[40px] bg-yellow-500" />
        <h2 className="pt-2 pb-2 text-3xl sm:text-4xl font-bold tracking-wide">
          LỊCH SỬ ĐẶT VÉ
        </h2>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center mb-6">
        <div className="flex bg-white rounded-xl border shadow-sm overflow-hidden">
          {[
            { key: "all", label: "Tất cả" },
            { key: "upcoming", label: "Sắp đi" },
            { key: "completed", label: "Đã đi" },
            { key: "canceled", label: "Đã hủy" },
          ].map((tab) => (
            <button
              key={tab.key}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              onClick={() => setStatus(tab.key as any)}
              className={`px-4 py-2 text-sm font-medium ${
                status === tab.key
                  ? "bg-blue-500 text-white"
                  : "bg-transparent text-gray-700 hover:bg-gray-100"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex-1 sm:flex-none">
          <select
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="w-full sm:w-64 h-10 px-3 rounded-xl border bg-white shadow-sm text-sm"
          >
            {companies.map((c) => (
              <option key={c} value={c}>
                {c === "all" ? "Tất cả nhà xe" : c}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((b) => (
          <div
            key={b.id}
            className="bg-white rounded-2xl shadow hover:shadow-lg transition p-4 flex flex-col gap-3"
          >
            <div className="flex items-start justify-between">
              <div className="font-semibold text-base">{b.company}</div>
              <span className={`text-xs px-2 py-1 rounded-md ${chipClass(b.status)}`}>
                {b.status === "completed"
                  ? "Đã đi"
                  : b.status === "upcoming"
                  ? "Sắp đi"
                  : "Đã hủy"}
              </span>
            </div>

            <div className="text-sm text-gray-700">{b.route}</div>

            <div className="flex justify-between text-sm">
              <div className="text-gray-600">{b.departAt}</div>
              <div className="font-medium">{b.price.toLocaleString()}₫</div>
            </div>

            <div className="flex justify-between items-center">
              <div className="text-xs text-gray-500">Mã vé: {b.code}</div>
              <button className="h-9 px-3 rounded-lg bg-blue-500 text-white text-sm hover:bg-blue-600">
                Xem chi tiết
              </button>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="mt-8 text-center text-sm text-gray-500">
          Không có vé phù hợp với bộ lọc.
        </div>
      )}
    </div>
  );
}

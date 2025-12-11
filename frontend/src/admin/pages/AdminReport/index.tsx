import home from "../../../assets/icons/home-icon.png";
import hide from "../../../assets/icons/icon_hide.png";
import logout from "../../../assets/icons/Icon-out.png";
import excel from "../../../assets/icons/excel-logo.png";
import { Button, Input, Space, Table } from "antd";
import * as XLSX from "xlsx";
import {
  SearchOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";

import { featRoutes } from "../../../apis/routes.api";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../stores/store";
import { featBusCompany } from "../../../apis/bus_companies.api";
import { featCancelTickets } from "../../../apis/cancelled_tickets.api";
import { featReview } from "../../../apis/reviews.api";
import { featBus } from "../../../apis/buses.api";
import { featBooking } from "../../../apis/booking.api";
import { featSchedule } from "../../../apis/schedule.api";

export default function AdminReport() {
  const { Column } = Table;
  const [searchText, setSearchText] = useState("");
  const [sortValue, setSortValue] = useState("all");
  const [seatFilter, setSeatFilter] = useState(""); // lọc theo loại ghế
  const [statusFilter, setStatusFilter] = useState(""); // lọc theo trạng thái

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(featRoutes());
    dispatch(featBusCompany());
    dispatch(featCancelTickets());
    dispatch(featReview());
    dispatch(featBus());
    dispatch(featBooking());
    dispatch(featSchedule());
  }, [dispatch]);

  const bookings = useSelector((state: RootState) => state.tickets.tickets);
  const routes = useSelector((state: RootState) => state.routes.routes);
  const schedules = useSelector(
    (state: RootState) => state.schedules.schedules
  );
  const busCompanys = useSelector(
    (state: RootState) => state.busCompanys.busCompany
  );
  const buses = useSelector((state: RootState) => state.buses.buses);
  const reviews = useSelector((state: RootState) => state.reviews.reviews);
  const cancelTickets = useSelector(
    (state: RootState) => state.cancelTickets.cancelTickets
  );

  const tripInfo = bookings.map((booking) => {
    const bus = buses?.find((b) => b.id === booking.bus_id);
    const company = busCompanys?.find(
      (c) => c.bus_companies_id === bus?.company_id
    );
    const schedule = schedules?.find((sch) => sch.id === booking.schedule_id);
    const route = schedule
      ? routes?.find(
          (r) =>
            r.id === schedule.route_id &&
            r.arrival_station_name &&
            r.departure_station_name
        )
      : undefined;

    const routeTrip = route
      ? `${route.departure_station_name} → ${route.arrival_station_name}`
      : "Chưa có thông tin";

    const sameBusBookings = bookings.filter(
      (b) =>
        b.bus_id === booking.bus_id && b.schedule_id === booking.schedule_id
    );

    console.log(sameBusBookings);

    const totalTickets = sameBusBookings.length;
    const cancelledTickets = sameBusBookings.filter(
      (b) => b.status === "Cancelled"
    ).length;
    const cancel_rate = totalTickets > 0 ? cancelledTickets / totalTickets : 0;

    const reviewList = reviews?.filter((r) => r.bus_id === booking.bus_id);
    const avgReview =
      reviewList?.length > 0
        ? reviewList.reduce((sum, r) => sum + r.rating, 0) / reviewList.length
        : 0;

    return {
      id: booking.id,
      bus_name: bus?.bus_name ?? "",
      company_name: company?.company_name ?? "",
      route: routeTrip,
      total_ticket: totalTickets,
      cancel_rate,
      review_score: avgReview,
      price: booking.price,
      date: booking.arrival_time,
    };
  });

  const groupTripInfo = Object.values(
    tripInfo.reduce(
      (acc, ticket) => {
        const key = `${ticket.company_name}-${ticket.route}`;
        if (!acc[key]) {
          acc[key] = {
            company_name: ticket.company_name,
            route: ticket.route,
            total_ticket: 0,
            total_price: 0,
            cancel_rate_sum: 0,
            review_score_sum: 0,
            review_count: 0,
          };
        }
        acc[key].total_ticket += ticket.total_ticket;
        acc[key].total_price += ticket.price;
        acc[key].cancel_rate_sum += ticket.cancel_rate * ticket.total_ticket;
        acc[key].review_score_sum += ticket.review_score * ticket.total_ticket;
        acc[key].review_count += ticket.total_ticket;

        return acc;
      },
      {} as Record<
        string,
        {
          company_name: string;
          route: string;
          total_ticket: number;
          total_price: number;
          cancel_rate_sum: number;
          review_score_sum: number;
          review_count: number;
        }
      >
    )
  ).map((item) => ({
    company_name: item.company_name,
    route: item.route,
    total_ticket: item.total_ticket,
    cancel_rate:
      item.total_ticket > 0 ? item.cancel_rate_sum / item.total_ticket : 0,
    review_score:
      item.review_count > 0 ? item.review_score_sum / item.review_count : 0,
    price: item.total_price,
  }));

  const totalByBusArray = Object.values(
    tripInfo.reduce((acc, ticket) => {
      if (!acc[ticket.company_name]) {
        acc[ticket.company_name] = {
          company_name: ticket.company_name,
          total: 0,
        };
      }
      acc[ticket.company_name].total += ticket.price;
      return acc;
    }, {} as Record<string, { company_name: string; total: number }>)
  );

  const filteredData = bookings
    .filter((b) => {
      if (seatFilter && b.seat_type !== seatFilter) return false;

      if (statusFilter && b.status !== statusFilter) return false;

      if (
        searchText &&
        !b.id.toLowerCase().includes(searchText.toLowerCase()) &&
        !b.schedule_id.toLowerCase().includes(searchText.toLowerCase())
      )
        return false;
      return true;
    })
    .sort((a, b) => {
      if (sortValue === "price") return a.price - b.price;
      if (sortValue === "time")
        return a.departure_time.getTime() - b.departure_time.getTime();
      return 0;
    });

  const TotalRevenue = bookings.reduce(
    (sum, element) => sum + element.price,
    0
  );

  const ExportExcel = () => {
    const sheetData = bookings.map((item) => ({
      ...item,
      departure_time: item.departure_time.toLocaleString(),
      arrival_time: item.arrival_time.toLocaleString(),
      created_at: item.created_at.toLocaleString(),
      updated_at: item.updated_at.toLocaleString(),
    }));

    const worksheet = XLSX.utils.json_to_sheet(sheetData);

    worksheet["!cols"] = Object.keys(sheetData[0]).map(() => ({ wch: 20 }));

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Danh sách");

    XLSX.writeFile(workbook, "danh_sach_don_ve.xlsx");
  };

  return (
    <div>
      <div className="header-page flex flex-col gap-3 ">
        <div className="flex items-center gap-3">
          <img src={home} alt="" />

          <img src={hide} className="rotate-90" alt="" />

          <p className="font-both">Báo cáo & Thống kê</p>
        </div>
        {/* Tên trang và đăng xuất */}
        <div className="flex justify-between pt-2">
          <div className="text-4xl">Báo cáo & Thống kê</div>
          {/* Đăng xuất */}
          <div className="flex items-center gap-4 p-2 bg-white rounded-lg shadow-sm">
            {/* Avatar */}
            <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-white font-bold text-lg">
              A
            </div>

            {/* Thông tin người dùng */}
            <div className="flex flex-col">
              <span className="font-semibold text-gray-800">Admin</span>
              <div className="flex items-center gap-1 text-rose-600 cursor-pointer hover:underline">
                <span>Đăng xuất</span>
                <img className="w-8 h-8" src={logout} alt="Logout" />
              </div>
            </div>
          </div>
        </div>

        {/* thêm,xuất excel, lọc, tìm kiếm, sắp xếp */}
        <div className="flex gap-4 justify-between">
          <Input
            onChange={(e) => setSearchText(e.target.value)}
            prefix={<SearchOutlined />}
            placeholder="Tìm kiếm..."
            style={{ width: 250, padding: "8px 12px" }}
          />
          <div className="flex gap-4">
            <div
              onClick={ExportExcel}
              className=" rounded-md flex gap-2 items-center border-2 border-gray-400 w-30 h-10 justify-center"
            >
              <img className="w-4 h-4" src={excel} alt="" />
              <p>Xuất file</p>
            </div>

            <input
              className=" rounded-md flex gap-2 items-center border-2 border-gray-400 w-40 h-10 justify-center"
              type="date"
            />

            <select
              className="border rounded px-2 py-1"
              value={seatFilter}
              onChange={(e) => setSeatFilter(e.target.value)}
            >
              <option value="all">Tuyến Đường</option>
              <option value="VIP">Hà Giang - Hà Nội</option>
              <option value="Normal">Tuyên Quang - Hà Nội</option>
            </select>

            <select
              className="border rounded px-2 py-1"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">Nhà Xe</option>
              <option value="booked">Bằng Phấn</option>
              <option value="cancelled">Duy Tân</option>
              <option value="cancelled">Ngọc Hải</option>
            </select>
          </div>
        </div>

        {/* bảng dữ liệu */}

        <div className="flex justify-around">
          <div className="w-100">
            <div>
              <Table
                rowKey="id"
                pagination={false}
                dataSource={totalByBusArray
                  .slice(0, 5)
                  .sort((a, b) => b.total - a.total)}
              >
                <Column
                  title="Xếp hạng"
                  key="index"
                  render={(_, __, index) => index + 1}
                />

                <Column
                  title="Tên"
                  dataIndex="company_name"
                  key="company_name"
                />
                <Column
                  title="Doanh thu"
                  dataIndex="total"
                  key="total"
                  render={(value) => value.toLocaleString("vi-VN")}
                />
              </Table>
            </div>
            <div className="text-2xl">
              {" "}
              Tổng Doanh thu : {TotalRevenue.toLocaleString("vi-VN")} VND
            </div>
          </div>

          <Table
            rowKey="id"
            pagination={{ pageSize: 5 }}
            dataSource={groupTripInfo}
          >
            <Column
              title="STT"
              key="index"
              render={(_, __, index) => index + 1}
            />
            <Column title="Tuyến" dataIndex="route" key="route" />
            <Column
              title="Nhà xe"
              dataIndex="company_name"
              key="company_name"
            />
            <Column
              title="Vé bán ra"
              dataIndex="total_ticket"
              key="total_ticket"
            />
            <Column
              title="Tỷ lệ hủy"
              dataIndex="cancel_rate"
              key="cancel_rate"
              render={(value) => `${(value * 100).toFixed(0)} %`}
            />
            <Column
              title="Đánh giá"
              dataIndex="review_score"
              key="review_score"
              render={(value) => value.toFixed(1)}
            />
            <Column
              title="Doanh thu"
              dataIndex="price"
              key="price"
              render={(value) => value.toLocaleString("vi-VN")}
            />
            <Column
              title="Hành động"
              key="action"
              render={(_, record) => (
                <Space>
                  <Button type="link">Chi tiết</Button>
                </Space>
              )}
            />
          </Table>
        </div>
      </div>
    </div>
  );
}

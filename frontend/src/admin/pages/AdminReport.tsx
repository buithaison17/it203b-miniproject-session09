import home from "../../assets/icons/home-icon.png";
import hide from "../../assets/icons/icon_hide.png";
import logout from "../../assets/icons/Icon-out.png";
import excel from "../../assets/icons/excel-logo.png";
import { Button, Input, Space, Table, Tag } from "antd";
import type { Ticket } from "../../interfaces/Schedules";
import * as XLSX from "xlsx";
import {
  SearchOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { featBooking } from "../../apis/booking.api";
import type { AppDispatch, RootState } from "../../stores/store";
import { featRoutes } from "../../apis/routes.api";
import { featBusCompany } from "../../apis/bus_companies.api";
import { featCancelTickets } from "../../apis/cancelled_tickets.api";
import { featReview } from "../../apis/reviews.api";

export default function AdminReport() {
  const { Column } = Table;
  const [searchText, setSearchText] = useState("");
  const [sortValue, setSortValue] = useState("all");
  const [seatFilter, setSeatFilter] = useState(""); // lọc theo loại ghế
  const [statusFilter, setStatusFilter] = useState(""); // lọc theo trạng thái


    const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(featBooking());
    dispatch(featRoutes());
    dispatch(featBusCompany());
    dispatch(featCancelTickets());
    dispatch(featReview());
  }, [dispatch]);
  
  const bookings = useSelector((state: RootState) => state.tickets.tickets);
  const routes = useSelector((state: RootState) => state.routes.routes);
  const busCompanys = useSelector((state: RootState) => state.busCompanys.busCompany);
  const reviews = useSelector((state: RootState) => state.reviews.reviews);
  const cancelTickets = useSelector((state: RootState) => state.cancelTickets.cancelTickets);
  

  console.log(bookings);
  console.log(routes);
  console.log(busCompanys);
  console.log(reviews);
  console.log(cancelTickets);
  


  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

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
            onChange={handleSearch}
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
              <Table<Ticket>
                pagination={false}
                dataSource={filteredData.slice(0, 5)}
              >
                <Column
                  title="Xếp hạng"
                  key="index"
                  render={(_, __, index) => index + 1}
                />

                <Column title="Tên" dataIndex="id" key="id" />
                <Column
                  title="Doanh thu"
                  dataIndex="price"
                  key="schedule_id"
                  render={(value) => value.toLocaleString("vi-VN")}
                />
              </Table>
            </div>
            <div className="text-2xl">
              {" "}
              Tổng Doanh thu : {TotalRevenue.toLocaleString("vi-VN")} VND
            </div>
          </div>

          <Table<Ticket> pagination={{ pageSize: 5 }} dataSource={filteredData}>
            <Column
              title="STT"
              key="index"
              render={(_, __, index) => index + 1}
            />

            <Column title="Tuyến " dataIndex="id" key="id" />
            <Column title="Nhà xe" dataIndex="schedule_id" key="schedule_id" />
            <Column title="Vé bán ra" dataIndex="seat_id" key="seat_id" />

            <Column
              title="Tỷ lệ hủy"
              dataIndex="created_at"
              key="created_at"
              render={(value: Date) => value.toLocaleString()}
            />
            <Column
              title="Đánh giá"
              dataIndex="updated_at"
              key="updated_at"
              render={(value: Date) => value.toLocaleString()}
            />
            <Column
              title="Doanh thu"
              dataIndex="updated_at"
              key="updated_at"
              render={(value: Date) => value.toLocaleString()}
            />
            <Column
              title="Hành động"
              key="action"
              render={(_, record: Ticket) => (
                <Space>
                  <Button
                    type="link"
                    className="px-3 py-1 rounded-lg border border-gray-300 
             text-gray-700 hover:bg-gray-200 
             transition-all duration-200 shadow-sm"
                  >
                    Chi tiết
                  </Button>
                </Space>
              )}
            />
          </Table>
        </div>
      </div>
    </div>
  );
}

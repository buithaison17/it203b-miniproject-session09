import home from "../../../assets/icons/home-icon.png";
import hide from "../../../assets/icons/icon_hide.png";
import logout from "../../../assets/icons/Icon-out.png";
import excel from "../../../assets/icons/excel-logo.png";
import { Button, Input, Space, Table, Tag } from "antd";
import type { Ticket } from "../../../interfaces/Schedules";
import * as XLSX from "xlsx";
import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import type { Bus } from "../../../interfaces/Bus";

export default function AdminReport() {
  const { Column } = Table;
  const [searchText, setSearchText] = useState("");
  const [sortValue, setSortValue] = useState("all");
  const [seatFilter, setSeatFilter] = useState(""); // lọc theo loại ghế
  const [statusFilter, setStatusFilter] = useState(""); // lọc theo trạng thái
  const bookings: Ticket[] = [
    {
      id: "B001",
      schedule_id: "S001",
      seat_id: "A01",
      departure_time: new Date("2025-01-10T08:00:00"),
      arrival_time: new Date("2025-01-10T12:00:00"),
      seat_type: "VIP",
      price: 350000,
      status: "booked",
      created_at: new Date("2025-01-01T10:00:00"),
      updated_at: new Date("2025-01-01T10:00:00"),
    },
    {
      id: "B002",
      schedule_id: "S001",
      seat_id: "A02",
      departure_time: new Date("2025-01-10T08:00:00"),
      arrival_time: new Date("2025-01-10T12:00:00"),
      seat_type: "Normal",
      price: 250000,
      status: "cancelled",
      created_at: new Date("2025-01-02T09:30:00"),
      updated_at: new Date("2025-01-05T11:00:00"),
    },
    {
      id: "B003",
      schedule_id: "S002",
      seat_id: "B01",
      departure_time: new Date("2025-01-12T09:00:00"),
      arrival_time: new Date("2025-01-12T14:00:00"),
      seat_type: "Normal",
      price: 270000,
      status: "booked",
      created_at: new Date("2025-01-03T14:00:00"),
      updated_at: new Date("2025-01-03T14:00:00"),
    },
    {
      id: "B004",
      schedule_id: "S002",
      seat_id: "B02",
      departure_time: new Date("2025-01-12T09:00:00"),
      arrival_time: new Date("2025-01-12T14:00:00"),
      seat_type: "VIP",
      price: 380000,
      status: "booked",
      created_at: new Date("2025-01-04T08:20:00"),
      updated_at: new Date("2025-01-04T08:20:00"),
    },
    {
      id: "B005",
      schedule_id: "S003",
      seat_id: "C01",
      departure_time: new Date("2025-01-15T07:00:00"),
      arrival_time: new Date("2025-01-15T11:30:00"),
      seat_type: "Normal",
      price: 260000,
      status: "cancelled",
      created_at: new Date("2025-01-05T15:00:00"),
      updated_at: new Date("2025-01-06T09:00:00"),
    },
    {
      id: "B006",
      schedule_id: "S003",
      seat_id: "C02",
      departure_time: new Date("2025-01-15T07:00:00"),
      arrival_time: new Date("2025-01-15T11:30:00"),
      seat_type: "VIP",
      price: 360000,
      status: "booked",
      created_at: new Date("2025-01-06T11:00:00"),
      updated_at: new Date("2025-01-06T11:00:00"),
    },
    {
      id: "B007",
      schedule_id: "S004",
      seat_id: "D01",
      departure_time: new Date("2025-01-18T13:00:00"),
      arrival_time: new Date("2025-01-18T18:00:00"),
      seat_type: "Normal",
      price: 300000,
      status: "booked",
      created_at: new Date("2025-01-08T13:40:00"),
      updated_at: new Date("2025-01-08T13:40:00"),
    },
    {
      id: "B008",
      schedule_id: "S004",
      seat_id: "D02",
      departure_time: new Date("2025-01-18T13:00:00"),
      arrival_time: new Date("2025-01-18T18:00:00"),
      seat_type: "Normal",
      price: 300000,
      status: "cancelled",
      created_at: new Date("2025-01-09T10:15:00"),
      updated_at: new Date("2025-01-12T09:00:00"),
    },
    {
      id: "B009",
      schedule_id: "S005",
      seat_id: "E01",
      departure_time: new Date("2025-01-20T06:30:00"),
      arrival_time: new Date("2025-01-20T10:30:00"),
      seat_type: "VIP",
      price: 400000,
      status: "booked",
      created_at: new Date("2025-01-10T08:00:00"),
      updated_at: new Date("2025-01-10T08:00:00"),
    },
    {
      id: "B010",
      schedule_id: "S005",
      seat_id: "E02",
      departure_time: new Date("2025-01-20T06:30:00"),
      arrival_time: new Date("2025-01-20T10:30:00"),
      seat_type: "Normal",
      price: 280000,
      status: "booked",
      created_at: new Date("2025-01-10T10:20:00"),
      updated_at: new Date("2025-01-10T10:20:00"),
    },
  ];

  const buses: Bus[] = [
    {
      id: "BUS001",
      company_id: "COMP001",
      bus_name: "Nhà xe Hạnh Phúc",
      descriptions: "Xe giường nằm VIP 40 chỗ, có wifi và nước uống miễn phí",
      license_plate: "29B-12345",
      capacity: 40,
      created_at: new Date("2025-01-01T08:00:00"),
      updated_at: new Date("2025-01-01T08:00:00"),
    },
    {
      id: "BUS002",
      company_id: "COMP001",
      bus_name: "Nhà xe Hạnh Phúc",
      descriptions: "Xe ghế ngồi thường 30 chỗ, tiện nghi cơ bản",
      license_plate: "29B-54321",
      capacity: 30,
      created_at: new Date("2025-01-02T08:30:00"),
      updated_at: new Date("2025-01-02T08:30:00"),
    },
    {
      id: "BUS003",
      company_id: "COMP002",
      bus_name: "Nhà xe An Bình",
      descriptions: "Xe giường nằm VIP 45 chỗ, phục vụ đồ ăn nhẹ",
      license_plate: "30C-67890",
      capacity: 45,
      created_at: new Date("2025-01-03T09:00:00"),
      updated_at: new Date("2025-01-03T09:00:00"),
    },
    {
      id: "BUS004",
      company_id: "COMP002",
      bus_name: "Nhà xe An Bình",
      descriptions: "Xe ghế ngồi 35 chỗ, có điều hòa",
      license_plate: "30C-09876",
      capacity: 35,
      created_at: new Date("2025-01-04T10:00:00"),
      updated_at: new Date("2025-01-04T10:00:00"),
    },
    {
      id: "BUS005",
      company_id: "COMP003",
      bus_name: "Nhà xe Mai Linh",
      descriptions: "Xe VIP 50 chỗ, giường êm",
      license_plate: "31D-11111",
      capacity: 50,
      created_at: new Date("2025-01-05T07:00:00"),
      updated_at: new Date("2025-01-05T07:00:00"),
    },
    {
      id: "BUS006",
      company_id: "COMP003",
      bus_name: "Nhà xe Mai Linh",
      descriptions: "Xe ghế thường 40 chỗ, an toàn",
      license_plate: "31D-22222",
      capacity: 40,
      created_at: new Date("2025-01-06T07:30:00"),
      updated_at: new Date("2025-01-06T07:30:00"),
    },
    {
      id: "BUS007",
      company_id: "COMP004",
      bus_name: "Nhà xe Phú Quý",
      descriptions: "Xe giường nằm 42 chỗ, wifi miễn phí",
      license_plate: "32E-33333",
      capacity: 42,
      created_at: new Date("2025-01-07T08:15:00"),
      updated_at: new Date("2025-01-07T08:15:00"),
    },
    {
      id: "BUS008",
      company_id: "COMP004",
      bus_name: "Nhà xe Phú Quý",
      descriptions: "Xe ghế ngồi 38 chỗ, điều hòa",
      license_plate: "32E-44444",
      capacity: 38,
      created_at: new Date("2025-01-08T09:20:00"),
      updated_at: new Date("2025-01-08T09:20:00"),
    },
    {
      id: "BUS009",
      company_id: "COMP005",
      bus_name: "Nhà xe Thành Công",
      descriptions: "Xe VIP 48 chỗ, phục vụ nước uống",
      license_plate: "33F-55555",
      capacity: 48,
      created_at: new Date("2025-01-09T10:45:00"),
      updated_at: new Date("2025-01-09T10:45:00"),
    },
    {
      id: "BUS010",
      company_id: "COMP005",
      bus_name: "Nhà xe Thành Công",
      descriptions: "Xe ghế thường 36 chỗ, tiện nghi cơ bản",
      license_plate: "33F-66666",
      capacity: 36,
      created_at: new Date("2025-01-10T11:00:00"),
      updated_at: new Date("2025-01-10T11:00:00"),
    },
  ];

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

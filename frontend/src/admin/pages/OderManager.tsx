import home from "../../assets/icons/home-icon.png";
import hide from "../../assets/icons/icon_hide.png";
import logout from "../../assets/icons/Icon-out.png";
import excel from "../../assets/icons/excel-logo.png";
import { Button, Input, Space, Table, Tag } from "antd";
import type { Ticket } from "../../interfaces/Schedules";
import * as XLSX from "xlsx";
import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from "@ant-design/icons";

export default function UserManagers() {
  const { Column } = Table;

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

          <p className="font-both">Danh sách đơn vé...</p>
        </div>
        {/* Tên trang và đăng xuất */}
        <div className="flex justify-between pt-2">
          <div className="text-4xl">Danh sách đơn vé </div>
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

            <select
              className=" rounded-md flex gap-2 items-center border-2 border-gray-400 w-35 justify-center"
              name=""
              id=""
            >
              <option value=""> Sắp xếp tất cả</option>
              <option value="">Sắp xếp giá</option>
              <option value="">Sắp xếp hãng</option>
            </select>

            <select
              className=" rounded-md flex gap-2 items-center border-2 border-gray-400 w-30 justify-center"
              name=""
              id=""
            >
              <option value="">Bộ lọc tất cả</option>
              <option value="">lọc theo giá</option>
              <option value="">Lọc theo mã</option>
            </select>
          </div>
        </div>

        {/* bảng dữ liệu */}

        <Table<Ticket> pagination={{ pageSize: 5 }} dataSource={bookings}>
          <Column
            title="STT"
            key="index"
            render={(_, __, index) => index + 1}
          />

          <Column title="Mã vé" dataIndex="id" key="id" />
          <Column
            title="Mã lịch trình"
            dataIndex="schedule_id"
            key="schedule_id"
          />
          <Column title="Ghế" dataIndex="seat_id" key="seat_id" />

          <Column
            title="Giờ đi"
            dataIndex="departure_time"
            key="departure_time"
            render={(value: Date) => value.toLocaleString()}
          />

          <Column
            title="Giờ đến"
            dataIndex="arrival_time"
            key="arrival_time"
            render={(value: Date) => value.toLocaleString()}
          />
          <Column title="Loại ghế" dataIndex="seat_type" key="seat_type" />
          <Column title="Giá" dataIndex="price" key="price" />

          <Column
            title="Trạng thái"
            dataIndex="status"
            key="status"
            render={(status: string) => (
              <Tag color={status === "booked" ? "green" : "volcano"}>
                {status.toUpperCase()}
              </Tag>
            )}
          />
          <Column
            title="Ngày tạo"
            dataIndex="created_at"
            key="created_at"
            render={(value: Date) => value.toLocaleString()}
          />
          <Column
            title="Ngày cập nhật"
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
                  style={{ fontSize: "20px" }}
                  icon={<DeleteOutlined />}
                  danger
                  type="link"
                ></Button>
                <Button
                  style={{ fontSize: "20px" }}
                  icon={<EditOutlined />}
                  danger
                  type="link"
                ></Button>
              </Space>
            )}
          />
        </Table>
      </div>
    </div>
  );
}

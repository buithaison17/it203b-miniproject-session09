import home from "../../assets/icons/home-icon.png";
import hide from "../../assets/icons/icon_hide.png";
import logout from "../../assets/icons/Icon-out.png";
import excel from "../../assets/icons/excel-logo.png";
import { Button, Input, Space, Table } from "antd";
import type { Station } from "../../interfaces/Station";
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import * as XLSX from "xlsx";

export default function StationManagers() {
  const { Column } = Table;
  const ExportExcel = () => {
    const sheetData = data.map((item) => ({
      ...item,
    }));

    const worksheet = XLSX.utils.json_to_sheet(sheetData);

    worksheet["!cols"] = Object.keys(sheetData[0]).map(() => ({ wch: 20 }));

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Danh sách");

    XLSX.writeFile(workbook, "danh_sach_ben_xe.xlsx");
  };

  const data: Station[] = [
    {
      id: "BX1",
      name: "Bến Xe Giáp Bát",
      image:
        "https://res.cloudinary.com/dcccifk4l/image/upload/v1765251510/BX-TP-VUNG-TAU-1.jpg_rcbgps.png",
      wallpaper:
        "https://res.cloudinary.com/dcccifk4l/image/upload/v1765251510/BX-TP-VUNG-TAU-1.jpg_rcbgps.png",
      descriptions: "Bến xe phục vụ các tuyến đường phía Nam.",
      location: "Giải Phóng, Hoàng Mai, Hà Nội",
      phone: "0123456789",
      created_at: new Date("2025-01-01T10:00:00"),
      updated_at: new Date("2025-01-01T10:00:00"),
    },
    {
      id: "BX2",
      name: "Bến Xe Mỹ Đình",
      image:
        "https://res.cloudinary.com/dcccifk4l/image/upload/v1765251510/BX-TP-VUNG-TAU-1.jpg_rcbgps.png",
      wallpaper:
        "https://res.cloudinary.com/dcccifk4l/image/upload/v1765251510/BX-TP-VUNG-TAU-1.jpg_rcbgps.png",
      descriptions: "Bến xe phục vụ các tuyến đường phía Bắc và Tây Bắc.",
      location: "Phạm Hùng, Nam Từ Liêm, Hà Nội",
      phone: "0123456789",
      created_at: new Date("2025-01-01T10:00:00"),
      updated_at: new Date("2025-01-01T10:00:00"),
    },
    {
      id: "BX3",
      name: "Bến Xe Miền Đông",
      image:
        "https://res.cloudinary.com/dcccifk4l/image/upload/v1765251510/BX-TP-VUNG-TAU-1.jpg_rcbgps.png",
      wallpaper:
        "https://res.cloudinary.com/dcccifk4l/image/upload/v1765251510/BX-TP-VUNG-TAU-1.jpg_rcbgps.png",
      descriptions: "Bến xe lớn nhất miền Nam.",
      location: "Phường 26, Bình Thạnh, TP.HCM",
      phone: "0123456789",
      created_at: new Date("2025-01-01T10:00:00"),
      updated_at: new Date("2025-01-01T10:00:00"),
    },
    {
      id: "BX4",
      name: "Bến Xe Giáp Bát",
      image:
        "https://res.cloudinary.com/dcccifk4l/image/upload/v1765251510/BX-TP-VUNG-TAU-1.jpg_rcbgps.png",
      wallpaper:
        "https://res.cloudinary.com/dcccifk4l/image/upload/v1765251510/BX-TP-VUNG-TAU-1.jpg_rcbgps.png",
      descriptions: "Bến xe phục vụ các tuyến đường phía Nam.",
      location: "Giải Phóng, Hoàng Mai, Hà Nội",
      phone: "0123456789",
      created_at: new Date("2025-01-01T10:00:00"),
      updated_at: new Date("2025-01-01T10:00:00"),
    },
    {
      id: "BX5",
      name: "Bến Xe Mỹ Đình",
      image:
        "https://res.cloudinary.com/dcccifk4l/image/upload/v1765251510/BX-TP-VUNG-TAU-1.jpg_rcbgps.png",
      wallpaper:
        "https://res.cloudinary.com/dcccifk4l/image/upload/v1765251510/BX-TP-VUNG-TAU-1.jpg_rcbgps.png",
      descriptions: "Bến xe phục vụ các tuyến đường phía Bắc và Tây Bắc.",
      location: "Phạm Hùng, Nam Từ Liêm, Hà Nội",
      phone: "0123456789",
      created_at: new Date("2025-01-01T10:00:00"),
      updated_at: new Date("2025-01-01T10:00:00"),
    },
    {
      id: "BX6",
      name: "Bến Xe Miền Đông",
      image:
        "https://res.cloudinary.com/dcccifk4l/image/upload/v1765251510/BX-TP-VUNG-TAU-1.jpg_rcbgps.png",
      wallpaper:
        "https://res.cloudinary.com/dcccifk4l/image/upload/v1765251510/BX-TP-VUNG-TAU-1.jpg_rcbgps.png",
      descriptions: "Bến xe lớn nhất miền Nam.",
      location: "Phường 26, Bình Thạnh, TP.HCM",
      phone: "0123456789",
      created_at: new Date("2025-01-01T10:00:00"),
      updated_at: new Date("2025-01-01T10:00:00"),
    },
  ];

  return (
    <div>
      <div className="header-page flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <img src={home} alt="" />
          <img src={hide} className="rotate-90" alt="" />
          <p className="font-both">Quản lý bến xe</p>
        </div>
        {/* Tên trang và đăng xuất */}
        <div className="flex justify-between pt-2">
          <div className="text-4xl">Danh sách bến xe</div>
          <div>
            <p>Admin</p>
            <div className="flex items-center ">
              <p className="text-rose-600 ">Đăng xuất</p>
              <img className="text-rose-600" src={logout} alt="" />
            </div>
          </div>
        </div>

        {/* thêm,xuất excel, lọc, tìm kiếm, sắp xếp */}
        <div className="flex gap-4 justify-between">
          <Button type="primary" icon={<PlusOutlined />}>
            Thêm Bến Xe
          </Button>
          <div className="flex gap-4">
            <div
              onClick={ExportExcel}
              className=" rounded-md flex gap-2 items-center border-2 border-gray-400 w-30 h-10 justify-center"
            >
              <img className="w-4 h-4" src={excel} alt="" />
              <p>Xuất file</p>
            </div>

            <select
              className=" rounded-md flex gap-2 items-center border-2 border-gray-400 w-30 justify-center"
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
            <Input
              prefix={<SearchOutlined />}
              placeholder="Tìm kiếm..."
              style={{ width: 250, padding: "8px 12px" }}
            />
          </div>
        </div>
        {/* {Bảng Bến xe} */}
        <Table<Station> pagination={{ pageSize: 5 }} dataSource={data}>
          <Column title="ID" dataIndex="id" key="id" />
          <Column title="Tên Bến Xe" dataIndex="name" key="name" />
          <Column title="Địa chỉ" dataIndex="location" key="location" />
          <Column title="Mô Tả" dataIndex="descriptions" key="descriptions" />
          <Column title="Số Điện Thoại" dataIndex="phone" key="phone" />
          <Column
            title="Action"
            key="action"
            render={(_, record: Station) => (
              <Space>
                <Button icon={<DeleteOutlined />} danger type="link"></Button>
                <Button icon={<EditOutlined />} danger type="link"></Button>
              </Space>
            )}
          />
        </Table>
      </div>
    </div>
  );
}

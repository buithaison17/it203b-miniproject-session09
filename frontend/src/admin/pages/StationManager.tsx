import React from "react";
import home from "../../assets/icons/home-icon.png";
import hide from "../../assets/icons/icon_hide.png";
import logout from "../../assets/icons/Icon-out.png";
import { Button, Flex, Input, Popconfirm, Space, Table } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";

const { Column } = Table;

interface Station {
  key: React.Key;
  id: string;
  name: string;
  location: string;
  descriptions: string;
  phone: string;
}

const data: Station[] = [
  {
    key: "BX1",
    id: "BX1",
    name: "Bến Xe Giáp Bát",
    location: "Giải Phóng, Hoàng Mai, Hà Nội",
    descriptions: "Bến xe phục vụ các tuyến đường phía Nam.",
    phone: "0123456789",
  },
  {
    key: "BX2",
    id: "BX2",
    name: "Bến Xe Mỹ Đình",
    location: "Phạm Hùng, Nam Từ Liêm, Hà Nội",
    descriptions: "Bến xe phục vụ các tuyến đường phía Bắc và Tây Bắc.",
    phone: "9876543210",
  },
  {
    key: "BX3",
    id: "BX3",
    name: "Bến Xe Miền Đông",
    location: "Phường 26, Bình Thạnh, TP.HCM",
    descriptions: "Bến xe lớn nhất miền Nam.",
    phone: "0987654213",
  },
  {
    key: "BX1",
    id: "BX1",
    name: "Bến Xe Giáp Bát",
    location: "Giải Phóng, Hoàng Mai, Hà Nội",
    descriptions: "Bến xe phục vụ các tuyến đường phía Nam.",
    phone: "0123456789",
  },
  {
    key: "BX2",
    id: "BX2",
    name: "Bến Xe Mỹ Đình",
    location: "Phạm Hùng, Nam Từ Liêm, Hà Nội",
    descriptions: "Bến xe phục vụ các tuyến đường phía Bắc và Tây Bắc.",
    phone: "9876543210",
  },
  {
    key: "BX3",
    id: "BX3",
    name: "Bến Xe Miền Đông",
    location: "Phường 26, Bình Thạnh, TP.HCM",
    descriptions: "Bến xe lớn nhất miền Nam.",
    phone: "0987654213",
  },
  
];

export default function StationManagers() {
  return (
    <div>
      <div
        className="header-page"
        style={{ borderBottom: "1px solid #f0f0f0", padding: "12px 16px" }}
      >
        <div className="flex items-center gap-3">
          <img src={home} alt="" />
          <img src={hide} className="rotate-90" alt="" />
          <p>Quản lý bến xe</p>
        </div>
        {/* Tên trang và đăng xuất */}
        <div className="flex justify-between">
          <h2>Danh sách bến xe</h2>
          <div className="flex items-center gap-2">
            <p>Admin</p>
            <div className="flex items-center">
              <p>Đăng xuất</p>
              <img src={logout} alt="" />
            </div>
          </div>
        </div>

        {/* thêm,xuất excel, lọc, tìm kiếm, sắp xếp */}
        <div
          className="flex justify-between items-center"
          style={{ marginTop: 20 }}
        >
          <Flex gap="small" align="center">
            <Button type="primary" icon={<PlusOutlined />}>
              Thêm Bến Xe
            </Button>
          </Flex>
          <Flex gap="small" align="center">
            <Input
              prefix={<SearchOutlined />}
              placeholder="Tìm kiếm..."
              style={{ width: 250, padding: "8px 12px" }}
            />
            <select
              style={{
                padding: "8px 12px",
                borderRadius: 6,
                border: "1px solid #d9d9d9",
              }}
            >
              <option value="">Sắp xếp</option>
              <option value="name_asc">Tên (A-Z)</option>
              <option value="date_desc">Ngày tạo (Mới nhất)</option>
            </select>
            {/* Select Lọc */}
            <select
              style={{
                padding: "8px 12px",
                borderRadius: 6,
                border: "1px solid #d9d9d9",
              }}
            >
              <option value="">Lọc</option>
              <option value="hanoi">Hà Nội</option>
              <option value="hcm">TP.HCM</option>
            </select>
          </Flex>
        </div>
      </div>
      {/* {Bảng Bến xe} */}
      <div className="body-page">
        <Table<Station> dataSource={data}>
          <Column title="Tên Bến Xe" dataIndex="name" key="name" />
          <Column title="Địa chỉ" dataIndex="location" key="location" />

          <Column title="Mô Tả" dataIndex="descriptions" key="descriptions" />
          <Column title="Số Điện Thoại" dataIndex="phone" key="phone" />
          <Column
            title="Hành động"
            key="action"
            render={(_: unknown, record: Station) => (
              <Space size="middle">
                <Button icon={<EditOutlined />} type="link">
                  Sửa
                </Button>
                <Popconfirm
                  title={`Xác nhận xóa bến xe "${record.name}"?`}
                  okText="Xóa"
                  cancelText="Hủy"
                >
                  <Button icon={<DeleteOutlined />} danger type="link">
                    Xóa
                  </Button>
                </Popconfirm>
              </Space>
            )}
          />
        </Table>
      </div>
    </div>
  );
}

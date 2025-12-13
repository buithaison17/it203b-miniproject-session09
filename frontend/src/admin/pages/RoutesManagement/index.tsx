import React, { useState, useMemo, useEffect } from "react";
import {
  Button,
  Input,
  Space,
  Table,
  Tooltip,
  Popconfirm,
  message,
} from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import * as XLSX from "xlsx";

// Giả định imports từ Redux/API
// import { useAppSelector, useAppDispatch } from "../../../stores/store";
// import { fetchRoutesThunk, addRouteThunk, updateRouteThunk, deleteRouteThunk } from "../../../slices/routeSlice";
import type { Routes } from "../../../interfaces/Routes"; // <-- Interface mới
import RouteModal from "../../components/Modals/Route/RouteModal"; // <-- Modal mới

// --- ICON IMPORTS ---
import home from "../../../assets/icons/home-icon.png";
import hide from "../../../assets/icons/icon_hide.png";
import logout from "../../../assets/icons/Icon-out.png";
import excel from "../../../assets/icons/excel-logo.png";

const { Column } = Table;

// Hàm định dạng ngày tháng (Tái sử dụng)
const formatDateTime = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "N/A";
    return date.toLocaleString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch (e) {
    return "N/A";
  }
};

// Hàm định dạng tiền tệ
const formatCurrency = (amount: number): string => {
  return amount.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
};

// Hàm định dạng thời gian (phút sang giờ và phút)
const formatDuration = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours} giờ ${mins} phút`;
};

// --- DỮ LIỆU VÀ STATE MÔ PHỎNG ---
const MOCK_ROUTES: Routes[] = [
  {
    routes_id: "RT001",
    departure_station_id: "BX001",
    arrival_station_id: "BX003",
    price: 350000,
    duration: 240,
    distance: 300,
    created_at: "2025-11-01T10:00:00Z",
    updated_at: "2025-11-01T10:00:00Z",
  } as any,
  {
    routes_id: "RT002",
    departure_station_id: "BX002",
    arrival_station_id: "BX004",
    price: 200000,
    duration: 180,
    distance: 150,
    created_at: "2025-11-05T10:00:00Z",
    updated_at: "2025-11-05T10:00:00Z",
  } as any,
];

export default function RoutesManager() {
  // const dispatch = useAppDispatch();
  // const { routes, loading, error } = useAppSelector((state) => state.routes);

  const [routes, setRoutes] = useState(MOCK_ROUTES); // Dùng state mô phỏng
  const loading = false;

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingRoute, setEditingRoute] = useState<Route | null>(null);
  const [isEditingMode, setIsEditingMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortType, setSortType] = useState<string>("updated_desc"); // Sắp xếp theo ngày cập nhật mới nhất

  // LOGIC LẤY DỮ LIỆU BAN ĐẦU
  useEffect(
    () => {
      // dispatch(fetchRoutesThunk());
    },
    [
      /* dispatch, error */
    ]
  );

  // --- HÀM TẠO ID CHUẨN (RTnnn) ---
  const generateNewRouteId = () => {
    const rtIds = routes
      .map((r) => r.routes_id)
      .filter((id) => id.startsWith("RT"))
      .map((id) => parseInt(id.replace("RT", "")))
      .filter((num) => !isNaN(num));

    const maxNum = rtIds.length > 0 ? Math.max(...rtIds) : 0;
    const newIdNum = maxNum + 1;
    return `RT${String(newIdNum).padStart(3, "0")}`;
  };

  // --- LOGIC LỌC, TÌM KIẾM, SẮP XẾP ---
  const filteredAndSortedRoutes = useMemo(() => {
    let result = routes.slice();

    // Tìm kiếm (theo ID Bến đi/đến, Giá, v.v.)
    if (searchTerm) {
      result = result.filter(
        (r) =>
          r.routes_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          r.departure_station_id
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          r.arrival_station_id
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          r.distance.toString().includes(searchTerm)
      );
    }

    // Sắp xếp
    if (sortType === "price_desc") { 
    result.sort((a, b) => b.price - a.price);

} else if (sortType === "time_desc") { 
    result.sort((a, b) => b.duration - a.duration);

} else if (sortType === "id_desc") {
    result.sort((a, b) => {
      const numA = parseInt(a.routes_id.replace("RT", ""));
      const numB = parseInt(b.routes_id.replace("RT", ""));
      return numB - numA;
    });
}

    return result;
  }, [routes, searchTerm, sortType]);

  // --- HÀM XỬ LÝ HÀNH ĐỘNG ---

  const handleSave = (routeData: Route) => {
    console.log("Dữ liệu Tuyến đường đã lưu:", routeData);
    message.success(
      isEditingMode ? "Lưu thay đổi thành công!" : "Thêm mới thành công!"
    );
    setIsModalVisible(false);
    setEditingRoute(null);
    // (Logic dispatch/cập nhật state)
  };

  const handleAdd = () => {
    const now = new Date().toISOString();
    const newId = generateNewRouteId();

    setEditingRoute({
      routes_id: newId,
      departure_station_id: "",
      arrival_station_id: "",
      price: 0,
      duration: 0,
      distance: 0,
      created_at: now,
      updated_at: now,
    } as any);

    setIsEditingMode(false);
    setIsModalVisible(true);
  };

  const handleEdit = (route: Route) => {
    setEditingRoute(route);
    setIsEditingMode(true);
    setIsModalVisible(true);
  };

  const handleDelete = (id: string) => {
    message.loading("Đang xóa tuyến đường...", 0.5);
    // dispatch(deleteRoutesThunk(id));
  };

  const handleExportExcel = () => {
    message.warning("Chức năng xuất Excel chưa được triển khai.");
  };

  return (
    <div>
      <div className="header-page flex flex-col gap-3">
        {/* Breadcrumb và Title */}
        <div className="flex items-center gap-3">
          <img src={home} alt="" />
          <img src={hide} className="rotate-90" alt="" />
          <p className="font-both">Quản lý tuyến đường</p>
        </div>
        <div className="flex justify-between pt-2">
          <div className="text-4xl">Danh sách tuyến đường</div>
          {/* ... (Logout section) ... */}
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

        {/* --- KHU VỰC HÀNH ĐỘNG VÀ LỌC --- */}
        <div className="flex gap-4 justify-between">
          {/* BÊN TRÁI: THÊM */}
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
            Thêm Tuyến Đường
          </Button>

          {/* BÊN PHẢI: XUẤT, LỌC, TÌM KIẾM */}
          <div className="flex gap-4">
            <div
              onClick={handleExportExcel}
              className="rounded-md flex gap-2 items-center border-2 border-gray-400 px-3 h-10 justify-center cursor-pointer hover:bg-gray-50 transition"
            >
              <img className="w-4 h-4" src={excel} alt="Xuất Excel" />
              <p className="m-0 text-sm">Xuất file</p>
            </div>
            <select
              className="rounded-md border-2 border-gray-400 px-3 h-10 text-sm"
              onChange={(e) => setSortType(e.target.value)}
              value={sortType}
            >
              <option value="id_desc">ID tuyến đường (Mới nhất)</option>
              <option value="price_desc">Giá</option>
              <option value="time_desc">Thời gian</option>
            </select>



            {/* Input Tìm kiếm */}
            <Input
              prefix={<SearchOutlined />}
              placeholder="Tìm kiếm theo ID, Bến đi/đến..."
              style={{ width: 250 }}
              size="large"
              onChange={(e) => setSearchTerm(e.target.value)}
              allowClear
            />
          </div>
        </div>
      </div>

      {/* --- BẢNG TUYẾN ĐƯỜNG --- */}
      <Table<Route>
        loading={loading}
        pagination={{ pageSize: 10 }}
        dataSource={filteredAndSortedRoutes}
        rowKey="routes_id"
        className="mt-4"
      >
        <Column
          title="ID"
          dataIndex="routes_id"
          key="routes_id"
          width={100}
        />
        <Column
          title="Bến Khởi hành"
          dataIndex="departure_station_id"
          key="departure_station_id"
        />
        <Column
          title="Bến Đến"
          dataIndex="arrival_station_id"
          key="arrival_station_id"
        />
        <Column
          title="Giá"
          dataIndex="price"
          key="price"
          render={formatCurrency}
        />
        <Column
          title="Thời gian"
          dataIndex="duration"
          key="duration"
          render={formatDuration}
        />
        <Column title="Khoảng cách (km)" dataIndex="distance" key="distance" />
        <Column
          title="Ngày Tạo"
          dataIndex="created_at"
          key="created_at"
          render={(dateString: string) => formatDateTime(dateString)}
        />
        <Column
          title="Ngày Cập Nhật"
          dataIndex="updated_at"
          key="updated_at"
          render={formatDateTime}
        />
        <Column
          title="Action"
          key="action"
          width={100}
          render={(_, record: Route) => (
            <Space key={record.routes_id}>
              <Tooltip title="Sửa">
                <Button
                  icon={<EditOutlined />}
                  type="link"
                  onClick={() => handleEdit(record)}
                />
              </Tooltip>
              <Popconfirm
                title={`Xác nhận xóa tuyến ${record.routes_id}?`}
                onConfirm={() => handleDelete(record.routes_id)}
              >
                <Tooltip title="Xóa">
                  <Button icon={<DeleteOutlined />} danger type="link" />
                </Tooltip>
              </Popconfirm>
            </Space>
          )}
        />
      </Table>
      {/* --- MODAL THÊM/SỬA --- */}
      <RouteModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onSave={handleSave}
        initialData={editingRoute}
        isEditModeProp={isEditingMode}
      />
    </div>
  );
}

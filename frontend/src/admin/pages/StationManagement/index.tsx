import { useState, useMemo, useEffect } from "react";
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

import {
  fetchStationsThunk,
  addStationThunk,
  updateStationThunk,
  deleteStationThunk,
} from "../../../apis/station.api";
import type { Station } from "../../../interfaces/Station";
import StationModal from "../../components/Modals/Stations/StationModal";
import home from "../../../assets/icons/home-icon.png";
import hide from "../../../assets/icons/icon_hide.png";
import logout from "../../../assets/icons/Icon-out.png";
import excel from "../../../assets/icons/excel-logo.png";
import { useAppDispatch, useAppSelector } from "../../../hooks/CustomHook";

const { Column } = Table;

const formatDateTime = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "N/A"; // Xử lý trường hợp ngày không hợp lệ
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

export default function StationManager() {
  const dispatch = useAppDispatch();
  const { stations, loading, error } = useAppSelector(
    (state) => state.station.stations
  );

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingStation, setEditingStation] = useState<Station | null>(null);
  const [isEditingMode, setIsEditingMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortType, setSortType] = useState<string>("id_desc");

  // LOGIC LẤY DỮ LIỆU BAN ĐẦU
  useEffect(() => {
    dispatch(fetchStationsThunk());
    if (error) message.error(error);
  }, [dispatch, error]);

  const filteredAndSortedStations = useMemo(() => {
    let result = stations.slice();

    // Tìm kiếm
    if (searchTerm) {
      result = result.filter(
        (s) =>
          s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          s.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sắp xếp
    if (sortType === "updated_desc") {
      result.sort(
        (a, b) =>
          new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
      );
    } else if (sortType === "date_desc") {
      result.sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    } else if (sortType === "id_desc") {
      // Sắp xếp theo ID giảm dần
      result.sort((a, b) => {
        // Lấy phần số của ID
        const numA = parseInt(a.id.replace("BX", ""));
        const numB = parseInt(b.id.replace("BX", ""));

        // Sắp xếp giảm dần: b - a
        return numB - numA;
      });
    }

    return result;
  }, [stations, searchTerm, sortType]);

  const generateNewStationId = () => {
    const bxIds = stations
      .map((s) => s.id)
      .filter((id) => id.startsWith("BX"))
      .map((id) => parseInt(id.replace("BX", "")))
      .filter((num) => !isNaN(num));

    const maxNum = bxIds.length > 0 ? Math.max(...bxIds) : 0;
    const newIdNum = maxNum + 1;

    const paddedNum = String(newIdNum).padStart(3, "0");

    return `BX${paddedNum}`;
  };

  // --- HÀM XỬ LÝ HÀNH ĐỘNG ---
  const handleAdd = () => {
    const now = new Date().toISOString();
    const newId = generateNewStationId();

    // Gán dữ liệu cơ sở cho Modal
    setEditingStation({
      id: newId,
      name: "",
      location: "",
      descriptions: "",
      phone: "",
      image: null,
      wallpaper: null,
      created_at: now,
      updated_at: now,
    } as any);

    setIsEditingMode(false);
    setIsModalVisible(true);
  };

  const handleEdit = (station: Station) => {
    setEditingStation(station);
    setIsEditingMode(true);
    setIsModalVisible(true);
  };

  const handleSave = (stationData: Station) => {
    // Dùng state isEditingMode để quyết định API nào cần gọi
    if (isEditingMode) {
      // Gọi UPDATE (PUT)
      dispatch(updateStationThunk(stationData));
      message.success("Đang cập nhật bến xe...");
    } else {
      // Gọi ADD (POST)
      dispatch(addStationThunk(stationData));
      message.success("Đang thêm bến xe...");
    }

    setIsModalVisible(false);
    setEditingStation(null);
  };

  const handleDelete = (id: string) => {
    dispatch(deleteStationThunk(id));
    message.loading("Đang xóa bến xe...", 0.5);
    console.log("Xóa ID:", id);
  };

  const handleExportExcel = () => {
    if (filteredAndSortedStations.length === 0) {
      message.warning("Không có dữ liệu để xuất file.");
      return;
    }

    // Chuẩn bị dữ liệu để xuất file
    const exportData = filteredAndSortedStations.map((s) => ({
      ID: s.id,
      "Tên Bến Xe": s.name,
      "Địa Chỉ": s.location,
      "Mô Tả": s.descriptions,
      "Số ĐT": s.phone,
      "Ngày Tạo": formatDateTime(s.created_at),
      "Ngày Cập Nhật": formatDateTime(s.updated_at),
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);

    worksheet["!cols"] = Object.keys(exportData[0]).map(() => ({ wch: 25 }));

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Danh_sach_Ben_Xe");

    try {
      XLSX.writeFile(
        workbook,
        "Danh_sach_Ben_Xe_" + new Date().toISOString().slice(0, 10) + ".xlsx"
      );
      message.success("Đã xuất file Excel thành công!");
    } catch (e) {
      message.error("Lỗi khi xuất file Excel.");
      console.error(e);
    }
  };

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

        {/* {Các chức năng} */}
        <div className="flex gap-4 justify-between">
          {/* BÊN TRÁI: THÊM */}
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
            Thêm Bến Xe
          </Button>

          {/* BÊN PHẢI: XUẤT, TÌM KIẾM */}
          <div className="flex gap-4">
            {/* Xuất file */}
            <div
              onClick={handleExportExcel}
              className="rounded-md flex gap-2 items-center border-2 border-gray-400 px-3 h-10 justify-center cursor-pointer hover:bg-gray-50 transition"
            >
              <img className="w-4 h-4" src={excel} alt="Xuất Excel" />
              <p className="m-0 text-sm">Xuất file</p>
            </div>

            {/* Select Sắp xếp */}
            <select
              className="rounded-md border-2 border-gray-400 px-3 h-10 text-sm"
              onChange={(e) => setSortType(e.target.value)}
              value={sortType}
            >
              <option value="id_desc">ID Bến Xe (Mới nhất)</option>
              <option value="date_desc">Ngày tạo (Mới nhất)</option>
              <option value="update_desc">Ngày cập nhật (Mới nhất)</option>
            </select>

            {/* Input Tìm kiếm */}
            <Input
              prefix={<SearchOutlined />}
              placeholder="Tìm kiếm theo Tên/Địa chỉ"
              style={{ width: 250 }}
              size="large"
              onChange={(e) => setSearchTerm(e.target.value)}
              allowClear
            />
          </div>
        </div>
      </div>

      {/* --- BẢNG BẾN XE --- */}
      <Table<Station>
        loading={loading}
        pagination={{ pageSize: 5 }}
        dataSource={filteredAndSortedStations}
        rowKey="id"
        className="p-4"
      >
        <Column title="ID" dataIndex="id" key="id" width={80} />
        <Column title="Tên Bến Xe" dataIndex="name" key="name" />
        <Column title="Địa chỉ" dataIndex="location" key="location" />
        <Column title="Số ĐT" dataIndex="phone" key="phone" width={100} />
        <Column title="Mô Tả" dataIndex="descriptions" key="descriptions" />
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
          render={(dateString: string) => formatDateTime(dateString)}
        />
        <Column
          title="Action"
          key="action"
          width={100}
          render={(_, record: Station) => (
            <Space key={record.id}>
              <Tooltip title="Sửa">
                <Button
                  icon={<EditOutlined />}
                  type="link"
                  onClick={() => handleEdit(record)}
                />
              </Tooltip>
              <Popconfirm
                title={`Xác nhận xóa ${record.name}?`}
                onConfirm={() => handleDelete(record.id)}
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
      <StationModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onSave={handleSave}
        initialData={editingStation} // Dữ liệu sẽ được điền khi sửa
        isEditModeProp={isEditingMode}
      />
    </div>
  );
}

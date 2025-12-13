import { useState, useMemo, useEffect } from "react";
import {
  Button,
  Input,
  Space,
  Table,
  Tooltip,
  Popconfirm,
  message,
  Tag,
} from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import * as XLSX from "xlsx";
import { useAppSelector, useAppDispatch } from "../../../hooks/CustomHook";
import type { Bus } from "../../../interfaces/Bus";
import BusModal from "../../components/Modals/Bus/BusModal";

import home from "../../../assets/icons/home-icon.png";
import hide from "../../../assets/icons/icon_hide.png";
import logout from "../../../assets/icons/Icon-out.png";
import excel from "../../../assets/icons/excel-logo.png";

import {
  addBusThunk,
  deleteBusThunk,
  fetchBusesThunk,
  updateBusThunk,
  type CombinedBus,
} from "../../../apis/bus.api";

const { Column } = Table;

// Hàm format ngày tháng
const formatDateTime = (dateString: string | Date): string => {
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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    return "N/A";
  }
};

export default function BusManager() {
  const dispatch = useAppDispatch();
  const { buses, error } = useAppSelector((state) => state.buses);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingBus, setEditingBus] = useState<CombinedBus | null>(null);
  const [isEditingMode, setIsEditingMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortType, setSortType] = useState<string>("id_desc");

  useEffect(() => {
    dispatch(fetchBusesThunk());
    if (error) message.error(error);
  }, [dispatch, error]);

  const filteredAndSortedBuses = useMemo(() => {
    let result = buses.slice();

    // Tìm kiếm
    if (searchTerm) {
      result = result.filter(
        (s) =>
          s.bus_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          s.license_plate.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sắp xếp
    if (sortType === "updated_desc") {
      result.sort(
        (a, b) =>
          new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
      );
    } else if (sortType === "id_desc") {
      // Sắp xếp theo ID giảm dần
      result.sort((a, b) => {
        // Lấy phần số của ID
        const numA = parseInt(a.id.replace("X", ""));
        const numB = parseInt(b.id.replace("X", ""));

        // Sắp xếp giảm dần: b - a
        return numB - numA;
      });
    }

    return result;
  }, [buses, searchTerm, sortType]);

  const generateNewBusId = () => {
    const xIds = buses
      .map((b) => b.id)
      .filter((id) => id.startsWith("X"))
      .map((id) => parseInt(id.replace("X", "")))
      .filter((num) => !isNaN(num));

    const maxNum = xIds.length > 0 ? Math.max(...xIds) : 0;
    const newIdNum = maxNum + 1;

    return `X${String(newIdNum).padStart(3, "0")}`;
  };

  const handleSave = (
    busData: Bus,
    imagesToDelete: string[],
    _filesToUpload: File[],
    uploadedUrls: string[]
  ) => {
    const finalPayload = {
      bus: busData,
      imagesToDelete: imagesToDelete,
      imagesToAdd: uploadedUrls, // Dùng URL đã được upload từ Modal
    };

    if (isEditingMode) {
      // Gọi UPDATE (Sửa xe + xử lý ảnh)
      dispatch(updateBusThunk(finalPayload));
    } else {
      // Gọi ADD (Thêm xe + thêm ảnh)
      const addPayload = {
        bus: busData,
        newImageUrls: uploadedUrls,
      };
      dispatch(addBusThunk(addPayload));
    }

    message.success("Đang xử lý dữ liệu xe và hình ảnh...");
    setIsModalVisible(false);
    setEditingBus(null);
  };

  const handleAdd = () => {
    const now = new Date().toISOString();
    const newId = generateNewBusId();

    setEditingBus({
      id: newId,
      company_id: "",
      bus_name: "",
      descriptions: "",
      license_plate: "",
      capacity: 0,
      images: [],
      created_at: now.toString(),
      updated_at: now.toString(),
    } as unknown as CombinedBus);

    setIsEditingMode(false);
    setIsModalVisible(true);
  };

  const handleEdit = (bus: CombinedBus) => {
    setEditingBus(bus);
    setIsEditingMode(true);
    setIsModalVisible(true);
  };

  const handleDelete = (id: string) => {
    // Gọi DELETE thunk (sẽ xử lý cả ảnh liên quan)
    dispatch(deleteBusThunk(id));
    message.loading("Đang xóa xe...", 0.5);
  };

  const handleExportExcel = () => {
    if (filteredAndSortedBuses.length === 0) {
      message.warning("Không có dữ liệu xe để xuất file.");
      return;
    }

    const exportData = filteredAndSortedBuses.map((b) => ({
      ID: b.id,
      "ID Nhà Xe": b.company_id,
      "Tên Xe": b.name,
      "Biển Số": b.license_plate,
      "Số Ghế": b.capacity === null || b.capacity === undefined 
                 ? '0' 
                 : String(b.capacity),
      "Mô Tả": b.descriptions,
      "Ngày Tạo": formatDateTime(b.created_at),
      "Ngày Cập Nhật": formatDateTime(b.updated_at),
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);

    worksheet["!cols"] = Object.keys(exportData[0]).map(() => ({ wch: 20 }));

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Danh_sach_Xe");

    try {
      XLSX.writeFile(
        workbook,
        "Danh_sach_Xe_" + new Date().toISOString().slice(0, 10) + ".xlsx"
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
          <p className="font-both">Quản lý xe</p>
        </div>
        {/* Tên trang và đăng xuất */}
        <div className="flex justify-between pt-2">
          <div className="text-4xl">Danh sách xe</div>
          {/* ... (Phần Avatar và Logout giữ nguyên) ... */}
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
            Thêm Xe
          </Button>

          {/* BÊN PHẢI: XUẤT, LỌC, TÌM KIẾM */}
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
              <option value="id_desc">ID Xe (Mới nhất)</option>
              <option value="update_desc">Ngày cập nhật (Mới nhất)</option>
            </select>

            {/* Input Tìm kiếm */}
            <Input
              prefix={<SearchOutlined />}
              placeholder="Tìm kiếm theo Tên/Biển số..."
              style={{ width: 250 }}
              size="large"
              onChange={(e) => setSearchTerm(e.target.value)}
              allowClear
            />
          </div>
        </div>
      </div>

      {/* --- BẢNG XE --- */}
      <Table<CombinedBus>
        pagination={{ pageSize: 5 }}
        dataSource={filteredAndSortedBuses}
        rowKey="id"
        className="p-4"
      >
        <Column title="ID" dataIndex="id" key="id" width={80} />
        <Column title="ID Nhà Xe" dataIndex="company_id" key="company_id" />
        <Column title="Tên Xe" dataIndex="name" key="name" />
        <Column title="Mô Tả" dataIndex="descriptions" key="descriptions" />
        <Column title="Biển Số" dataIndex="license_plate" key="license_plate" />
        <Column title="Số Ghế" dataIndex="capacity" key="capacity" />
        {/* Sửa dataIndex */}
        <Column
          title="Ảnh (Số lượng)"
          key="image_count"
          width={100}
          render={(_, record: CombinedBus) => (
            <Tag color="blue">{record.images.length}</Tag>
          )}
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
          render={(_, record: CombinedBus) => (
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
      <BusModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onSave={handleSave}
        initialData={editingBus}
        isEditModeProp={isEditingMode}
      />
    </div>
  );
}

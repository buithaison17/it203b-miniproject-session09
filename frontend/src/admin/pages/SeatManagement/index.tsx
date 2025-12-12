import React, { useState, useMemo, useEffect } from "react";
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
  DollarOutlined,
} from "@ant-design/icons";
import * as XLSX from "xlsx";

// Giả định imports từ Redux/API cho Seat
// import { useAppSelector, useAppDispatch } from "../../../stores/store";
// import { fetchSeatsThunk, addSeatThunk, updateSeatThunk, deleteSeatThunk } from "../../../slices/seatSlice"; 
import type { Seat } from "../../../interfaces/Bus"; // <-- Interface mới
import SeatModal from "../../components/Modals/Seat/SeatModal"; // <-- Modal mới

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
    return date.toLocaleString('vi-VN', {
      day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit',
    });
  } catch (e) {
    return "N/A";
  }
};

// Hàm định dạng tiền tệ
const formatCurrency = (amount: number): string => {
    return amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
};


export default function SeatManager() {
  // const dispatch = useAppDispatch();
  // const { seats, loading, error } = useAppSelector((state) => state.seats); 

  // --- DỮ LIỆU VÀ STATE MÔ PHỎNG ---
  const MOCK_SEATS: Seat[] = [
    { id: "S001", bus_id: "X001", seat_number: "A01", seat_type: "Thường", status: "active", price: 300000, created_at: "2025-12-01T10:00:00Z", updated_at: "2025-12-01T10:00:00Z" } as any,
    { id: "S002", bus_id: "X001", seat_number: "A02", seat_type: "Thường", status: "booked", price: 300000, created_at: "2025-12-01T10:00:00Z", updated_at: "2025-12-01T10:00:00Z" } as any,
    { id: "S003", bus_id: "X002", seat_number: "B01", seat_type: "VIP", status: "active", price: 550000, created_at: "2025-12-02T10:00:00Z", updated_at: "2025-12-02T10:00:00Z" } as any,
  ];
  const [seats, setSeats] = useState(MOCK_SEATS);
  const loading = false;

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingSeat, setEditingSeat] = useState<Seat | null>(null); 
  const [isEditingMode, setIsEditingMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortType, setSortType] = useState<string>("id_desc");
  const [filterStatus, setFilterStatus] = useState<string>("");

  // LOGIC LẤY DỮ LIỆU BAN ĐẦU
  useEffect(() => {
    // dispatch(fetchSeatsThunk()); 
  }, [/* dispatch, error */]);

  // --- HÀM TẠO ID CHUẨN (Snnn) ---
  const generateNewSeatId = () => {
    const sIds = seats
      .map(s => s.id)
      .filter(id => id.startsWith('S')) 
      .map(id => parseInt(id.replace('S', ''))) 
      .filter(num => !isNaN(num)); 

    const maxNum = sIds.length > 0 ? Math.max(...sIds) : 0;
    const newIdNum = maxNum + 1;
    const paddedNum = String(newIdNum).padStart(3, '0');
    
    return `S${paddedNum}`;
  };

  // --- LOGIC LỌC, TÌM KIẾM, SẮP XẾP ---
  const filteredAndSortedSeats = useMemo(() => {
    let result = seats.slice();

    // Tìm kiếm (theo ID Xe, Mã ghế, Loại ghế)
    if (searchTerm) {
      result = result.filter(
        (s) =>
          s.bus_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          s.seat_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
          s.seat_type.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Lọc theo Trạng thái
    if (filterStatus) {
        result = result.filter((s) => s.status === filterStatus);
    }

    // Sắp xếp (Theo ID giảm dần)
    if (sortType === "id_desc") { 
      result.sort((a, b) => {
        const numA = parseInt(a.id.replace('S', '')); 
        const numB = parseInt(b.id.replace('S', '')); 
        return numB - numA;
      });
    }

    return result;
  }, [seats, searchTerm, sortType, filterStatus]); 

  // --- HÀM RENDER TRẠNG THÁI ---
  const renderStatusTag = (status: 'active' | 'inactive' | 'booked') => {
      switch (status) {
          case 'active':
              return <Tag color="success">Trống</Tag>;
          case 'booked':
              return <Tag color="error">Đã đặt</Tag>;
          case 'inactive':
              return <Tag color="default">Không dùng</Tag>;
          default:
              return null;
      }
  };


  // --- HÀM XỬ LÝ HÀNH ĐỘNG ---
  
  const handleSave = (seatData: Seat) => { 
    console.log("Dữ liệu Ghế đã lưu:", seatData);
    message.success(isEditingMode ? "Lưu thay đổi thành công!" : "Thêm mới thành công!");
    setIsModalVisible(false);
    setEditingSeat(null);
    // (Logic dispatch/cập nhật state)
  };

  const handleAdd = () => {
    const now = new Date().toISOString();
    const newId = generateNewSeatId();
    
    setEditingSeat({ 
      id: newId, 
      bus_id: '', seat_number: '', seat_type: '', status: 'active', price: 0,
      created_at: now, 
      updated_at: now,
    } as any); 
    
    setIsEditingMode(false); 
    setIsModalVisible(true);
  };

  const handleEdit = (seat: Seat) => { 
    setEditingSeat(seat);
    setIsEditingMode(true); 
    setIsModalVisible(true);
  };

  const handleDelete = (id: string) => {
    message.loading("Đang xóa ghế...", 0.5);
    // dispatch(deleteSeatThunk(id)); 
  };

  const handleExportExcel = () => {
    message.warning('Chức năng xuất Excel chưa được triển khai.');
  };


  return (
    <div>
      <div className="header-page flex flex-col gap-3">
        {/* Breadcrumb và Title */}
        <div className="flex items-center gap-3">
          <img src={home} alt="" />
          <img src={hide} className="rotate-90" alt="" />
          <p className="font-both">Quản lý ghế ngồi</p>
        </div>
        <div className="flex justify-between pt-2">
          <div className="text-4xl">Danh sách ghế</div>
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
            Thêm Ghế
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
            
            {/* Select Lọc theo Trạng thái */}
            <select
                className="rounded-md border-2 border-gray-400 px-3 h-10 text-sm"
                onChange={(e) => setFilterStatus(e.target.value)}
                value={filterStatus}
            >
                <option value="">Trạng thái (Tất cả)</option>
                <option value="active">Trống</option>
                <option value="booked">Đã đặt</option>
                <option value="inactive">Không dùng</option>
            </select>

            {/* Input Tìm kiếm */}
            <Input
              prefix={<SearchOutlined />}
              placeholder="Tìm kiếm theo Mã ghế, ID Xe..."
              style={{ width: 250 }}
              size="large"
              onChange={(e) => setSearchTerm(e.target.value)}
              allowClear
            />
          </div>
        </div>
      </div>

      {/* --- BẢNG GHẾ NGỒI --- */}
      <Table<Seat>
        loading={loading}
        pagination={{ pageSize: 10 }}
        dataSource={filteredAndSortedSeats}
        rowKey="id"
        className="mt-4"
      >
        <Column title="ID Ghế" dataIndex="id" key="id" width={80} />
        <Column title="ID Xe" dataIndex="bus_id" key="bus_id" width={100} />
        <Column title="Mã Ghế" dataIndex="seat_number" key="seat_number" width={100} />
        <Column title="Loại Ghế" dataIndex="seat_type" key="seat_type" width={100} />
        <Column title="Giá" dataIndex="price" key="price" width={100} render={formatCurrency} />
        <Column 
            title="Trạng thái" 
            dataIndex="status" 
            key="status"
            width={120}
            render={renderStatusTag}
        />
        <Column 
            title="Ngày Tạo" 
            dataIndex="created_at" 
            key="created_at"
            width={150}
            render={formatDateTime}
        />
        <Column 
            title="Ngày Cập Nhật" 
            dataIndex="updated_at" 
            key="updated_at"
            width={150}
            render={formatDateTime}
        />
        <Column
          title="Action"
          key="action"
          width={100}
          render={(_, record: Seat) => (
            <Space key={record.id}>
              <Tooltip title="Sửa">
                <Button
                  icon={<EditOutlined />}
                  type="link"
                  onClick={() => handleEdit(record)}
                />
              </Tooltip>
              <Popconfirm
                title={`Xác nhận xóa ghế ${record.seat_number}?`}
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
       {/* Cần tạo component SeatModal tương tự BusCompanyModal */}
       <SeatModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onSave={handleSave}
        initialData={editingSeat}
        isEditModeProp={isEditingMode}
      />
    </div>
  );
}
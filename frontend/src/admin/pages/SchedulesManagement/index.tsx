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
} from "@ant-design/icons";
import * as XLSX from "xlsx";

// Giả định imports từ Redux/API
// import { useAppSelector, useAppDispatch } from "../../../stores/store";
// import { fetchSchedulesThunk, addScheduleThunk, updateScheduleThunk, deleteScheduleThunk } from "../../../slices/scheduleSlice"; 
import type { Schedules } from "../../../interfaces/Schedules"; // <-- Interface mới
import ScheduleModal from "../../components/Modals/Schedule/ScheduleModal"; // <-- Modal mới

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
    return date.toLocaleString('vi-VN', {
      day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit',
    });
  } catch (e) {
    return "N/A";
  }
};

// Hàm định dạng thời gian (chỉ lấy giờ và phút)
const formatTime = (timeString: string | Date): string => {
    try {
        const date = new Date(timeString);
        if (isNaN(date.getTime())) return "N/A";
        return date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
    } catch (e) {
        return "N/A";
    }
};


// --- DỮ LIỆU VÀ STATE MÔ PHỎNG ---
const MOCK_SCHEDULES: Schedules[] = [
    { id: "SCH001", route_id: "RT001", bus_id: "X001", departure_time: "2025-12-12T08:00:00Z" as any, arrival_time: "2025-12-12T12:00:00Z" as any, available_seat: 30, total_seats: 40, status: "active", created_at: "2025-12-11T10:00:00Z", updated_at: "2025-12-11T10:00:00Z" } as any,
    { id: "SCH002", route_id: "RT002", bus_id: "X002", departure_time: "2025-12-13T15:00:00Z" as any, arrival_time: "2025-12-13T18:00:00Z" as any, available_seat: 5, total_seats: 9, status: "active", created_at: "2025-12-11T10:00:00Z", updated_at: "2025-12-11T10:00:00Z" } as any,
];


export default function SchedulesManager() {
    // const dispatch = useAppDispatch();
    // const { schedules, loading, error } = useAppSelector((state) => state.schedules); 

    const [schedules, setSchedules] = useState(MOCK_SCHEDULES); // Dùng state mô phỏng
    const loading = false;

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingSchedule, setEditingSchedule] = useState<Schedules | null>(null); 
    const [isEditingMode, setIsEditingMode] = useState(false);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [sortType, setSortType] = useState<string>("id_desc"); // Sắp xếp theo ID giảm dần

    // LOGIC LẤY DỮ LIỆU BAN ĐẦU
    useEffect(() => {
        // dispatch(fetchSchedulesThunk()); 
    }, [/* dispatch, error */]);

    // --- HÀM TẠO ID CHUẨN (SCHnnn) ---
    const generateNewScheduleId = () => {
        const schIds = schedules
            .map(s => s.id)
            .filter(id => id.startsWith('SCH')) 
            .map(id => parseInt(id.replace('SCH', ''))) 
            .filter(num => !isNaN(num)); 

        const maxNum = schIds.length > 0 ? Math.max(...schIds) : 0;
        const newIdNum = maxNum + 1;
        return `SCH${String(newIdNum).padStart(3, '0')}`;
    };

    // --- LOGIC LỌC, TÌM KIẾM, SẮP XẾP ---
    const filteredAndSortedSchedules = useMemo(() => {
        let result = schedules.slice();

        // Tìm kiếm (theo ID, Mã Tuyến, Mã Xe)
        if (searchTerm) {
            result = result.filter(
                (s) =>
                    s.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    s.route_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    s.bus_id.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Sắp xếp

if (sortType === "active_desc") {
    // Sắp xếp: Đẩy các lịch trình "active" lên đầu
    result.sort((a, b) => {
        if (a.status === 'active' && b.status !== 'active') return -1; // a lên trước b
        if (a.status !== 'active' && b.status === 'active') return 1;  // b lên trước a
        return 0; // Giữ nguyên thứ tự nếu cùng trạng thái
    });

} else if (sortType === "inactive_desc") {
    // Sắp xếp: Đẩy các lịch trình "inactive" lên đầu
    result.sort((a, b) => {
        if (a.status === 'inactive' && b.status !== 'inactive') return -1;
        if (a.status !== 'inactive' && b.status === 'inactive') return 1;
        return 0;
    });

} else if (sortType === "seat_available_desc") { 
    // Sắp xếp: Đẩy lịch trình CÒN GHẾ lên đầu =
    result.sort((a, b) => b.available_seat - a.available_seat);

} else if (sortType === "seat_full_asc") { 
    // Sắp xếp: Đẩy lịch trình HẾT GHẾ lên đầu 
    result.sort((a, b) => a.available_seat - b.available_seat);

} 

        return result;
    }, [schedules, searchTerm, sortType]); 

    // --- HÀM RENDER TRẠNG THÁI ---
    const renderStatusTag = (status: 'active' | 'inactive') => {
        return status === 'active' 
            ? <Tag color="success">Hoạt động</Tag>
            : <Tag color="default">Ngừng hoạt động</Tag>;
    };

    // --- HÀM XỬ LÝ HÀNH ĐỘNG ---
    
    const handleSave = (scheduleData: Schedules) => { 
        console.log("Dữ liệu Lịch trình đã lưu:", scheduleData);
        message.success(isEditingMode ? "Lưu thay đổi thành công!" : "Thêm mới thành công!");
        setIsModalVisible(false);
        setEditingSchedule(null);
        // (Logic dispatch/cập nhật state)
    };

    const handleAdd = () => {
        const now = new Date().toISOString();
        const newId = generateNewScheduleId();
        
        setEditingSchedule({ 
            id: newId, 
            route_id: '', 
            bus_id: '', 
            departure_time: now, 
            arrival_time: now, 
            available_seat: 0, 
            total_seats: 0, 
            status: 'active',
            created_at: now, 
            updated_at: now,
        } as any); 
        
        setIsEditingMode(false); 
        setIsModalVisible(true);
    };

    const handleEdit = (schedule: Schedules) => { 
        setEditingSchedule(schedule);
        setIsEditingMode(true); 
        setIsModalVisible(true);
    };

    const handleDelete = (id: string) => {
        message.loading("Đang xóa lịch trình...", 0.5);
        // dispatch(deleteSchedulesThunk(id)); 
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
                    <p className="font-both">Quản lý lịch trình</p>
                </div>
                <div className="flex justify-between pt-2">
                    <div className="text-4xl">Danh sách lịch trình</div>
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
                        Thêm Lịch trình
                    </Button>

                    {/* BÊN PHẢI: XUẤT, TÌM KIẾM */}
                    <div className="flex gap-4">
                        <div
                            onClick={handleExportExcel}
                            className="rounded-md flex gap-2 items-center border-2 border-gray-400 px-3 h-10 justify-center cursor-pointer hover:bg-gray-50 transition"
                        >
                            <img src={excel} alt="Xuất Excel" />
                            <p className="m-0 text-sm">Xuất file</p>
                        </div>

                        <select
              className="rounded-md border-2 border-gray-400 px-3 h-10 text-sm"
              onChange={(e) => setSortType(e.target.value)}
              value={sortType}
            ><option value="">Trạng thái (Tất cả)</option>
              <option value="active_desc">Hoạt động</option>
              <option value="inactive_desc">Không hoạt động</option>
            </select>

            <select
              className="rounded-md border-2 border-gray-400 px-3 h-10 text-sm"
              onChange={(e) => setSortType(e.target.value)}
              value={sortType}
            >
                <option value="">Ghế (Tất cả)</option>
              <option value="seat_available_desc">Còn ghế</option>
              <option value="seat_full_asc">Hết ghế</option>
            </select>
                        
                        {/* Input Tìm kiếm */}
                        <Input
                            prefix={<SearchOutlined />}
                            placeholder="Tìm kiếm theo Mã Tuyến, Mã Xe..."
                            style={{ width: 250 }}
                            size="large"
                            onChange={(e) => setSearchTerm(e.target.value)}
                            allowClear
                        />
                    </div>
                </div>
            </div>

            {/* --- BẢNG LỊCH TRÌNH --- */}
            <Table<Schedules>
                loading={loading}
                pagination={{ pageSize: 10 }}
                dataSource={filteredAndSortedSchedules}
                rowKey="id"
                className="mt-4"
            >
                <Column title="Mã Lịch trình" dataIndex="id" key="id" width={120} />
                <Column title="Mã Tuyến" dataIndex="route_id" key="route_id" width={100} />
                <Column title="Mã Xe" dataIndex="bus_id" key="bus_id" width={100} />
                <Column title="Khởi hành" dataIndex="departure_time" key="departure_time" width={100} render={formatTime} />
                <Column title="Đến nơi" dataIndex="arrival_time" key="arrival_time" width={100} render={formatTime} />
                <Column 
                    title="Ghế (Còn/Tổng)" 
                    key="seats" 
                    width={120}
                    render={(_, record: Schedules) => `${record.available_seat}/${record.total_seats}`} 
                />
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
                    title="Action"
                    key="action"
                    width={100}
                    render={(_, record: Schedules) => (
                        <Space key={record.id}>
                            <Tooltip title="Sửa">
                                <Button
                                    icon={<EditOutlined />}
                                    type="link"
                                    onClick={() => handleEdit(record)}
                                />
                            </Tooltip>
                            <Popconfirm
                                title={`Xác nhận xóa lịch trình ${record.id}?`}
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
            <ScheduleModal
                visible={isModalVisible}
                onClose={() => setIsModalVisible(false)}
                onSave={handleSave}
                initialData={editingSchedule}
                isEditModeProp={isEditingMode}
            />
        </div>
    );
}
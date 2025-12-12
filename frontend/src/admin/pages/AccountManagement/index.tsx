import{ useState, useMemo, useEffect } from "react";
import {
    Button,
    Input,
    Table,
    Tooltip,
    message,
    Tag,
} from "antd";
import {
    SearchOutlined,
    BlockOutlined,
    CheckCircleOutlined,
} from "@ant-design/icons";

// Giả định hooks và thunks đã được import (Giữ nguyên phần comment)
// import { useAppSelector, useAppDispatch } from "../../../stores/store";
// import { fetchUsersThunk, updateUserStatusThunk } from "../../../slices/userSlice"; 
import type { User } from "../../../interfaces/User"; 

import home from "../../../assets/icons/home-icon.png";
import hide from "../../../assets/icons/icon_hide.png";
import logout from "../../../assets/icons/Icon-out.png";

const { Column } = Table;

// Hàm định dạng ngày tháng (Tái sử dụng)
const formatDateTime = (dateString: string): string => {
  try {
    // Vì trường ngày tháng trong Redux Store/API là string ISO, ta cần new Date() tại đây
    const date = new Date(dateString); 
    if (isNaN(date.getTime())) return "N/A";
    return date.toLocaleString('vi-VN', {
      day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit',
    });
  } catch (e) {
    return "N/A";
  }
};


export default function UserManager() {
    // const dispatch = useAppDispatch();
    // const { users, loading, error } = useAppSelector((state) => state.users);
    
    // --- DỮ LIỆU VÀ STATE MÔ PHỎNG (Sẽ được thay thế bằng Redux) ---
    const MOCK_USERS: User[] = [
        { id: "U001", first_name: "Nguyễn", last_name: "Văn A", email: "a@example.com", phone: "0901234567", status: "active", password: "", created_at: "2025-11-01T10:00:00Z", updated_at: "2025-11-01T10:00:00Z" } as any,
        { id: "U002", first_name: "Trần", last_name: "Thị B", email: "b@example.com", phone: "0909876543", status: "block", password: "", created_at: "2025-11-15T10:00:00Z", updated_at: "2025-12-01T10:00:00Z" } as any,
        { id: "U003", first_name: "Lê", last_name: "Văn C", email: "c@example.com", phone: "0912345678", status: "inactive", password: "", created_at: "2025-12-05T10:00:00Z", updated_at: "2025-12-05T10:00:00Z" } as any,
    ];
    const [users, setUsers] = useState(MOCK_USERS); // Dùng state để mô phỏng cập nhật
    const loading = false;
    
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [filterStatus, setFilterStatus] = useState<string>(""); 
      const [sortType, setSortType] = useState<string>("id_desc");


    // LOGIC LẤY DỮ LIỆU BAN ĐẦU
    useEffect(() => {
        // dispatch(fetchUsersThunk());
        // if (error) message.error(error);
    }, [/* dispatch, error */]);

    // --- LOGIC LỌC VÀ TÌM KIẾM ---
    const filteredUsers = useMemo(() => {
        let result = users.slice();

        // 1. Tìm kiếm (theo Tên, Email, hoặc SĐT)
        if (searchTerm) {
            result = result.filter(
                (u) =>
                    (u.first_name + ' ' + u.last_name).toLowerCase().includes(searchTerm.toLowerCase()) ||
                    u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    u.phone.includes(searchTerm)
            );
        }

        // 2. Lọc theo Trạng thái
        if (filterStatus) {
            result = result.filter((u) => u.status === filterStatus);
        }

        // Sắp xếp
    if (sortType === "name_desc") {
    result.sort(
        (a, b) =>
            a.first_name.localeCompare(b.first_name)
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
            const numA = parseInt(a.id.replace('U', ''));
            const numB = parseInt(b.id.replace('U'  , ''));

            // Sắp xếp giảm dần: b - a
            return numB - numA;
        });
    }
        
        return result;
    }, [users, searchTerm, filterStatus, sortType]);
    
    
    // --- HÀM CẬP NHẬT TRẠNG THÁI (Mô phỏng) ---
    const handleToggleStatus = (user: User) => {
        const newStatus = user.status === 'block' ? 'active' : 'block';
        
        const updatedUser: User = { 
            ...user, 
            status: newStatus,
            updated_at: new Date().toISOString()    
        };

        // --- MÔ PHỎNG CẬP NHẬT STATE ---
        setUsers(prev => prev.map(u => u.id === user.id ? updatedUser : u));

        // dispatch(updateUserStatusThunk(updatedUser));
        message.loading(`Đang ${newStatus === 'block' ? 'Khóa' : 'Mở khóa'} tài khoản...`, 1.5).then(() => {
            message.success(`Đã cập nhật trạng thái sang: ${newStatus}`);
        });
    };


    // --- HÀM RENDER TRẠNG THÁI ---
    const renderStatusTag = (status: 'active' | 'inactive' | 'block') => {
        switch (status) {
            case 'active':
                return <Tag icon={<CheckCircleOutlined />} color="success">Active</Tag>;
            case 'block':
                return <Tag icon={<BlockOutlined />} color="error">Block</Tag>;
            case 'inactive':
                return <Tag color="default">Inactive</Tag>;
            default:
                return null;
        }
    };


    return (
        <div>
            <div className="header-page flex flex-col gap-3">
                {/* Breadcrumb và Title */}
                <div className="flex items-center gap-3">
                    <img src={home} alt="" />
                    <img src={hide} className="rotate-90" alt="" />
                    <p className="font-both">Quản lý người dùng</p>
                </div>
                <div className="flex justify-between pt-2">
                    <div className="text-4xl">Danh sách người dùng</div>
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
                <div className="flex gap-4 justify-end">
                    
                    {/* Select Lọc theo Trạng thái */}
                    <select
                        className="rounded-md border-2 border-gray-400 px-3 h-10 text-sm"
                        onChange={(e) => setFilterStatus(e.target.value)}
                        value={filterStatus}
                    >
                        <option value="">Tất cả trạng thái</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="block">Block</option>
                    </select>

                    <select
              className="rounded-md border-2 border-gray-400 px-3 h-10 text-sm"
              onChange={(e) => setSortType(e.target.value)}
              value={sortType}
            >
              <option value="id_desc">ID người dùng (Mới nhất)</option>
              <option value="date_desc">Ngày đăng ký (Mới nhất)</option>
              <option value="name_desc">Tên (A - Z)</option>
            </select>
                    

                    {/* Input Tìm kiếm */}
                    <Input
                        prefix={<SearchOutlined />}
                        placeholder="Tìm kiếm theo Tên, Email, SĐT..."
                        style={{ width: 300 }}
                        size="large"
                        onChange={(e) => setSearchTerm(e.target.value)}
                        allowClear
                    />
                </div>
            </div>

            {/* --- BẢNG NGƯỜI DÙNG --- */}
            <Table<User>
                loading={loading}
                pagination={{ pageSize: 10 }}
                dataSource={filteredUsers}
                rowKey="id"
                className="mt-4"
            >
                <Column title="ID" dataIndex="id" key="id" width={80} />
                <Column 
                    title="Họ và Tên" 
                    key="full_name" 
                    // Kết hợp first_name và last_name để hiển thị đầy đủ
                    render={(_, record: User) => `${record.first_name} ${record.last_name}`}
                />
                <Column title="Email" dataIndex="email" key="email" />
                <Column title="Phone" dataIndex="phone" key="phone" width={120} />
                <Column 
                    title="Trạng thái" 
                    dataIndex="status" 
                    key="status"
                    width={120}
                    render={renderStatusTag}
                />
                <Column 
                    title="Ngày Đăng ký" 
                    dataIndex="created_at" 
                    key="created_at"
                    width={150}
                    render={formatDateTime}
                />
                <Column 
                    title="Action" 
                    key="action"
                    width={100}
                    render={(_, record: User) => (
                        <Tooltip 
                            title={record.status === 'block' ? "Mở khóa" : "Khóa tài khoản"}
                        >
                            <Button
                                icon={record.status === 'block' ? <CheckCircleOutlined /> : <BlockOutlined />}
                                danger={record.status !== 'block'} // Đặt danger nếu trạng thái là active/inactive
                                type="primary"
                                onClick={() => handleToggleStatus(record)}
                            >
                                {record.status === 'block' ? 'Mở' : 'Khóa'}
                            </Button>
                        </Tooltip>
                    )}
                />
            </Table>
        </div>
    );
}
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

import { useAppSelector, useAppDispatch } from "../../../hooks/CustomHook";
import {
  fetchBusCompanyThunk, 
  addBusCompanyThunk,     
  updateBusCompanyThunk,  
  deleteBusCompanyThunk,  
} from "../../../apis/busCompany.api"; 
import type { BusCompany } from "../../../interfaces/Bus"; 
import BusCompanyModal from "../../components/Modals/BusCompany/CompanyModal";

import home from "../../../assets/icons/home-icon.png";
import hide from "../../../assets/icons/icon_hide.png";
import logout from "../../../assets/icons/Icon-out.png";
import excel from "../../../assets/icons/excel-logo.png";


const { Column } = Table;

// Hàm format ngày tháng 
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


export default function BusCompanyManager() {
  const dispatch = useAppDispatch();
  const { busCompany, loading, error } = useAppSelector(
    (state) => state.busCompany 
  );

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingCompany, setEditingCompany] = useState<BusCompany | null>(null); 
  const [isEditingMode, setIsEditingMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortType, setSortType] = useState<string>("id_desc");

  // LOGIC LẤY DỮ LIỆU BAN ĐẦU
  useEffect(() => {
    dispatch(fetchBusCompanyThunk()); 
    if (error) message.error(error);
  }, [dispatch, error]);

  // --- HÀM TẠO ID CHUẨN ---
  const generateNewCompanyId = () => {
    const nxIds = busCompany
      .map(c => c.id)
      .filter(id => id.startsWith('NX')) 
      .map(id => parseInt(id.replace('NX', ''))) 
      .filter(num => !isNaN(num)); 

    const maxNum = nxIds.length > 0 ? Math.max(...nxIds) : 0;
    const newIdNum = maxNum + 1;
    const paddedNum = String(newIdNum).padStart(3, '0');
    
    return `NX${paddedNum}`;
  };


  // --- LOGIC LỌC, TÌM KIẾM, SẮP XẾP ---
  const filteredAndSortedCompanies = useMemo(() => {
    let result = busCompany.slice();

    // 1. Tìm kiếm (theo Tên Nhà xe hoặc Số ĐT/Mô tả)
    if (searchTerm) {
      result = result.filter(
        (c) =>
          c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          c.descriptions.toLowerCase().includes(searchTerm.toLowerCase()) ||
          c.phone.includes(searchTerm)
      );
    }


    // 2. Sắp xếp
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
      result.sort((a, b) => {
        const numA = parseInt(a.id.replace('NX', '')); 
        const numB = parseInt(b.id.replace('NX', '')); 
        return numB - numA;
      });
    }

    return result;
  }, [busCompany, searchTerm, sortType]); 


  // --- HÀM XỬ LÝ HÀNH ĐỘNG ---
  
  const handleSave = (companyData: BusCompany) => { 
    if (isEditingMode) { 
      dispatch(updateBusCompanyThunk(companyData)); 
      message.success("Đang cập nhật nhà xe...");
    } else {
      dispatch(addBusCompanyThunk(companyData));   
      message.success("Đang thêm nhà xe...");
    }
    setIsModalVisible(false);
    setEditingCompany(null);
  };

  const handleAdd = () => {
    const now = new Date().toISOString();
    const newId = generateNewCompanyId(); 
    
    setEditingCompany({ 
      id: newId, 
      name: '', image: '', descriptions: '', phone: '',
      license: '', 
      created_at: now, 
      updated_at: now,
    } as any); 
    
    setIsEditingMode(false); 
    setIsModalVisible(true);
  };

  const handleEdit = (company: BusCompany) => { 
    setEditingCompany(company);
    setIsEditingMode(true); 
    setIsModalVisible(true);
  };

  const handleDelete = (id: string) => {
    dispatch(deleteBusCompanyThunk(id)); 
    message.loading("Đang xóa nhà xe...", 0.5);
  };

  const handleExportExcel = () => {
    if (filteredAndSortedCompanies.length === 0) { 
      message.warning('Không có dữ liệu để xuất file.');
      return;
    }
    
    // Chuẩn bị dữ liệu để xuất file 
    const exportData = filteredAndSortedCompanies.map(c => ({
        ID: c.id,
        'Tên Nhà Xe': c.name,
        'Mô Tả': c.descriptions,
        'Số ĐT': c.phone,
        'Giấy phép': c.license, 
        'Ngày Tạo': formatDateTime(c.created_at),
        'Ngày Cập Nhật': formatDateTime(c.updated_at),
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    worksheet["!cols"] = Object.keys(exportData[0]).map(() => ({ wch: 25 }));
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Danh_sach_Nha_Xe");

    try {
        XLSX.writeFile(workbook, "Danh_sach_Nha_Xe_" + new Date().toISOString().slice(0, 10) + ".xlsx");
        message.success('Đã xuất file Excel thành công!');
    } catch (e) {
        message.error('Lỗi khi xuất file Excel.');
        console.error(e);
    }
  };


  return (
    <div>
      <div className="header-page flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <img src={home} alt="" />
          <img src={hide} className="rotate-90" alt="" />
          <p className="font-both">Quản lý nhà xe</p>
        </div>
        {/* Tên trang và đăng xuất */}
        <div className="flex justify-between pt-2">
          <div className="text-4xl">Danh sách nhà xe</div>
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
            Thêm Nhà Xe
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
              <option value="id_desc">ID Nhà Xe (Mới nhất)</option>
              <option value="date_desc">Ngày tạo (Mới nhất)</option>
               <option value="update_desc">Ngày cập nhật (Mới nhất)</option>
            </select>

            

            {/* Input Tìm kiếm */}
            <Input
              prefix={<SearchOutlined />}
              placeholder="Tìm kiếm theo Tên/Mô tả/SĐT..."
              style={{ width: 250 }}
              size="large"
              onChange={(e) => setSearchTerm(e.target.value)}
              allowClear
            />
          </div>
        </div>
      </div>

      {/* --- BẢNG NHÀ XE --- */}
      <Table<BusCompany>
        loading={loading}
        pagination={{ pageSize: 5 }}
        dataSource={filteredAndSortedCompanies} 
        rowKey="id"
        className="p-4"
      >
        <Column title="ID" dataIndex="id" key="id" width={80} />
        <Column title="Tên Nhà Xe" dataIndex="name" key="name" />
        <Column title="Mô Tả" dataIndex="descriptions" key="descriptions" />
        <Column title="Số ĐT" dataIndex="phone" key="phone" width={100} />
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
          render={(_, record: BusCompany) => (
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
      <BusCompanyModal // <-- Đã đổi tên Modal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onSave={handleSave}
        initialData={editingCompany} 
        isEditModeProp={isEditingMode}
      />
    </div>
  );
}
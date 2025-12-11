// import home from "../../../assets/icons/home-icon.png";
// import hide from "../../../assets/icons/icon_hide.png";
// import logout from "../../../assets/icons/Icon-out.png";
// import excel from "../../../assets/icons/excel-logo.png";
// import { Button, Input, Space, Table, Tag } from "antd";
// import type { Ticket } from "../../interfaces/Schedules";
// import * as XLSX from "xlsx";
// import {
//   DeleteOutlined,
//   EditOutlined,
//   SearchOutlined,
// } from "@ant-design/icons";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import type { AppDispatch, RootState } from "../../stores/store";
// import { featBooking, UpdateBooking } from "../../apis/booking.api";
// import ModalBooking from "../components/Modals/Orders/ModalBooking";

import React from 'react'

export default function index() {
  return (
    <div>index</div>
  )
}

// export default function UserManagers() {
//   const { Column } = Table;
//   const [searchText, setSearchText] = useState("");
//   const [sortValue, setSortValue] = useState("all");
//   const [seatFilter, setSeatFilter] = useState(""); // lọc theo loại ghế
//   const [statusFilter, setStatusFilter] = useState(""); // lọc theo trạng thái
//   const [selectBooking, setSelectBooking] = useState<Ticket | null>(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const dispatch = useDispatch<AppDispatch>();

//   useEffect(() => {
//     dispatch(featBooking());
//   }, [dispatch]);

//   const showModal = (ticket: Ticket) => {
//     setSelectBooking(ticket);
//     setIsModalOpen(true);
//   };

//   const handleEdit = (ticket: Ticket) => {
//     showModal(ticket);
//   };

//   const handleOk = (ticket: Ticket) => {
//     dispatch(UpdateBooking(ticket));
//     setIsModalOpen(false);
//   };

//   const handleCancel = () => {
//     setIsModalOpen(false);
//   };

//   const handleSort = (e) => {
//     setSortValue(e.target.value);
//   };
//   const handleSearch = (e) => {
//     setSearchText(e.target.value);
//   };

//   const bookings = useSelector((state: RootState) => state.tickets.tickets);

//   const filteredData = bookings
//     .filter((b) => {
//       if (seatFilter && b.seat_type !== seatFilter) return false;

//       if (statusFilter && b.status !== statusFilter) return false;

//       if (
//         searchText &&
//         !b.id.toLowerCase().includes(searchText.toLowerCase()) &&
//         !b.schedule_id.toLowerCase().includes(searchText.toLowerCase())
//       )
//         return false;
//       return true;
//     })
//     .sort((a, b) => {
//       if (sortValue === "price") return a.price - b.price;
//       if (sortValue === "time")
//         return a.departure_time.getTime() - b.departure_time.getTime();
//       return 0;
//     });

//   const ExportExcel = () => {
//     const sheetData = bookings.map((item) => ({
//       ...item,
//       departure_time: item.departure_time.toLocaleString(),
//       arrival_time: item.arrival_time.toLocaleString(),
//       created_at: item.created_at.toLocaleString(),
//       updated_at: item.updated_at.toLocaleString(),
//     }));

//     const worksheet = XLSX.utils.json_to_sheet(sheetData);

//     worksheet["!cols"] = Object.keys(sheetData[0]).map(() => ({ wch: 20 }));

//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Danh sách");

//     XLSX.writeFile(workbook, "danh_sach_don_ve.xlsx");
//   };

//   return (
//     <div>
//       <div className="header-page flex flex-col gap-3 ">
//         <div className="flex items-center gap-3">
//           <img src={home} alt="" />

//           <img src={hide} className="rotate-90" alt="" />

//           <p className="font-both">Danh sách đơn vé...</p>
//         </div>
//         {/* Tên trang và đăng xuất */}
//         <div className="flex justify-between pt-2">
//           <div className="text-4xl">Danh sách đơn vé </div>
//           {/* Đăng xuất */}
//           <div className="flex items-center gap-4 p-2 bg-white rounded-lg shadow-sm">
//             {/* Avatar */}
//             <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-white font-bold text-lg">
//               A
//             </div>

//             {/* Thông tin người dùng */}
//             <div className="flex flex-col">
//               <span className="font-semibold text-gray-800">Admin</span>
//               <div className="flex items-center gap-1 text-rose-600 cursor-pointer hover:underline">
//                 <span>Đăng xuất</span>
//                 <img className="w-8 h-8" src={logout} alt="Logout" />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* thêm,xuất excel, lọc, tìm kiếm, sắp xếp */}
//         <div className="flex gap-4 justify-between">
//           <Input
//             onChange={handleSearch}
//             prefix={<SearchOutlined />}
//             placeholder="Tìm kiếm..."
//             style={{ width: 250, padding: "8px 12px" }}
//           />
//           <div className="flex gap-4">
//             <div
//               onClick={ExportExcel}
//               className=" rounded-md flex gap-2 items-center border-2 border-gray-400 w-30 h-10 justify-center"
//             >
//               <img className="w-4 h-4" src={excel} alt="" />
//               <p>Xuất file</p>
//             </div>

//             <select
//               onClick={(e) => handleSort(e)}
//               className=" rounded-md flex gap-2 items-center border-2 border-gray-400 w-35 justify-center"
//               name=""
//               id=""
//             >
//               <option value="all"> Sắp xếp tất cả</option>
//               <option value="price">Sắp xếp giá</option>
//               <option value="time">Sắp xếp thời gian</option>
//             </select>

//             <select
//               className="border rounded px-2 py-1"
//               value={seatFilter}
//               onChange={(e) => setSeatFilter(e.target.value)}
//             >
//               <option value="">Tất cả loại ghế</option>
//               <option value="VIP">VIP</option>
//               <option value="Normal">Normal</option>
//             </select>

//             <select
//               className="border rounded px-2 py-1"
//               value={statusFilter}
//               onChange={(e) => setStatusFilter(e.target.value)}
//             >
//               <option value="">Tất cả trạng thái</option>
//               <option value="booked">Đã đặt</option>
//               <option value="cancelled">Hủy</option>
//             </select>
//           </div>
//         </div>

//         {/* bảng dữ liệu */}

//         <Table<Ticket> pagination={{ pageSize: 5 }} dataSource={filteredData}>
//           <Column
//             title="STT"
//             key="index"
//             render={(_, __, index) => index + 1}
//           />

//           <Column title="Mã vé" dataIndex="id" key="id" />
//           <Column
//             title="Mã lịch trình"
//             dataIndex="schedule_id"
//             key="schedule_id"
//           />
//           <Column title="Mã Ghế" dataIndex="seat_id" key="seat_id" />

//           <Column
//             title="Giờ đi"
//             dataIndex="departure_time"
//             key="departure_time"
//             render={(value: Date) => value.toLocaleString()}
//           />

//           <Column
//             title="Giờ đến"
//             dataIndex="arrival_time"
//             key="arrival_time"
//             render={(value: Date) => value.toLocaleString()}
//           />
//           <Column title="Loại ghế" dataIndex="seat_type" key="seat_type" />
//           <Column title="Giá" dataIndex="price" key="price" />

//           <Column
//             title="Trạng thái"
//             dataIndex="status"
//             key="status"
//             render={(status: string) => (
//               <Tag color={status === "booked" ? "green" : "volcano"}>
//                 {status.toUpperCase()}
//               </Tag>
//             )}
//           />
//           <Column
//             title="Ngày tạo"
//             dataIndex="created_at"
//             key="created_at"
//             render={(value: Date) => value.toLocaleString()}
//           />
//           <Column
//             title="Ngày cập nhật"
//             dataIndex="updated_at"
//             key="updated_at"
//             render={(value: Date) => value.toLocaleString()}
//           />
//           <Column
//             title="Hành động"
//             key="action"
//             render={(_, record: Ticket) => (
//               <Space>
//                 <Button
//                   style={{ fontSize: "20px" }}
//                   icon={<DeleteOutlined />}
//                   danger
//                   type="link"
//                 ></Button>
//                 <Button
//                   style={{ fontSize: "20px" }}
//                   icon={<EditOutlined />}
//                   onClick={() => handleEdit(record)}
//                   danger
//                   type="link"
//                 ></Button>
//               </Space>
//             )}
//           />
//         </Table>
//       </div>
//       <ModalBooking
//         open={isModalOpen}
//         onOk={handleOk}
//         onCancel={handleCancel}
//         initial={selectBooking ?? undefined}
//       />
//     </div>
//   );
// }

import home from "../../../assets/icons/home-icon.png";
import hide from "../../../assets/icons/icon_hide.png";
import logout from "../../../assets/icons/Icon-out.png";
import excel from "../../../assets/icons/excel-logo.png";
import { Input, Table } from "antd";

import * as XLSX from "xlsx";
import { SearchOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import type { CancellationPolicies } from "../../../interfaces/Schedules";
import type { AppDispatch, RootState } from "../../../stores/store";
import { featCancelTickets } from "../../../apis/cancelled_tickets.api";

export default function CancellationManagement() {
  const { Column } = Table;
  const [searchText, setSearchText] = useState("");
  const [sortValue, setSortValue] = useState("all");
  const [seatFilter, setSeatFilter] = useState(""); // lọc theo loại ghế
  const [statusFilter, setStatusFilter] = useState(""); // lọc theo trạng thái

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(featCancelTickets());
  }, [dispatch]);

  function formatISO(dateStr: string) {
    const d = new Date(dateStr);
    const pad = (n: number) => n.toString().padStart(2, "0");

    return `${pad(d.getHours())}:${pad(d.getMinutes())} - ${pad(
      d.getDate()
    )}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`;
  }
  function diffTime(start: string | Date, end: string | Date) {
    const d1 = new Date(start);
    const d2 = new Date(end);

    const diffMs = d2.getTime() - d1.getTime(); // chênh lệch ms

    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

    return { diffHours, diffMinutes };
  }

  const cancelTickets = useSelector(
    (state: RootState) => state.cancelTickets.cancelTickets
  );

  const filteredData = cancelTickets
    .filter((b) => {
      
      if (
        searchText &&
        !b.id.toLowerCase().includes(searchText.toLowerCase()) &&
        !b.route_id.toLowerCase().includes(searchText.toLowerCase())
      )
        return false;
      return true;
    })
  

  const ExportExcel = () => {
    const sheetData = cancelTickets.map((item, index) => ({
    STT: index + 1,
    Mã_hủy_vé: item.id,
    Tuyến_đường: item.route_id,
    Giờ_khởi_hành: item.created_at,
    Phần_trăm_hoàn :item.refund_percentage,
    Ngày_tạo : item.created_at
  }));

    const worksheet = XLSX.utils.json_to_sheet(sheetData);

    worksheet["!cols"] = Object.keys(sheetData[0]).map(() => ({ wch: 20 }));

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Danh sách");

    XLSX.writeFile(workbook, "danh_sach_hủy_vé.xlsx");
  };
  console.log(cancelTickets);
  

  return (
    <div>
      <div className="header-page flex flex-col gap-3 ">
        <div className="flex items-center gap-3">
          <img src={home} alt="" />

          <img src={hide} className="rotate-90" alt="" />

          <p className="font-both">Danh sách hủy vé</p>
        </div>
        {/* Tên trang và đăng xuất */}
        <div className="flex justify-between pt-2">
          <div className="text-4xl">Danh sách hủy vé </div>
          {/* Đăng xuất */}
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

        {/* thêm,xuất excel, lọc, tìm kiếm, sắp xếp */}
        <div className="flex gap-4 justify-between">
          <Input
            onChange={(e) =>
              setTimeout(() => {
                setSearchText(e.target.value);
              }, 500)
            }
            prefix={<SearchOutlined />}
            placeholder="Tìm kiếm..."
            style={{ width: 250, padding: "8px 12px" }}
          />
          <div className="flex gap-4">
            <div
              onClick={ExportExcel}
              className=" rounded-md flex gap-2 items-center border-2 border-gray-400 w-30 h-10 justify-center"
            >
              <img className="w-4 h-4" src={excel} alt="" />
              <p>Xuất file</p>
            </div>
          </div>
        </div>

        {/* bảng dữ liệu */}

        <Table<CancellationPolicies>
          pagination={{ pageSize: 5 }}
          dataSource={filteredData}
        >
          <Column
            title="STT"
            key="index"
            render={(_, __, index) => index + 1}
          />

          <Column
            title="Mã hủy vé"
            dataIndex="cancellation_policies_id"
            key="cancellation_policies_id"
          />
          <Column title="Mô tả" dataIndex="descriptions" key="descriptions" />
          <Column title="Mã tuyến đường" dataIndex="route_id" key="route_id" />

          <Column
            title="Giờ trước khi khởi hành"
            dataIndex="cancellation_time_limit"
            key="cancellation_time_limit"
            render={(value) => formatISO(value)}
          />

          <Column
            title="Phần trăm hoàn tiền"
            dataIndex="refunc_percentage"
            key="refunc_percentage"
             render={(value) => `${value} %`}
          />

          <Column
            title="Ngày tạo"
            dataIndex="created_at"
            key="created_at"
            render={(value) => formatISO(value)}
          />
        </Table>
      </div>
    </div>
  );
}

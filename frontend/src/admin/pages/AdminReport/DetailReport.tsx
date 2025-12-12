import home from "../../../assets/icons/home-icon.png";
import hide from "../../../assets/icons/icon_hide.png";
import logout from "../../../assets/icons/Icon-out.png";
import excel from "../../../assets/icons/excel-logo.png";
import { Button, Input, Table } from "antd";
import * as XLSX from "xlsx";
import { SearchOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../stores/store";
import type { Banner } from "../../../interfaces/Banner";
import { useParams } from "react-router-dom";
import { featBusCompany } from "../../../apis/bus_companies.api";
import { featBooking } from "../../../apis/booking.api";
import type { BusCompany } from "../../../interfaces/Bus";
import { featSchedule } from "../../../apis/schedule.api";

export default function DetailReport() {
  const { Column } = Table;
  const [searchText, setSearchText] = useState("");
  const [sortValue, setSortValue] = useState("all");
  const [seatFilter, setSeatFilter] = useState(""); // lọc theo loại ghế
  const [statusFilter, setStatusFilter] = useState(""); // lọc theo trạng thái
  const [isOpen,setIsOpen] = useState(false);
  const [selectBanner, setSelectBanner] = useState<Banner | null>(null)


  const dispatch = useDispatch<AppDispatch>();

  const { company_id } = useParams<string>();

  console.log(company_id);
  
  
  useEffect(() => {
    dispatch(featBusCompany());
    dispatch(featBooking());
    dispatch(featSchedule());
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



  const companys = useSelector(
    (state: RootState) => state.busCompanys.busCompany
  );

    const bookings = useSelector(
    (state: RootState) => state.tickets.tickets
  );
    const schedules = useSelector(
    (state: RootState) => state.schedules.schedules
  );

  const groundCompany = companys.filter((element) => element.bus_companies_id === company_id)

  const tripCompany = groundCompany.filter((element) => {
    const tripBus = bookings.find((ticket) => ticket)
  })
  


  // const filteredData = cancelTickets
  //   .filter((b) => {
  //     if (seatFilter && b.seat_type !== seatFilter) return false;

  //     if (statusFilter && b.status !== statusFilter) return false;

  //     if (
  //       searchText &&
  //       !b.id.toLowerCase().includes(searchText.toLowerCase()) &&
  //       !b.schedule_id.toLowerCase().includes(searchText.toLowerCase())
  //     )
  //       return false;
  //     return true;
  //   })
  //   .sort((a, b) => {
  //     if (sortValue === "price") return a.price - b.price;
  //     if (sortValue === "time")
  //       return (
  //         new Date(a.departure_time).getTime() -
  //         new Date(b.departure_time).getTime()
  //       );
  //     return 0;
  //   });

  // const ExportExcel = () => {
  //   const sheetData = cancelTickets.map((item) => ({
  //     ...item,
  //     departure_time: item.departure_time.toLocaleString(),
  //     arrival_time: item.arrival_time.toLocaleString(),
  //     created_at: item.created_at.toLocaleString(),
  //     updated_at: item.updated_at.toLocaleString(),
  //   }));

  //   const worksheet = XLSX.utils.json_to_sheet(sheetData);

  //   worksheet["!cols"] = Object.keys(sheetData[0]).map(() => ({ wch: 20 }));

  //   const workbook = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(workbook, worksheet, "Danh sách");

  //   XLSX.writeFile(workbook, "danh_sach_don_ve.xlsx");
  // };


  return (
    <div>
      <div className="header-page flex flex-col gap-3 ">
        <div className="flex items-center gap-3">
          <img src={home} alt="" />

          <img src={hide} className="rotate-90" alt="" />

          <p className="font-both">Danh sách Báo cáo & Thống kê...</p>
           <img src={hide} className="rotate-90" alt="" />

          <p className="font-both">Chi tiết Báo cáo & Thống kê</p>
        </div>
        {/* Tên trang và đăng xuất */}
        <div className="flex justify-between pt-2">
          <div className="text-4xl">{groundCompany[0].company_name} </div>
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
              // onClick={ExportExcel}
              className=" rounded-md flex gap-2 items-center border-2 border-gray-400 w-30 h-10 justify-center"
            >
              <img className="w-4 h-4" src={excel} alt="" />
              <p>Xuất file</p>
            </div>

            <select
              value={sortValue}
              onChange={(e) => setSortValue(e.target.value)}
              className=" rounded-md flex gap-2 items-center border-2 border-gray-400 w-35 justify-center"
              name=""
              id=""
            >
              <option value="all"> Sắp xếp tất cả</option>
              <option value="price">Sắp xếp giá</option>
              <option value="time">Sắp xếp thời gian</option>
            </select>

            <select
              className="border rounded px-2 py-1"
              value={seatFilter}
              onChange={(e) => setSeatFilter(e.target.value)}
            >
              <option value="">Tất cả loại ghế</option>
              <option value="LUXURY">LUXURY</option>
              <option value="VIP">VIP</option>
              <option value="STANDARD">STANDARD</option>
            </select>

           
          </div>
        </div>

        {/* bảng dữ liệu */}

        <Table<BusCompany>
          pagination={{ pageSize: 5 }}
          dataSource={companys}
          rowKey="banner_id"
        >

             <Column
            title="STT"
            key="index"
            render={(_, __, index) => index + 1}
          />

          <Column title="Mã xe" dataIndex="banner_id" key="banner_id" />

          <Column
            title="Tuyến"
            dataIndex="banner_url "
            key="banner_url "
          />
          <Column title="Doanh thu" dataIndex="descriptions" key="descriptions" />
          <Column title="Đánh giá" dataIndex="descriptions" key="descriptions" />
          <Column title="Tỉ lệ hủy" dataIndex="descriptions" key="descriptions" />
        </Table>
      </div>
     
    </div>
  );
}

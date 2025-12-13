import home from "../../../assets/icons/home-icon.png";
import hide from "../../../assets/icons/icon_hide.png";
import logout from "../../../assets/icons/Icon-out.png";
import excel from "../../../assets/icons/excel-logo.png";
import { Button, Input, Space, Table } from "antd";
import * as XLSX from "xlsx";
import { SearchOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import type { AppDispatch, RootState } from "../../../stores/store";
import ModalBanner from "../../components/Modals/Banners/ModalBanner";
import type { Banner } from "../../../interfaces/Banner";
import { addBanner, deleteBanner, featBanner } from "../../../apis/banner.api";

export default function BannerManagementScreen() {
  const { Column } = Table;
  const [searchText, setSearchText] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectBanner, setSelectBanner] = useState<Banner | null>(null);
  const [modal, setModal] = useState<"add" | "edit">("add");

  function handleOK(banner: Banner) {
    if (modal === "add") {
      dispatch(addBanner(banner));
    } else {
      dispatch(addBanner(banner));
    }
    setIsOpen(false);
  }
  function handleCancel() {
    setIsOpen(false);
  }

  function handleOpenAdd() {
    setModal("add");
    setIsOpen(true);
  }

  function handleEdit(banner : Banner) {
    setModal("edit");
    setSelectBanner(banner);
    setIsOpen(true);
  }

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(featBanner());
  }, [dispatch]);

  const banners = useSelector((state: RootState) => state.banners.banners);

  const handleDelete = (banner: Banner) => {
    dispatch(deleteBanner(String(banner.id)));
  };

  const filteredData = banners.filter((b) => {
    if (
      searchText &&
      !b.position.toLowerCase().includes(searchText.toLowerCase())
    )
      return false;
    return true;
  });

  const ExportExcel = () => {
    const sheetData = banners.map((item, index) => ({
      STT: index + 1,
      Mã_Banner: item.banner_id,
      Vị_Trí: item.position,
      Ảnh: item.banner_url,
    }));

    const worksheet = XLSX.utils.json_to_sheet(sheetData);

    worksheet["!cols"] = Object.keys(sheetData[0]).map(() => ({ wch: 20 }));

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Danh sách");

    XLSX.writeFile(workbook, "danh_sach_banner.xlsx");
  };

  return (
    <div>
      <div className="header-page flex flex-col gap-3 ">
        <div className="flex items-center gap-3">
          <img src={home} alt="" />

          <img src={hide} className="rotate-90" alt="" />

          <p className="font-both">Danh sách banner...</p>
        </div>
        {/* Tên trang và đăng xuất */}
        <div className="flex justify-between pt-2">
          <div className="text-4xl">Danh sách banner </div>
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
          <Button type="primary" onClick={handleOpenAdd}>
            Thêm Banner
          </Button>
          <div className="flex gap-4">
            <div
              onClick={ExportExcel}
              className=" rounded-md flex gap-2 items-center border-2 border-gray-400 w-30 h-10 justify-center"
            >
              <img className="w-4 h-4" src={excel} alt="" />
              <p>Xuất file</p>
            </div>

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
          </div>
        </div>

        {/* bảng dữ liệu */}

        <Table<Banner> pagination={{ pageSize: 5 }} dataSource={filteredData}>
          <Column
            title="STT"
            key="index"
            render={(_, __, index) => index + 1}
          />
          <Column title="Mã Banner" dataIndex="banner_id" key="banner_id" />

          <Column
            title="Ảnh minh họa"
            dataIndex="banner_url"
            key="banner_url"
            render={(url: string) => (
              <img
                src={url}
                alt="banner"
                style={{
                  width: 50,
                  height: 50,
                  objectFit: "cover",
                  borderRadius: 8,
                }}
              />
            )}
          />

          <Column title="Vị trí" dataIndex="position" key="position" />
          <Column
            title="Hành động"
            key="action"
            render={(_, record: Banner) => (
              <Space className="">
                <div className="flex gap-4">
                  <EditOutlined
                  style={{ color: "#1677ff", fontSize: 15, cursor: "pointer" }}
                  onClick={() => handleEdit(record)}
                />

                <DeleteOutlined
                  style={{ color: "red", fontSize: 15, cursor: "pointer" }}
                  onClick={() => handleDelete(record)}
                />
                </div>
              </Space>
            )}
          />
        </Table>
      </div>
      <>
        <ModalBanner
          modal={modal}
          open={isOpen}
          onOk={handleOK}
          onCancel={handleCancel}
          initial={selectBanner ?? undefined}
        ></ModalBanner>
      </>
    </div>
  );
}

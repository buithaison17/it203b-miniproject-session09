import React from 'react'
import home from "../../assets/icons/home-icon.png";
import hide from "../../assets/icons/icon_hide.png";
import logout from "../../assets/icons/Icon-out.png";
import { Button } from 'antd';
export default function UserManagers() {
  return (
    <div>
      <div className="header-page">
        <div className='flex items-center gap-3'>
          <img src={home} alt="" />
          
          <img src={hide} className='rotate-90' alt="" />

          <p>Danh sách đơn vé</p>
        </div>
        {/* Tên trang và đăng xuất */}
        <div className='flex justify-between'>
          <div>Danh sách tài khoản </div>
          <div>
            <p>Admin</p>
            <div className='flex items-center'>
              <p>Đăng xuất</p>
              <img src={logout} alt="" />
            </div>
          </div>
        </div>

          {/* thêm,xuất excel, lọc, tìm kiếm, sắp xếp */}
            <Button>Thêm người dùng</Button>
            

      </div>
    </div>
  )
}

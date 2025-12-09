import React from 'react'
import { Outlet } from "react-router-dom";
import NavLink from './NavLinks'

export default function AdminManager() {
  return (
    <div className="flex flex-row">
      <NavLink></NavLink>
       <div className="content" style={{ flex: 1, padding: 20 }}>
        <Outlet />  
      </div>
    </div>
  )
}

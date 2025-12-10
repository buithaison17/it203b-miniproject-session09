import { Modal } from "antd";
import React from "react";
import type { Ticket } from "../../../../interfaces/Schedules";

interface ModalBookingProps {
  open: boolean;
  onOk: (ticket: Ticket) => void;
  onCancel: () => void;
  initial?: Partial<Ticket>;
}

export default function ModalBooking(isModalOpen, handleOk) {
  return (
    <Modal
     title="Cập nhật vé xe"
     open={isModalOpen} 
     onOk={handleOk}
     ></Modal>     
  );
}

import { Modal } from "antd";
import React from "react";
import type { Ticket } from "../../../../interfaces/Schedules";

interface ModalBookingProps {
  open: boolean;
  onOk: (ticket?: Ticket) => void;
  onCancel: () => void;
  initial?: Partial<Ticket>;
}

export default function ModalBooking({
  open,
  onOk,
  onCancel,
  initial,
}: ModalBookingProps) {
  return (
    <Modal
      title="Cập nhật vé xe"
      open={open}
      onOk={() => onOk(initial as Ticket)}
      onCancel={onCancel}
    >
      {/* Bạn đặt Form hoặc nội dung update vé ở đây */}
      <p>ID Vé: {initial?.id}</p>
    </Modal>
  );
}

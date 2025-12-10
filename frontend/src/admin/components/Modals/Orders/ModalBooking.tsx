import { Form, Input, Modal, Select } from "antd";
import type { Ticket } from "../../../../interfaces/Schedules";
import { useEffect } from "react";
import { featBooking } from "../../../../apis/booking.api";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../../../stores/store";

const { Option } = Select;

interface ModalBookingProps {
  open: boolean;
  onOk: (ticket: Ticket) => void;
  onCancel: () => void;
  initial?: Partial<Ticket>;
}

export default function ModalBooking({
  open,
  onOk,
  onCancel,
  initial = {},
}: ModalBookingProps) {
  const [form] = Form.useForm();
  const dispatch = useDispatch<AppDispatch>();

      useEffect(() => {
      dispatch(featBooking());
    }, [dispatch]);

  return (
    <Modal
      title="Cập nhật vé xe"
      open={open}
      onOk={() => form.submit()}
      onCancel={onCancel}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={initial}
        onFinish={(values) =>
          onOk({
            ...(initial as Ticket), // giữ lại các field cũ
            ...values,
            updated_at: new Date(),
          })
        }
      >
        <Form.Item
          name="seat_id"
          label="Mã Ghế"
          rules={[{ required: true, message: "Vui lòng nhập ghế!" }]}
        >
          <Input placeholder="S01" />
        </Form.Item>

        <Form.Item
          name="seat_type"
          label="Loại Ghế"
          rules={[{ required: true, message: "Vui lòng nhập loại ghế!" }]}
        >
          <Select placeholder="Chọn loại ghế">
            <Option value="LUXURY">LUXURY</Option>
            <Option value="VIP">VIP</Option>
            <Option value="STANDARD">STANDARD</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="departure_time"
          label="Giờ đi"
          rules={[{ required: true, message: "Vui lòng nhập giờ đi!" }]}
        >
          <Input placeholder="2025-12-10 08:00" />
        </Form.Item>

        <Form.Item
          name="arrival_time"
          label="Giờ đến"
          rules={[{ required: true, message: "Vui lòng nhập giờ đến!" }]}
        >
          <Input placeholder="2025-12-10 12:00" />
        </Form.Item>

        <Form.Item
          name="price"
          label="Giá vé"
          rules={[{ required: true, message: "Vui lòng nhập giá!" }]}
        >
          <Input placeholder="350000" />
        </Form.Item>

        <Form.Item
          name="status"
          label="Trạng thái"
          rules={[{ required: true, message: "Vui lòng chọn trạng thái!" }]}
        >
          <Select placeholder="Chọn trạng thái">
            <Option value="booked">Booked</Option>
            <Option value="cancelled">Cancelled</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
}



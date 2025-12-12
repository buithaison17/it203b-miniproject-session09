import { Form, Input, Modal, Select } from "antd";
import type { Ticket } from "../../../../interfaces/Schedules";
import { useEffect } from "react";
import { featBooking } from "../../../../apis/booking.api";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../../../stores/store";

import type { PaymentProvider } from "../../../../interfaces/Payment";

const { Option } = Select;

interface ModalBookingProps {
  open: boolean;
  onOk: (paymentProvider : PaymentProvider ) => void;
  onCancel: () => void;
  initial?: Partial<PaymentProvider>;
}

export default function ModalBanner({
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
      title="Thêm/Cập nhật dơn vị thanh toán"
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
          name="provider_name "
          label="Tên nhà cung cấp"
          rules={[{ required: true, message: "Vui lòng nhập ghế!" }]}
        >
          <Input placeholder="Tên ngân hàng" />
        </Form.Item>

        <Form.Item
          name="seat_type"
          label="Loại hình"
          rules={[{ required: true, message: "Vui lòng nhập loại ghế!" }]}
        >
          <Select placeholder="Chọn loại hình thanh toán">
            <Option value="CARD">CARD</Option>
            <Option value="'E-WALLET">'E-WALLET</Option>
            <Option value="BANK_TRANSFER">BANK_TRANSFER</Option>
            <Option value="QR_CODE">QR_CODE</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="api_endpoint "
          label="API kết nối"
          rules={[{ required: true, message: "Vui lòng nhập giờ đi!" }]}
        >
          <Input placeholder="2025-12-10 08:00" />
        </Form.Item>
      </Form>
    </Modal>
  );
}

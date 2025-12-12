import React, { useEffect, useState } from "react";
import { 
    Modal, 
    Form, 
    Input, 
    Button, 
    Row, 
    Col, 
    message,
    Select, // Dùng cho seat_type và status
    InputNumber // Dùng cho price
} from "antd";
import type { Seat } from "../../../../interfaces/Seat"; // <-- Interface Seat

const { Option } = Select;

// Kiểu dữ liệu state cho form (Không cần File/Image trong Modal này)
interface SeatFormData {
  bus_id: string;
  seat_number: string;
  seat_type: string;
  price: number;
  status: "active" | "inactive" | "booked";
}

interface SeatFormModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (data: Seat) => void; // <-- Dùng Seat
  initialData?: Seat | null;     // <-- Dùng Seat
  isEditModeProp: boolean;
}


const SeatModal: React.FC<SeatFormModalProps> = ({
  visible,
  onClose,
  onSave,
  initialData,
  isEditModeProp,
}) => {
  const [form] = Form.useForm<SeatFormData>();
  const [loading, setLoading] = useState(false);
  const now = new Date();

  // Xử lý chế độ Thêm/Sửa khi Modal mở
  useEffect(() => {
    if (!visible) {
        form.resetFields();
        return;
    }

    if (initialData) {
      // CHẾ ĐỘ SỬA: Điền dữ liệu
      form.setFieldsValue({
        bus_id: initialData.bus_id,
        seat_number: initialData.seat_number,
        seat_type: initialData.seat_type,
        price: initialData.price,
        status: initialData.status,
      });
      
    } else {
      // CHẾ ĐỘ THÊM: Reset và đặt giá trị mặc định cho Status
      form.resetFields();
      form.setFieldsValue({ status: 'active', price: 0 }); 
    }
  }, [visible, initialData, form]);


  // Hàm XỬ LÝ LƯU
  const handleFormSubmit = async (values: SeatFormData) => {
    const { bus_id, seat_number, seat_type, price, status } = values;

    setLoading(true);

    try {
      // 1. Chuẩn bị Dữ liệu cuối cùng
      const finalData: Seat = {
        // Nếu là Sửa, dùng ID cũ; nếu là Thêm, dùng ID đã tạo sẵn (hoặc tạm thời Date.now)
        id: initialData?.id || Date.now().toString(), 
        bus_id,
        seat_number,
        seat_type,
        price,
        status,
        
        // Xử lý Ngày tháng
        created_at: initialData?.created_at || now.toISOString(),
        updated_at: now.toISOString(),
      };

      // 2. Gọi hàm lưu (API/Redux)
      onSave(finalData);

      message.success(
        isEditModeProp ? "Cập nhật ghế thành công" : "Thêm ghế mới thành công"
      );
      onClose();
    } catch (err: any) {
      message.error(err.message || "Lỗi khi lưu dữ liệu.");
    } finally {
      setLoading(false);
    }
  };

  const isEditMode = isEditModeProp;

  return (
    <Modal
      title={isEditMode ? "✍️ Sửa Thông Tin Ghế" : "➕ Thêm Ghế Mới"}
      open={visible}
      onCancel={onClose}
      footer={null}
      width={600}
      destroyOnHidden
    >
      <Form form={form} layout="vertical" onFinish={handleFormSubmit} >
        
        <Row gutter={16}>
          {/* ID Xe */}
          <Col span={12}>
            <Form.Item name="bus_id" label="ID Xe" rules={[{ required: true, message: "Vui lòng nhập ID Xe!" }]}>
              <Input placeholder="Ví dụ: X001" disabled={loading} />
            </Form.Item>
          </Col>

          {/* Loại Ghế */}
          <Col span={12}>
            <Form.Item name="seat_type" label="Loại Ghế" rules={[{ required: true, message: "Vui lòng chọn loại ghế!" }]}>
              <Select placeholder="Chọn loại ghế" disabled={loading}>
                <Option value="Thường">Thường</Option>
                <Option value="VIP">VIP</Option>
                <Option value="Đơn">Đơn</Option>
              </Select>
            </Form.Item>
          </Col>

          
        </Row>

        <Row gutter={16}>
          {/* Mã Ghế */}
          <Col span={12}>
            <Form.Item name="seat_number" label="Mã Ghế" rules={[{ required: true, message: "Vui lòng nhập Mã Ghế!" }]}>
              <Input placeholder="Ví dụ: A01, B10" disabled={loading} />
            </Form.Item>
          </Col>

          {/* Giá */}
          <Col span={12}>
            <Form.Item 
                name="price" 
                label="Giá vé cơ bản (VNĐ)" 
                rules={[{ required: true, message: "Vui lòng nhập giá!" }]}
            >
              <InputNumber 
                placeholder="Ví dụ: 300000" 
                disabled={loading}
                min={0}
                formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} // Định dạng hàng nghìn
                parser={value => value ? value.replace(/\$\s?|(,*)/g, '') : 0} 
                style={{ width: '100%' }}
              />
            </Form.Item>
          </Col>
        </Row>
        
        {/* Trạng thái và các trường phụ khác */}
        <Row>
          <Col span={12}>
            <Form.Item name="status" label="Trạng Thái" rules={[{ required: true, message: "Vui lòng chọn trạng thái!" }]}>
              <Select placeholder="Chọn trạng thái" disabled={loading}>
                <Option value="active">Active (Trống)</Option>
                <Option value="booked">Booked (Đã đặt)</Option>
                <Option value="inactive">Inactive (Không dùng)</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        

        {/* Footer (Nút Lưu) */}
        <Form.Item className="mt-8">
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            className="w-full"
            size="large"
          >
            {isEditMode ? "Lưu Thay Đổi" : "Thêm Mới"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default SeatModal;
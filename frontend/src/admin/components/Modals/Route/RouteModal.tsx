import React, { useEffect, useState } from "react";
import { 
    Modal, 
    Form, 
    Input, 
    Button, 
    Row, 
    Col, 
    message,
    InputNumber // Dùng cho Price, Duration, Distance
} from "antd";
import type { Route } from "../../../../interfaces/Route"; // <-- Interface Route

// Định nghĩa form fields
interface RouteFormData {
  departure_station_id: string;
  arrival_station_id: string;
  price: number;
  duration: number; // minutes
  distance: number; // km
}

interface RouteFormModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (data: Route) => void;
  initialData?: Route | null;
  isEditModeProp: boolean;
}


const RouteModal: React.FC<RouteFormModalProps> = ({
  visible,
  onClose,
  onSave,
  initialData,
  isEditModeProp,
}) => {
  const [form] = Form.useForm<RouteFormData>();
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
        departure_station_id: initialData.departure_station_id,
        arrival_station_id: initialData.arrival_station_id,
        price: initialData.price,
        duration: initialData.duration,
        distance: initialData.distance,
      });
      
    } else {
      // CHẾ ĐỘ THÊM: Reset và đặt giá trị mặc định số
      form.resetFields();
      form.setFieldsValue({ price: 0, duration: 0, distance: 0 }); 
    }
  }, [visible, initialData, form]);


  // Hàm XỬ LÝ LƯU
  const handleFormSubmit = async (values: RouteFormData) => {
    const { departure_station_id, arrival_station_id, price, duration, distance } = values;

    setLoading(true);

    try {
      // 1. Chuẩn bị Dữ liệu cuối cùng
      const finalData: Route = {
        routes_id: initialData?.routes_id || Date.now().toString(), 
        departure_station_id: departure_station_id.trim(),
        arrival_station_id: arrival_station_id.trim(),
        price,
        duration,
        distance,
        
        // Xử lý Ngày tháng
        created_at: initialData?.created_at || now.toISOString(),
        updated_at: now.toISOString(),
      };

      // 2. Gọi hàm lưu (API/Redux)
      onSave(finalData);

      message.success(
        isEditModeProp ? "Cập nhật tuyến đường thành công" : "Thêm tuyến đường mới thành công"
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
      title={isEditMode ? "✍️ Sửa Tuyến Đường" : "➕ Thêm Tuyến Đường"}
      open={visible}
      onCancel={onClose}
      footer={null}
      width={700}
      destroyOnHidden
    >
      <Form form={form} layout="vertical" onFinish={handleFormSubmit} >
        
        <Row gutter={16}>
          {/* Mã Bến khởi hành */}
          <Col span={12}>
            <Form.Item name="departure_station_id" label="Mã Bến Khởi Hành" rules={[{ required: true, message: "Vui lòng nhập mã bến khởi hành!" }]}>
              <Input placeholder="Ví dụ: BX001" disabled={loading} />
            </Form.Item>
          </Col>

          {/* Mã Bến đến */}
          <Col span={12}>
            <Form.Item name="arrival_station_id" label="Mã Bến Đến" rules={[{ required: true, message: "Vui lòng nhập mã bến đến!" }]}>
              <Input placeholder="Ví dụ: BX003" disabled={loading} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          {/* Giá tiền */}
          <Col span={8}>
            <Form.Item 
                name="price" 
                label="Giá Tiền (VNĐ)" 
                rules={[{ required: true, message: "Vui lòng nhập giá!" }]}
            >
              <InputNumber 
                placeholder="300000" 
                disabled={loading}
                min={0}
                formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} 
                parser={value => value ? value.replace(/\$\s?|(,*)/g, '') : 0} 
                style={{ width: '100%' }}
              />
            </Form.Item>
          </Col>

          {/* Thời gian hoàn thành (phút) */}
          <Col span={8}>
            <Form.Item 
                name="duration" 
                label="Thời gian (phút)" 
                rules={[{ required: true, message: "Vui lòng nhập thời gian!" }]}
            >
              <InputNumber 
                placeholder="240 (phút)" 
                disabled={loading}
                min={0}
                style={{ width: '100%' }}
              />
            </Form.Item>
          </Col>
          
          {/* Khoảng cách (km) */}
          <Col span={8}>
            <Form.Item 
                name="distance" 
                label="Khoảng cách (km)" 
                rules={[{ required: true, message: "Vui lòng nhập khoảng cách!" }]}
            >
              <InputNumber 
                placeholder="300 (km)" 
                disabled={loading}
                min={0}
                style={{ width: '100%' }}
              />
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

export default RouteModal;
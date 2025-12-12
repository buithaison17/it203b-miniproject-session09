import React, { useEffect, useState } from "react";
import { 
    Modal, 
    Form, 
    Input, 
    Button, 
    Row, 
    Col, 
    message,
    InputNumber,
    TimePicker, // Dùng cho thời gian (Ant Design TimePicker)
    Select,
} from "antd";
import type { Schedules } from "../../../../interfaces/Schedules"; 
import moment, { Moment } from "moment"; // Cần moment để xử lý TimePicker/Date

const { Option } = Select;

// Định nghĩa form fields
interface ScheduleFormData {
  route_id: string;
  bus_id: string;
  // TimePicker sẽ trả về Moment object
  departure_time: Moment; 
  arrival_time: Moment;
  available_seat: number;
  total_seats: number;
  status: "active" | "inactive";
}

interface ScheduleFormModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (data: Schedules) => void;
  initialData?: Schedules | null;
  isEditModeProp: boolean;
}


const ScheduleModal: React.FC<ScheduleFormModalProps> = ({
  visible,
  onClose,
  onSave,
  initialData,
  isEditModeProp,
}) => {
  const [form] = Form.useForm<ScheduleFormData>();
  const [loading, setLoading] = useState(false);
  
  // Lấy thời gian hiện tại để dùng cho created_at/updated_at
  const now = new Date(); 

  // Xử lý chế độ Thêm/Sửa khi Modal mở
  useEffect(() => {
    if (!visible) {
        // Đảm bảo reset form khi đóng Modal
        form.resetFields(); 
        return;
    }

    if (initialData) {
      // CHẾ ĐỘ SỬA: Điền dữ liệu
      form.setFieldsValue({
        route_id: initialData.route_id,
        bus_id: initialData.bus_id,
        available_seat: initialData.available_seat,
        total_seats: initialData.total_seats,
        status: initialData.status,
        
        // Chuyển đổi Date/string thành Moment object cho TimePicker
        // Lưu ý: TimePicker chỉ quan tâm đến giờ/phút, nhưng moment(date) giữ cả ngày
        departure_time: moment(initialData.departure_time),
        arrival_time: moment(initialData.arrival_time),
      });
      
    } else {
      // CHẾ ĐỘ THÊM: Reset và đặt giá trị mặc định
      form.resetFields();
      form.setFieldsValue({ 
          available_seat: 0, 
          total_seats: 0, 
          status: 'active',
          departure_time: moment().add(1, 'hour'), 
          arrival_time: moment().add(5, 'hours'), 
      }); 
    }
  }, [visible, initialData, form]);


  // Hàm XỬ LÝ LƯU
  const handleFormSubmit = async (values: ScheduleFormData) => {
    const { route_id, bus_id, departure_time, arrival_time, available_seat, total_seats, status } = values;

    setLoading(true);

    try {
      // 1. Chuyển đổi Moment object thành chuỗi ISO string (Date objects)
      // Lưu ý: Dữ liệu này cần được API backend xử lý để gán đúng ngày/tháng/năm
      const departureISO = departure_time.toISOString();
      const arrivalISO = arrival_time.toISOString();
      
      // 2. Chuẩn bị Dữ liệu cuối cùng
      const finalData: Schedules = {
        id: initialData?.id || Date.now().toString(), 
        route_id: route_id.trim(),
        bus_id: bus_id.trim(),
        departure_time: departureISO as any, 
        arrival_time: arrivalISO as any,     
        available_seat,
        total_seats,
        status,
        
        // Xử lý Ngày tháng
        created_at: initialData?.created_at || now.toISOString(),
        updated_at: now.toISOString(),
      };

      // 3. Gọi hàm lưu (API/Redux)
      onSave(finalData);

      message.success(
        isEditModeProp ? "Cập nhật lịch trình thành công" : "Thêm lịch trình mới thành công"
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
      title={isEditMode ? "✍️ Sửa Lịch Trình" : "➕ Thêm Lịch Trình Mới"}
      open={visible}
      onCancel={onClose}
      footer={null}
      width={700}
      destroyOnHidden
    >
      <Form form={form} layout="vertical" onFinish={handleFormSubmit} >
        
        <Row gutter={16}>
          {/* Mã Tuyến đường */}
          <Col span={12}>
            <Form.Item name="route_id" label="Mã Tuyến Đường" rules={[{ required: true, message: "Vui lòng nhập mã tuyến!" }]}>
              <Input placeholder="Ví dụ: RT001" disabled={loading} />
            </Form.Item>
          </Col>

          {/* Mã Xe */}
          <Col span={12}>
            <Form.Item name="bus_id" label="Mã Xe" rules={[{ required: true, message: "Vui lòng nhập mã xe!" }]}>
              <Input placeholder="Ví dụ: X001" disabled={loading} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          {/* Thời gian khởi hành */}
          <Col span={12}>
            <Form.Item name="departure_time" label="Thời gian Khởi hành" rules={[{ required: true, message: "Vui lòng chọn giờ khởi hành!" }]}>
                {/* TimePicker chỉ chọn giờ và phút, ngày sẽ mặc định là ngày hiện tại khi lưu */}
                <TimePicker use12Hours format="HH:mm" style={{ width: '100%' }} disabled={loading} />
            </Form.Item>
          </Col>

          {/* Thời gian đến */}
          <Col span={12}>
            <Form.Item name="arrival_time" label="Thời gian Đến nơi" rules={[{ required: true, message: "Vui lòng chọn giờ đến!" }]}>
              <TimePicker use12Hours format="HH:mm" style={{ width: '100%' }} disabled={loading} />
            </Form.Item>
          </Col>
        </Row>
        
        <Row gutter={16}>
            {/* Tổng số ghế */}
            <Col span={8}>
                <Form.Item name="total_seats" label="Tổng số ghế" rules={[{ required: true, message: "Vui lòng nhập tổng số ghế!" }]}>
                    <InputNumber min={1} placeholder="Ví dụ: 40" style={{ width: '100%' }} disabled={loading} />
                </Form.Item>
            </Col>

            {/* Số ghế có sẵn */}
            <Col span={8}>
                <Form.Item name="available_seat" label="Số ghế có sẵn" rules={[{ required: true, message: "Vui lòng nhập số ghế có sẵn!" }]}>
                    <InputNumber min={0} placeholder="Ví dụ: 35" style={{ width: '100%' }} disabled={loading} />
                </Form.Item>
            </Col>
            
            {/* Trạng thái */}
            <Col span={8}>
                <Form.Item name="status" label="Trạng thái" rules={[{ required: true, message: "Vui lòng chọn trạng thái!" }]}>
                    <Select disabled={loading} placeholder="Chọn trạng thái">
                        <Option value="active">Hoạt động</Option>
                        <Option value="inactive">Ngừng hoạt động</Option>
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

export default ScheduleModal;
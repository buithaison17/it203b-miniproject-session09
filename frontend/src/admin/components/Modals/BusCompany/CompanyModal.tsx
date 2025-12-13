import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Button, Row, Col, message } from "antd";
import type { BusCompany } from "../../../../interfaces/Bus"; 

interface CompanyFormData {
  name: string;
  phone: string;
  descriptions: string;
  image: File | string | null; 
  license: File | string | null;
}

interface CompanyFormModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (data: BusCompany) => void; 
  initialData?: BusCompany | null;     
  isEditModeProp: boolean;
}

interface BusCompanyFormValues {
    name: string;
    phone: string;
    descriptions: string;
}

const CLOUDINARY_CLOUD_NAME = "dcccifk4l";
const CLOUDINARY_UPLOAD_PRESET = "ImgOJT";

const BusCompanyModal: React.FC<CompanyFormModalProps> = ({
  visible,
  onClose,
  onSave,
  initialData,
  isEditModeProp,
}) => {
  const [form] = Form.useForm<CompanyFormData>();
  const [loading, setLoading] = useState(false);

  // State để quản lý dữ liệu form 
  const [formData, setFormData] = useState<CompanyFormData>({
    name: "", phone: "", descriptions: "", image: null, license: null,
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [licensePreview, setLicensePreview] = useState<string | null>(null);

  // Xử lý chế độ Thêm/Sửa khi Modal mở
  useEffect(() => {
    if (!visible) {
        form.resetFields();
        setFormData({ name: "", phone: "", descriptions: "", image: null, license: null });
        setImagePreview(null);
        setLicensePreview(null);
        return;
    }

    if (initialData) {
      // CHẾ ĐỘ SỬA: Điền dữ liệu và set preview URL cũ
      
      // 1. Điền giá trị TEXT vào form của Antd
      form.setFieldsValue({
        name: initialData.name,
        phone: initialData.phone,
        descriptions: initialData.descriptions,
      });
      
      // 2. Cập nhật state formData và Preview cho ảnh
      setFormData(prev => ({
          ...prev, 
          image: initialData.image, 
          license: initialData.license,
      }));
      setImagePreview(initialData.image);
      setLicensePreview(initialData.license);
      
    } else {
      // CHẾ ĐỘ THÊM: Reset
      form.resetFields();
      setImagePreview(null);
      setLicensePreview(null);
    }
  }, [visible, initialData, form]);

  // HÀM XỬ LÝ UPLOAD LÊN CLOUDINARY 
  const uploadImageToCloudinary = async (file: File) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        { method: "POST", body: data }
      );
      const json = await res.json();
      if (!json?.secure_url) throw new Error("Upload failed");
      return json.secure_url as string;
    } catch (error) {
      console.error("Cloudinary upload error:", error);
      throw new Error("Lỗi tải ảnh lên Cloud.");
    }
  };

  // Xử lý thay đổi Input File 
  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: "image" | "license"
  ) => {
    const file = e.target.files?.[0] ?? null;
    if (!file) return;

    setFormData((prev) => ({ ...prev, [fieldName]: file }));
    const previewUrl = URL.createObjectURL(file);

    if (fieldName === "image") {
      setImagePreview(previewUrl);
    } else {
      setLicensePreview(previewUrl);
    }
    form.setFieldsValue({ [fieldName as string]: null as unknown });
  };

  // Hàm XỬ LÝ LƯU
  const handleFormSubmit = async (values: BusCompanyFormValues) => {
const now = new Date();

    // Lấy dữ liệu text đã trim từ 'values'
    const name = values.name.trim();
    const phone = values.phone.trim();
    const descriptions = values.descriptions.trim();

    setLoading(true);

    try {
      let imageUrl: string | null = null;
      let licenseUrl: string | null = null;

      // 1. Xử lý Ảnh Chính
      if (formData.image instanceof File) {
        message.loading("Đang tải hình ảnh", 0);
        imageUrl = await uploadImageToCloudinary(formData.image);
      } else if (typeof formData.image === "string") {
        imageUrl = formData.image;
      }

      // 1. Xử lý Giấy Phép
      if (formData.license instanceof File) {
        message.loading("Đang tải giấy phép", 0);
        licenseUrl = await uploadImageToCloudinary(formData.license);
      } else if (typeof formData.license === "string") {
        licenseUrl = formData.license;
      }
      message.destroy();

      if (!imageUrl || !licenseUrl) {
        throw new Error("Tải ảnh thất bại hoặc thiếu URL.");
      }

      // 3. Chuẩn bị Dữ liệu cuối cùng 
      const finalData: BusCompany = {
        id: initialData?.id || Date.now().toString(),
        name,
        phone,
        descriptions,
        image: imageUrl,
        license: licenseUrl,
        created_at: initialData?.created_at || now.toISOString(),
        updated_at: now.toISOString(),
      };

      // 4. Gọi hàm lưu (API/Redux)
      onSave(finalData);

      message.success(
        isEditMode ? "Cập nhật nhà xe thành công" : "Thêm nhà xe mới thành công"
      );
      onClose();
    } catch (error: unknown) {
          // Khai báo là unknown
          let errorMessage = "Lỗi khi lưu dữ liệu.";
          if (error instanceof Error) {
            errorMessage = error.message;
          }
          console.error(errorMessage);
        } finally {
      setLoading(false);
    }
  };

  const isEditMode = isEditModeProp;

  return (
    <Modal
      title={isEditMode ? "Sửa Nhà Xe" : "Thêm Nhà Xe"} 
      open={visible}
      onCancel={onClose}
      footer={null}
      width={700}
      destroyOnHidden
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFormSubmit}
      >
        {/* Dữ liệu Form Text */}
        <Row gutter={16}>
          {/* Tên Nhà Xe */}
          <Col span={12}>
            <Form.Item name="name" label="Tên Nhà Xe" rules={[{ required: true, message: "Vui lòng nhập tên!" }]}>
              <Input placeholder="Ví dụ: Phương Trang" disabled={loading}  />
            </Form.Item>
          </Col>
          
          {/* Số Điện Thoại */}
          <Col span={12}>
            <Form.Item name="phone" label="Số Điện Thoại" rules={[{ required: true, message: "Vui lòng nhập SĐT!" }]}>
              <Input placeholder="Ví dụ: 0901234567" disabled={loading}  />
            </Form.Item>
          </Col>
          
          {/* Mô Tả */}
          <Col span={24}>
            <Form.Item name="descriptions" label="Mô Tả" rules={[{ required: true, message: "Vui lòng nhập mô tả!" }]}>
              <Input.TextArea rows={1} placeholder="Mô tả ngắn về nhà xe..." disabled={loading} />
            </Form.Item>
          </Col>
        </Row>

        {/* Dữ liệu Form File */}
        <Row gutter={16} className="mt-4">
          {/* Ảnh Chính */}
          <Col span={12}>
            <Form.Item label="Ảnh Chính">
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, "image")}
                disabled={loading}
              />
              {imagePreview && (
                <div className="mt-2">
                  <p className="text-sm text-gray-500 m-0">Ảnh hiện tại:</p>

                  <img
                    src={imagePreview}
                    alt="Preview"
                    style={{
                      width: "100%",
                      height: 150,
                      objectFit: "cover",
                      borderRadius: 4,
                    }}
                  />
                </div>
              )}
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="Giấy Phép">
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, "license")}
                disabled={loading}
              />
              {licensePreview && (
                <div className="mt-2">
                  <p className="text-sm text-gray-500 m-0">
                    Hình nền hiện tại:
                  </p>

                  <img
                    src={licensePreview}
                    alt="Preview"
                    style={{
                      width: "100%",
                      height: 150,
                      objectFit: "cover",
                      borderRadius: 4,
                    }}
                  />
                </div>
              )}
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

export default BusCompanyModal;
import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Button, Row, Col, message } from "antd";
import type { Station } from "../../../../interfaces/Station";

interface StationFormData {
  name: string;
  location: string;
  descriptions: string;
  phone: string;
  image: File | string | null;
  wallpaper: File | string | null;
}

interface StationFormModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (data: Station) => void;
  initialData?: Station | null;
  isEditModeProp: boolean;
}

const CLOUDINARY_CLOUD_NAME = "dcccifk4l";
const CLOUDINARY_UPLOAD_PRESET = "ImgOJT";

const StationFormModal: React.FC<StationFormModalProps> = ({
  visible,
  onClose,
  onSave,
  initialData,
  isEditModeProp,
}) => {
  const [form] = Form.useForm<StationFormData>();
  const [loading, setLoading] = useState(false);

  // State để quản lý dữ liệu form
  const [formData, setFormData] = useState<StationFormData>({
    name: "",
    location: "",
    descriptions: "",
    phone: "",
    image: null,
    wallpaper: null,
  });

  // State quản lý ảnh preview
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [wallpaperPreview, setWallpaperPreview] = useState<string | null>(null);

  // Xử lý chế độ Thêm/Sửa khi Modal mở
  useEffect(() => {
    if (!visible) {
      // RESET SẠCH state khi đóng Modal
      form.resetFields();
      setFormData({
        name: "",
        location: "",
        descriptions: "",
        phone: "",
        image: null,
        wallpaper: null,
      });
      setImagePreview(null);
      setWallpaperPreview(null);
      return;
    }

    if (initialData) {
      // CHẾ ĐỘ SỬA: Điền dữ liệu và set preview URL cũ

      // 1. Điền giá trị TEXT vào form của Antd
      form.setFieldsValue({
        name: initialData.name,
        location: initialData.location,
        descriptions: initialData.descriptions,
        phone: initialData.phone,
      });

      // 2. Cập nhật state formData và Preview cho ảnh (URL cũ)
      setFormData((prev) => ({
        ...prev,
        image: initialData.image,
        wallpaper: initialData.wallpaper,
      }));
      setImagePreview(initialData.image);
      setWallpaperPreview(initialData.wallpaper);
    } else {
      // CHẾ ĐỘ THÊM: Reset
      form.resetFields();
      setImagePreview(null);
      setWallpaperPreview(null);
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
        {
          method: "POST",
          body: data,
        }
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
    fieldName: "image" | "wallpaper"
  ) => {
    const file = e.target.files?.[0] ?? null;
    if (!file) return;

    setFormData((prev) => ({ ...prev, [fieldName]: file }));
    const previewUrl = URL.createObjectURL(file);

    if (fieldName === "image") {
      setImagePreview(previewUrl);
    } else {
      setWallpaperPreview(previewUrl);
    }
    // Xóa các file cũ trong form item
    form.setFieldsValue({ [fieldName as string]: null as unknown });
  };

  // Hàm XỬ LÝ LƯU
  const handleFormSubmit = async (values: StationFormData) => {
    // Lấy thời điểm hiện tại
    const now = new Date();

    // Lấy dữ liệu text đã trim từ 'values'
    const name = values.name.trim();
    const location = values.location.trim();
    const phone = values.phone.trim();
    const descriptions = values.descriptions.trim();

    setLoading(true);

    try {
      let imageUrl: string | null = null;
      let wallpaperUrl: string | null = null;

      // 1. Xử lý Ảnh Chính (Lấy từ formData state)
      if (formData.image instanceof File) {
        message.loading("Đang tải ảnh chính", 0);
        imageUrl = await uploadImageToCloudinary(formData.image);
      } else if (typeof formData.image === "string") {
        imageUrl = formData.image; // Giữ nguyên URL cũ
      }

      // 2. Xử lý Hình Nền (Lấy từ formData state)
      if (formData.wallpaper instanceof File) {
        message.loading("Đang tải hình nền", 0);
        wallpaperUrl = await uploadImageToCloudinary(formData.wallpaper);
      } else if (typeof formData.wallpaper === "string") {
        wallpaperUrl = formData.wallpaper; // Giữ nguyên URL cũ
      }
      message.destroy();

      // 3. Kiểm tra URL (Nếu là chế độ Sửa, URL null chỉ xảy ra khi xóa ảnh cũ)
      if (!imageUrl || !wallpaperUrl) {
        throw new Error("Tải ảnh thất bại hoặc thiếu URL.");
      }

      // 4. Chuẩn bị Dữ liệu cuối cùng
      const finalData: Station = {
        id: initialData?.id || Date.now().toString(),
        name,
        location,
        descriptions,
        phone,
        image: imageUrl,
        wallpaper: wallpaperUrl,
        created_at: initialData?.created_at || now.toISOString(),
        updated_at: now.toISOString(),
      };

      // 5. Gọi hàm lưu (API/Redux)
      onSave(finalData);

      message.success(
        initialData
          ? "Cập nhật bến xe thành công"
          : "Thêm bến xe mới thành công"
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
      title={isEditMode ? "Sửa Bến Xe" : "Thêm Bến Xe"}
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
        // Antd Form sẽ chạy validation và gọi onFinish() nếu hợp lệ
      >
        {/* Dữ liệu Form Text */}
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="name"
              label="Tên Bến Xe"
              rules={[{ required: true, message: "Vui lòng nhập tên!" }]}
            >
              <Input placeholder="Ví dụ: Bến Xe Giáp Bát" disabled={loading} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="location"
              label="Địa Chỉ"
              rules={[{ required: true, message: "Vui lòng nhập địa chỉ!" }]}
            >
              <Input
                placeholder="Ví dụ: Giải Phóng, Hoàng Mai"
                disabled={loading}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="phone"
              label="Số Điện Thoại"
              rules={[{ required: true, message: "Vui lòng nhập SĐT!" }]}
            >
              <Input placeholder="Ví dụ: 0901234567" disabled={loading} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="descriptions"
              label="Mô Tả"
              rules={[{ required: true, message: "Vui lòng nhập mô tả!" }]}
            >
              <Input.TextArea
                rows={1}
                placeholder="Mô tả ngắn về bến xe..."
                disabled={loading}
              />
            </Form.Item>
          </Col>
        </Row>

        {/* Dữ liệu Form File */}
        <Row gutter={16} className="mt-4">
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
            <Form.Item label="Hình Nền">
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, "wallpaper")}
                disabled={loading}
              />

              {wallpaperPreview && (
                <div className="mt-2">
                  <p className="text-sm text-gray-500 m-0">
                    Hình nền hiện tại:
                  </p>

                  <img
                    src={wallpaperPreview}
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

export default StationFormModal;

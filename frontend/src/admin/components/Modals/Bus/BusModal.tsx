import React, { useEffect, useState, useRef } from "react";
import { 
    Modal, Form, Input, Button, Row, Col, message, Tag 
} from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import type { Bus } from "../../../../interfaces/Bus";
import type { BusImage } from "../../../../interfaces/Bus"; 
import type { CombinedBus } from "../../../../apis/bus.api";

type ImageStateItem = File | BusImage;

interface BusFormModalProps {
    visible: boolean;
    onClose: () => void;
    // onSave: Nhận Bus data, ID ảnh cần xóa, và Files mới cần upload
    onSave: (busData: Bus, imagesToDelete: string[], filesToUpload: File[], currentImageUrls: string[]) => void;
    initialData?: CombinedBus | null; 
    isEditModeProp: boolean;
}

const CLOUDINARY_CLOUD_NAME = "dcccifk4l";
const CLOUDINARY_UPLOAD_PRESET = "ImgOJT";


const ImagePreviewRenderer: React.FC<{ item: ImageStateItem, index: number, onRemove: (index: number) => void }> = 
    ({ item, index, onRemove }) => {
    
    const url = item instanceof File ? URL.createObjectURL(item) : item.image_url;
    
    return (
        <Col span={12} className="relative p-2">
            <img 
                src={url} 
                alt={`Preview ${index}`} 
                style={{ width: '100%', height: 120, objectFit: 'cover', borderRadius: 4 }} 
            />
            <Button 
                icon={<DeleteOutlined />} 
                danger 
                size="small"
                className="absolute top-3 right-3 z-10"
                onClick={() => onRemove(index)}
            />
            <Tag 
                color={item instanceof File ? 'blue' : 'green'} 
                className="absolute bottom-3 left-3"
            >
                {item instanceof File ? 'Mới' : 'Cũ'}
            </Tag>
        </Col>
    );
};


const BusModal: React.FC<BusFormModalProps> = ({
    visible, onClose, onSave, initialData, isEditModeProp,
}) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const now = new Date();

    const [images, setImages] = useState<ImageStateItem[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null); 
    
    // Xử lý chế độ Thêm/Sửa khi Modal mở
    useEffect(() => {
        if (!visible) {
            form.resetFields();
            setImages([]);
            if (fileInputRef.current) fileInputRef.current.value = ""; 
            return;
        }

        if (initialData) {
            form.setFieldsValue({
                name: initialData.name,
                descriptions: initialData.descriptions,
                company_id: initialData.company_id,
                license_plate: initialData.license_plate,
                capacity: initialData.capacity,
            });
            // Tải tất cả BusImage cũ vào state images
            setImages(initialData.images || []);
        } else {
            form.resetFields();
            setImages([]);
        }
    }, [visible, initialData, form]);

    const uploadImageToCloudinary = async (file: File): Promise<string> => {
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

        const res = await fetch(
            `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
            { method: "POST", body: data }
        );
        const json = await res.json();
        if (!json?.secure_url) throw new Error("Upload failed");
        return json.secure_url;
    };

    // Xử lý thay đổi Input File (Đa file)
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) return;

        const newFilesArray = Array.from(files);
        setImages(prev => [...prev, ...newFilesArray]);
        e.target.value = ''; 
    };

    // Xử lý Xóa ảnh khỏi danh sách preview
    const handleRemoveImage = (indexToRemove: number) => {
        setImages(prev => prev.filter((_, index) => index !== indexToRemove));
    };


    // Hàm XỬ LÝ LƯU CHÍNH
    const handleFormSubmit = async (values: Bus) => {
        setLoading(true);

        // 1. Phân loại ảnh: File mới (cần upload) và BusImage cũ (cần giữ/xóa)
        const filesToUpload = images.filter(item => item instanceof File) as File[];
        const currentBusImages = images.filter(item => !(item instanceof File)) as BusImage[];

        const totalImages = filesToUpload.length + currentBusImages.length;
    
    if (totalImages === 0) {
        message.error("Thiếu URL ảnh xe");
        setLoading(false);
        return; 
    }

        // Danh sách ID ảnh cũ cần xóa
        const initialImageIds = initialData?.images.map(img => img.id) || [];
        const currentImageIds = currentBusImages.map(img => img.id);
        const imagesToDelete = initialImageIds.filter(id => !currentImageIds.includes(id));
        
        const uploadedUrls: string[] = [];
        
        try {
            // 2. Upload tất cả file mới lên Cloudinary (Sequential Uploads)
            if (filesToUpload.length > 0) {
                message.loading(`Đang tải lên ${filesToUpload.length} ảnh...`, 0);
                
                // Upload từng file một để tránh vượt quá giới hạn đồng thời (nếu có)
                for (const file of filesToUpload) {
                    const url = await uploadImageToCloudinary(file);
                    uploadedUrls.push(url);
                }
            }
            message.destroy();

            
            
            // 3. Chuẩn bị Bus object (Chỉ thông tin xe)
            const busToSave: Bus = {
                id: initialData?.id || Date.now().toString(),
                name: values.name.trim(),
                company_id: values.company_id.trim(),
                license_plate: values.license_plate.trim(),
                descriptions: values.descriptions.trim(),
                capacity: values.capacity,

                created_at: initialData?.created_at || now.toISOString(),
                updated_at: now.toISOString(),
            } as unknown as Bus;
            
            // 4. Gọi onSave với dữ liệu Bus, ID ảnh cần xóa, và URL ảnh mới đã upload
            onSave(busToSave, imagesToDelete, filesToUpload, uploadedUrls); // <-- Sửa lại props onSave

            message.success(isEditModeProp ? "Hoàn tất xử lý dữ liệu." : "Hoàn tất xử lý dữ liệu.");
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
    const hasImages = images.length > 0;

    return (
        <Modal
            title={isEditMode ? "Sửa Thông Tin Xe" : "Thêm Xe Mới"}
            open={visible}
            onCancel={onClose}
            footer={null}
            width={800}
            destroyOnHidden
        >
            <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
                {/* ... (Các trường text giữ nguyên) ... */}
                <Row gutter={16}>
                    <Col span={12}><Form.Item name="name" label="Tên Xe" rules={[{ required: true, message: "Vui lòng nhập tên xe!" }]}><Input disabled={loading} /></Form.Item></Col>
                    <Col span={12}><Form.Item name="company_id" label="ID Nhà Xe" rules={[{ required: true, message: "Vui lòng nhập ID Nhà Xe!" }]}><Input disabled={loading} /></Form.Item></Col>
                </Row>
                <Row gutter={16}>
                    <Col span={8}><Form.Item name="license_plate" label="Biển Số Xe" rules={[{ required: true, message: "Vui lòng nhập Biển Số Xe!" }]}><Input disabled={loading} /></Form.Item></Col>
                    <Col span={8}><Form.Item name="capacity" label="Số Ghế" rules={[{ required: true, message: "Vui lòng nhập Số Ghế!" }]}><Input type="number" disabled={loading} /></Form.Item></Col>
                    <Col span={8}><Form.Item name="descriptions" label="Mô Tả" rules={[{ required: true, message: "Vui lòng nhập mô tả!" }]}><Input.TextArea rows={1} disabled={loading} /></Form.Item></Col>
                </Row>

                {/* --- KHU VỰC UPLOAD ĐA ẢNH --- */}
                <h3 className="mt-4 text-lg font-semibold">Ảnh Xe ({images.length} ảnh)</h3>
                <Row gutter={16} className="mt-2">
                    <Col span={24}>
                        <label htmlFor="multi-file-upload">
                            <input
                                id="multi-file-upload"
                                type="file"
                                multiple
                                ref={fileInputRef}
                                accept="image/*"
                                onChange={handleFileChange}
                                disabled={loading}
                                style={{ display: 'none' }} 
                            />
                            <Button 
                                type="dashed" 
                                icon={<PlusOutlined />} 
                                disabled={loading}
                                style={{ width: '100%', height: 40 }}
                                onClick={() => fileInputRef.current?.click()}
                            >
                                Chọn thêm Ảnh (Tối đa 2MB/ảnh)
                            </Button>
                        </label>
                    </Col>
                </Row>
                
                {/* --- HIỂN THỊ PREVIEW (2 ảnh/row) --- */}
                {hasImages && (
                    <div className="mt-4 border p-2 rounded-md bg-gray-50">
                        <Row gutter={[16, 16]}>
                            {images.map((item, index) => (
                                <ImagePreviewRenderer 
                                    key={index + (item instanceof File ? item.name : item.id)}
                                    item={item}
                                    index={index}
                                    onRemove={handleRemoveImage}
                                />
                            ))}
                        </Row>
                    </div>
                )}
                
                {/* Footer (Nút Lưu) */}
                <Form.Item className="mt-8">
                    <Button type="primary" htmlType="submit" loading={loading} className="w-full" size="large">
                        {isEditMode ? "Lưu Thay Đổi" : "Thêm Mới"}
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default BusModal;
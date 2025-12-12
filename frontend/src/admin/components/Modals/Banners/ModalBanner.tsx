import { Form, Input, Modal } from "antd";

import { useEffect, useState } from "react";
import { featBooking } from "../../../../apis/booking.api";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../../../stores/store";
import type { Banner } from "../../../../interfaces/Banner";

import axios from "axios";

interface ModalBookingProps {
  modal: "add" | "edit";
  open: boolean;
  onOk: (banner: Banner) => void;
  onCancel: () => void;
  initial?: Partial<Banner>;
}

interface BannerForm {
  banner_id : string;
  image : string | File;
  position: string;
}

export default function ModalBanner({
  open,
  onOk,
  onCancel,
  initial = {},
    mode = "add"
}: ModalBookingProps) {
  const [form] = Form.useForm<BannerForm>();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(featBooking());
  }, [dispatch]);
  


  const [preview, setPreview] = useState<string>("");
  

  async function uploadToCloudinary(file: File) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "vivutoday");
    formData.append("cloud_name", "deyuvrsv9");

    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/deyuvrsv9/image/upload",
      formData
    );

    return res.data.secure_url;
  }

  async function handleSubmit(values: BannerForm) {
    let imageUrl = "";

    if (values.image instanceof File) {
      imageUrl = await uploadToCloudinary(values.image);
    }

    const banner: Banner = {
      id : initial.id,
      banner_id: values.banner_id,
      banner_url: imageUrl,
      position: values.position,
    };

    onOk(banner);
    form.resetFields();
    setPreview("");
  }


  return (
    <Modal
      title="Thêm/Cập nhật vé"
      open={open}
      onOk={() => form.submit()}
      onCancel={onCancel}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
      >
        <Form.Item
          name="banner_id"
          label="Mã banner"
          
          rules={[{ required: true, message: "Vui lòng nhập mã banner..!" }]}
        >
          <Input placeholder="BN001" />
        </Form.Item>

        <Form.Item
          name="image"
          label="Ảnh banner"
          rules={[{ required: true, message: "Vui lòng chọn ảnh!" }]}
        >

          <Input
            type="file"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                form.setFieldValue("image", file);
                setPreview(URL.createObjectURL(file));
              }
            }}
          />

          {
            preview && 
            <div className="p-1">
              <img className="w-20 h-20" src={preview} alt="" />
            </div>
          }
        
        </Form.Item>

       
        <Form.Item
          name="position"
          label="Vị trí"
          
          rules={[{ required: true, message: "Vui lòng nhập vị trí..!" }]}
        >
          <Input placeholder="dash board - content" />
        </Form.Item>
      </Form>
    </Modal>
  );
}

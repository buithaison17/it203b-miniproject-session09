import { useState } from "react";
import type { Bus, BusCompany } from "../../interfaces/Bus";
import type { Schedules } from "../../interfaces/Schedules";
import type { Routes } from "../../interfaces/Routes";
import moment from "moment";

interface Props {
  bookingModal: () => void;
  busesData: Bus;
  scheduleData: Schedules;
  routesData: Routes;
  totalSeats: number;
}

export default function CardItem({
  bookingModal,
  busesData,
  scheduleData,
  routesData,
  totalSeats,
}: Props) {
  // Xem chi tiết
  const [detailsContent, setDetailsContent] = useState<"image" | "cancelPrice">(
    "image"
  );
  const [detailsHidden, setDetailsHidden] = useState<boolean>(true);

  const detailsActive =
    "relative w-full p-2.5 border-b-2 border-[#428BCA] hover:cursor-pointer";
  const detailsUnactive =
    "relative w-full p-2.5 border-b-2 hover:cursor-pointer";

  const imageDetails = (imageUrl: string) => (
    <img className="h-56 rounded-lg" src={imageUrl} alt="detailsImage" />
  );

  const cancelPrice = () => (
    <div className="flex flex-col gap-6 text-[#333] text-sm max-w-[600px] w-full">
      <div>
        <div className="grid grid-cols-3 font-bold text-center py-3 border-b border-[#CCCCCC] border-dashed">
          <p>Hủy từ</p>
          <p>Đến trước</p>
          <p>Phí huỷ</p>
        </div>

        <div className="grid grid-cols-3 text-center py-4 border-b border-[#CCCCCC] border-dashed">
          <div>Sau khi đặt</div>
          <div>
            06:45 <br /> 25/11/2024
          </div>
          <div>
            <span className="font-bold">0%</span> <br />
            giá trị đơn hàng
          </div>
        </div>

        <div className="grid grid-cols-3 text-center py-4">
          <div>
            06:45 <br /> 25/11/2024
          </div>
          <div>Giờ khởi hành</div>
          <div>
            <span className="font-bold">100%</span> <br />
            giá trị đơn hàng
          </div>
        </div>
      </div>

      <div className="text-sm leading-5">
        <p className="font-bold mb-1">Ghi chú:</p>
        <p>
          Phí huỷ sẽ được tính trên giá gốc, không giảm trừ khuyến mãi hoặc giảm
          giá; đồng thời không vượt quá số tiền quý khách đã thanh toán.
        </p>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col gap-5">
      <div className="border border-[#C0C0C0] p-5 rounded-lg w-full flex flex-col gap-7">
        {/* Public */}
        <div className="flex gap-5">
          <img
            className="w-[100px] h-[100px] rounded-sm"
            src="https://res.cloudinary.com/dq87endkv/image/upload/v1765269634/Container_xzu8ku.png"
            alt="company image"
          />

          <section className="w-full">
            <div className="flex gap-2 align-middle items-center">
              <h2 className="font-bold text-xl">{busesData.bus_name}</h2>
              <p className="bg-[#0060C4] text-white flex gap-2 px-2 py-px rounded-xs">
                <img
                  src="https://res.cloudinary.com/dq87endkv/image/upload/v1765269941/Symbol_w7zqfj.svg"
                  alt=""
                />
                <span className="font-bold text-sm/snug">4.5</span>
              </p>
              <p className="text-[#767676] text-sm font-extralight">
                • 21 đánh giá
              </p>
            </div>

            <div className="flex gap-[72px]">
              <div className="w-[75%]">
                <p className="text-[#767676] text-sm font-extralight">
                  {busesData.descriptions}
                </p>

                <div className="flex justify-between items-center">
                  <p className="font-bold text-lg text-[#767676]">
                    {moment(scheduleData.departure_time).format("HH:mm")}
                  </p>
                  <div className="mx-auto text-center">
                    <p className="text-[#767676] italic">
                      {routesData.duration}
                    </p>
                    <img
                      className="h-5"
                      src="https://res.cloudinary.com/dq87endkv/image/upload/v1765271244/from-to2.png_l9rsel.png"
                      alt=""
                    />
                  </div>
                  <p className="font-bold text-lg text-[#767676]">
                    {moment(scheduleData.arrival_time).format("HH:mm")}
                  </p>
                </div>

                <div className="mt-2 flex justify-between items-center">
                  <p className="text-[#428BCA]">
                    {routesData.departure_station_name}
                  </p>
                  <p className="text-[#428BCA]">
                    {routesData.arrival_station_name}
                  </p>
                </div>

                <div className="mt-2 flex justify-between items-center">
                  <p>Thuộc chuyến 21:00 20-11-2024 Hà Nội - Hải Phỏng</p>
                  <button
                    type="button"
                    className="text-[#428BCA] hover:text-[#0f6cbd] cursor-pointer bg-transparent border-none p-0 underline decoration-transparent hover:decoration-[#0f6cbd] transition-all"
                    onClick={() => setDetailsHidden(!detailsHidden)}
                  >
                    Thông tin chi tiết
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-6">
                <div className="text-end">
                  <p>
                    Từ{" "}
                    <span className="text-2xl font-bold">
                      {routesData.price.toLocaleString("vi", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </span>
                  </p>
                  <p>{totalSeats} còn trống</p>
                </div>

                <button
                  className="flex items-center gap-3 rounded-sm bg-[#E5A100] px-4 py-2 hover:bg-[#f9b820] hover:cursor-pointer"
                  onClick={bookingModal}
                >
                  <img
                    className="h-4"
                    src="https://res.cloudinary.com/dq87endkv/image/upload/v1765275584/Vector_cth1ip.png"
                  />
                  Chọn xe
                </button>
              </div>
            </div>
          </section>
        </div>

        <div
          className={`transition-all duration-500 overflow-hidden ${
            detailsHidden ? "max-h-0 opacity-0" : "max-h-[2000px] opacity-100"
          }`}
        >
          <section className="flex justify-around text-center">
            <div
              className={
                detailsContent === "image" ? detailsActive : detailsUnactive
              }
              onClick={() => setDetailsContent("image")}
            >
              <p
                className={
                  detailsContent === "image"
                    ? "font-bold text-lg text-[#428BCA]"
                    : "font-bold text-lg"
                }
              >
                Hình ảnh
              </p>
            </div>

            <div
              className={
                detailsContent === "cancelPrice"
                  ? detailsActive
                  : detailsUnactive
              }
              onClick={() => setDetailsContent("cancelPrice")}
            >
              <p
                className={
                  detailsContent === "cancelPrice"
                    ? "font-bold text-lg text-[#428BCA]"
                    : "font-bold text-lg"
                }
              >
                Phí huỷ
              </p>
            </div>
          </section>

          <div className="p-6 flex justify-center">
            {detailsContent === "image"
              ? imageDetails(
                  "https://res.cloudinary.com/dq87endkv/image/upload/v1765289489/image_1_xqxekd.png"
                )
              : cancelPrice()}
          </div>
        </div>
      </div>
    </div>
  );
}

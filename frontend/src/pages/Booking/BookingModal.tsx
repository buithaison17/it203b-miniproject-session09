import { useEffect, useState } from "react";
import SeatMap from "./SeatMap";
import type { Seat } from "../../interfaces/Bus";

interface Props {
  bookingModal: () => void;
  seats: Seat[];
}

export default function BookingModal({ bookingModal, seats }: Props) {
  // Chặn cuộn trang khi mở modal
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  // sơ đồ ghế
  const [seatCount, setSeatCount] = useState<number>(0);
  const selectSeat = (quantity: number) => setSeatCount(quantity);

  const seatSelectedContent = () => {
    return (
      <>
        <SeatMap seats={seats} selectSeat={selectSeat} />
        <section className="flex gap-3">
          <div className="flex gap-1">
            <span className="bg-gray-400 p-1 rounded-md"></span>
            <p>Ghế đã được chọn</p>
          </div>
          <div className="flex gap-1">
            <span className="bg-blue-500 p-1 rounded-md"></span>
            <p>Ghế còn trống</p>
          </div>
          <div className="flex gap-1">
            <span className="bg-green-500 p-1 rounded-md"></span>
            <p>Ghế bạn đã chọn</p>
          </div>
        </section>
        <section>
          <p>Số ghế đã chọn : {seatCount}</p>
        </section>
      </>
    );
  };

  // nhập thông tin cá nhân
  const userInformation = () => {
    return (
      <>
        <section>
          <div>
            <label htmlFor="name">Họ tên</label>
            <input
              className="border border-[#D9D9D9] w-full p-2 rounded-sm"
              type="text"
              id="name"
              placeholder="Nhập họ tên"
            />
          </div>
          <br />
          <div>
            <label htmlFor="phonenumber">Số điện thoại</label>
            <input
              className="border border-[#D9D9D9] w-full p-2 rounded-sm"
              type="text"
              id="phonenumber"
              placeholder="Nhập Số điện thoại"
            />
          </div>
        </section>
      </>
    );
  };

  // chọn phương thức thanh toán
  const [paymentProvider, setPaymentProvider] = useState<string | undefined>(
    undefined
  );
  const paymentSelected = () => {
    return (
      <section>
        <select
          className="border border-[#D9D9D9] rounded-md p-2"
          onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
            setPaymentProvider(event.target.value)
          }
        >
          <option defaultChecked>Chọn phương thức thanh toán</option>
          <option value="VNPay">VNPay</option>
          <option value="MBBank">MBBank</option>
          <option value="VPBank">VPBank</option>
          <option value="VietComBank">VietComBank</option>
        </select>
      </section>
    );
  };

  const paymentCode = () => {
    return (
      <div className="flex flex-col gap-6 justify-center items-center">
        <img
          className="h-60 w-60"
          src="https://res.cloudinary.com/dq87endkv/image/upload/v1765339183/Screenshot_2025-12-10_at_10.59.34_dhmh0s.png"
          alt="qrcode"
        />
        <p>97982956789</p>
        <p>Dao Truong Son</p>
      </div>
    );
  };

  // Tổng tiền hoá đơn
  const invoice = () => {
    return <></>;
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center
        transition-opacity duration-300 opacity-100 pointer-events-auto"
    >
      {/* Overlay*/}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={bookingModal}
      />

      {/* Modal box */}
      <div
        className="relative z-10 bg-white rounded-lg shadow-lg p-6 w-[500px] 
          transition-all duration-300 translate-y-0 scale-100 max-h-[90vh] overflow-y-auto"
      >
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold">Chọn xe</h3>
          <button
            onClick={bookingModal}
            className="text-gray-500 hover:text-black hover:cursor-pointer"
          >
            ✕
          </button>
        </div>
        <hr />
        <div className="mt-4 flex flex-col gap-3">
          {/* sơ đồ ghế */}
          <h3 className="text-xl font-bold">Sơ đồ ghế</h3>
          {seatSelectedContent()}
          {/* Thông tin cá nhân */}
          <h3 className="text-xl font-bold">Thông tin cá nhân</h3>
          {userInformation()}
          {/* Tổng tiền hoá đơn */}
          <h3 className="text-xl font-bold">Tổng tiền hoá đơn</h3>
          {invoice()}
          {/* Phương thức thanh toán */}
          <h3 className="text-xl font-bold">Chọn phương thức thanh toán</h3>
          {/* lựa chọn kiểu thanh toán */}
          {paymentSelected()}
          {/* mã qr */}
          {paymentCode()}
          <section className="flex gap-4 justify-end">
            <button
              className="items-center gap-3 rounded-sm bg-red-500 px-4 py-2 hover:bg-red-700 hover:cursor-pointer text-white"
              onClick={bookingModal}
            >
              Huỷ
            </button>
            <button className="items-center gap-3 rounded-sm bg-green-500 px-4 py-2 hover:bg-green-700 hover:cursor-pointer text-white">
              Xác nhận
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}

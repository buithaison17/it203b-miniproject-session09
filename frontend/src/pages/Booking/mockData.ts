import type { Bus, BusCompany, BusImage, Seat } from "../../interfaces/Bus";
import type { PaymentProvider, Payment } from "../../interfaces/Payment";
import type { Routes } from "../../interfaces/Routes";
import type { Schedules, Ticket } from "../../interfaces/Schedules";
import type { Station } from "../../interfaces/Station";

export const stations: Station[] = [
  {
    id: "st_01",
    name: "Bến xe Miền Đông",
    location: "292 Đinh Bộ Lĩnh, Bình Thạnh, TP.HCM",
    descriptions:
      "Bến xe khách lớn nhất TP.HCM đi các tỉnh Miền Đông, Tây Nguyên và Miền Bắc.",
    phone: "02838994056",
    image: "https://example.com/bx_miendong.jpg",
    wallpaper: "https://example.com/bx_miendong_bg.jpg",
    created_at: "2023-01-01T00:00:00Z",
    updated_at: "2023-01-01T00:00:00Z",
  },
  {
    id: "st_02",
    name: "Bến xe Liên Tỉnh Đà Lạt",
    location: "01 Tô Hiến Thành, Phường 3, TP. Đà Lạt",
    descriptions: "Đầu mối giao thông chính của tỉnh Lâm Đồng.",
    phone: "02633585858",
    image: "https://example.com/bx_dalat.jpg",
    wallpaper: "https://example.com/bx_dalat_bg.jpg",
    created_at: "2023-01-01T00:00:00Z",
    updated_at: "2023-01-01T00:00:00Z",
  },
];

export const busCompanies: BusCompany[] = [
  {
    bus_companies_id: "comp_01",
    company_name: "Phương Trang (FUTA Bus Lines)",
    image: "https://example.com/futa_logo.png",
    descriptions:
      "Hãng xe khách uy tín hàng đầu Việt Nam với màu cam đặc trưng.",
    phone: "19006067",
    license: "DKKD-01020304",
    created_at: new Date("2023-02-15T00:00:00Z"),
    updated_at: new Date("2023-06-20T00:00:00Z"),
  },
  {
    bus_companies_id: "comp_02",
    company_name: "Thành Bưởi",
    image: "https://example.com/thanhbuoi_logo.png",
    descriptions: "Chuyên tuyến Sài Gòn - Đà Lạt - Cần Thơ.",
    phone: "19006079",
    license: "DKKD-05060708",
    created_at: new Date("2023-03-10T00:00:00Z"),
    updated_at: new Date("2023-07-01T00:00:00Z"),
  },
];

export const buses: Bus[] = [
  {
    id: "bus_01",
    company_id: "comp_01",
    bus_name: "FUTA Luxury 01",
    descriptions: "Xe giường nằm 34 phòng, đầy đủ tiện nghi.",
    license_plate: "51B-123.45",
    capacity: 34,
    created_at: new Date("2023-05-01T00:00:00Z"),
    updated_at: new Date("2023-05-01T00:00:00Z"),
  },
  {
    id: "bus_02",
    company_id: "comp_02",
    bus_name: "TB Limousine 05",
    descriptions: "Xe phòng đôi dành cho cặp đôi, rèm che riêng tư.",
    license_plate: "49B-987.65",
    capacity: 22,
    created_at: new Date("2023-06-15T00:00:00Z"),
    updated_at: new Date("2023-06-15T00:00:00Z"),
  },
];

const busImage: BusImage[] = [
  {
    id: "bus_image_01",
    image_url:
      "https://res.cloudinary.com/dq87endkv/image/upload/v1765289489/image_1_xqxekd.png",
    bus_id: "bus_01",
  },
];

export const routes: Routes[] = [
  {
    id: "route_01",
    departure_station_name: "Bến xe Miền Đông",
    arrival_station_name: "Bến xe Liên Tỉnh Đà Lạt",
    price: 280000,
    duration: "8h 00m",
    distance: 305,
    created_at: new Date("2023-01-10T00:00:00Z"),
    updated_at: new Date("2023-01-10T00:00:00Z"),
  },
  {
    id: "route_02",
    departure_station_name: "Bến xe Liên Tỉnh Đà Lạt",
    arrival_station_name: "Bến xe Miền Đông",
    price: 280000,
    duration: "7h 30m",
    distance: 305,
    created_at: new Date("2023-01-10T00:00:00Z"),
    updated_at: new Date("2023-01-10T00:00:00Z"),
  },
];

export const seats: Seat[] = [
  {
    id: "s1",
    bus_id: "b1",
    seat_number: "A01",
    seat_type: "VIP",
    status: "active",
    price: 450000,
    created_at: new Date("2023-01-10T00:00:00Z"),
    updated_at: new Date("2023-01-10T00:00:00Z"),
  },
  {
    id: "s2",
    bus_id: "b1",
    seat_number: "A02",
    seat_type: "VIP",
    status: "booked",
    price: 450000,
    created_at: new Date("2023-01-10T00:00:00Z"),
    updated_at: new Date("2023-01-10T00:00:00Z"),
  },
  {
    id: "s3",
    bus_id: "b1",
    seat_number: "A03",
    seat_type: "STANDARD",
    status: "active",
    price: 350000,
    created_at: new Date("2023-01-10T00:00:00Z"),
    updated_at: new Date("2023-01-10T00:00:00Z"),
  },
  {
    id: "s4",
    bus_id: "b2",
    seat_number: "B01",
    seat_type: "STANDARD",
    status: "booked",
    price: 300000,
    created_at: new Date("2023-01-10T00:00:00Z"),
    updated_at: new Date("2023-01-10T00:00:00Z"),
  },
  {
    id: "s5",
    bus_id: "b2",
    seat_number: "B02",
    seat_type: "STANDARD",
    status: "active",
    price: 300000,
    created_at: new Date("2023-01-10T00:00:00Z"),
    updated_at: new Date("2023-01-10T00:00:00Z"),
  },
];

export const schedules: Schedules[] = [
  {
    id: "sch_01",
    route_id: "route_01",
    bus_id: "bus_01",
    departure_time: new Date("2023-12-25T22:00:00Z"),
    arrival_time: new Date("2023-12-26T06:00:00Z"),
    available_seat: 33,
    total_seats: 34,
    status: "active",
    created_at: new Date("2023-11-01T00:00:00Z"),
    updated_at: new Date("2023-11-01T00:00:00Z"),
  },
  {
    id: "sch_02",
    route_id: "route_02",
    bus_id: "bus_02",
    departure_time: new Date("2023-12-25T23:00:00Z"),
    arrival_time: new Date("2023-12-26T06:30:00Z"),
    available_seat: 22,
    total_seats: 22,
    status: "active",
    created_at: new Date("2023-11-01T00:00:00Z"),
    updated_at: new Date("2023-11-01T00:00:00Z"),
  },
];

export const tickets: Ticket[] = [
  {
    id: "ticket_01",
    schedule_id: "sch_01",
    seat_id: "seat_01",
    bus_id: "bus_01",
    phone: "0901234567",
    departure_time: new Date("2023-12-25T22:00:00Z"),
    arrival_time: new Date("2023-12-26T06:00:00Z"),
    seat_type: "VIP",
    price: 300000,
    status: "Booked",
    created_at: new Date("2023-12-20T08:30:00Z"),
    updated_at: new Date("2023-12-20T08:35:00Z"),
  },
  {
    id: "ticket_02",
    schedule_id: "sch_02",
    seat_id: "seat_02",
    bus_id: "bus_02",
    phone: "0909888777",
    departure_time: new Date("2023-12-25T23:00:00Z"),
    arrival_time: new Date("2023-12-26T06:30:00Z"),
    seat_type: "LUXURY",
    price: 450000,
    status: "Cancelled",
    created_at: new Date("2023-12-21T09:00:00Z"),
    updated_at: new Date("2023-12-22T10:00:00Z"),
  },
];

export const paymentProviders: PaymentProvider[] = [
  {
    id: "prov_01",
    name: "Momo",
    image: "https://example.com/momo.png",
    type: "e-wallet",
    api_endppoint: "https://payment.momo.vn/api/v2",
    created_at: new Date("2023-01-01T00:00:00Z"),
    updated_at: new Date("2023-01-01T00:00:00Z"),
  },
  {
    id: "prov_02",
    name: "VNPay",
    image: "https://example.com/vnpay.png",
    type: "qr_code",
    api_endppoint: "https://sandbox.vnpayment.vn/payment",
    created_at: new Date("2023-01-01T00:00:00Z"),
    updated_at: new Date("2023-01-01T00:00:00Z"),
  },
];

export const payments: Payment[] = [
  {
    id: "pay_01",
    payment_provider_id: "prov_01", // Momo
    user_id: "user_01", // Nguyễn Văn A
    ticket_id: "ticket_01", // Vé xe FUTA (đã Booked)
    payment_method: "Ví Momo",
    amount: 300000,
    status: "completed",
    created_at: new Date("2023-12-20T08:32:00Z"),
    updated_at: new Date("2023-12-20T08:32:00Z"),
  },
  {
    id: "pay_02",
    payment_provider_id: "prov_02", // VNPay
    user_id: "user_02", // Lê Thị B
    ticket_id: "ticket_02", // Vé xe Thành Bưởi (đã Cancelled)
    payment_method: "VNPay QR",
    amount: 450000,
    status: "completed", // Đã thanh toán xong (sau đó vé bị hủy và có thể chờ hoàn tiền)
    created_at: new Date("2023-12-21T09:05:00Z"),
    updated_at: new Date("2023-12-21T09:05:00Z"),
  },
];

// Nếu muốn gom tất cả vào một object DB
export const db = {
  stations,
  busCompanies,
  buses,
  routes,
  seats,
  schedules,
  tickets,
  paymentProviders,
  payments,
  busImage,
};

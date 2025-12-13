export interface BusCompany {
  id: string;
  name: string;
  image: string | null;
  descriptions: string;
  phone: string;
  license: string | null;
  created_at: Date  | string;
  updated_at: Date | string;
}

export interface Bus {
  name: string;
  id: string;
  company_id: string;
  bus_name: string;
  descriptions: string;
  license_plate: string;
  capacity: number;
  created_at: Date | string;
  updated_at: Date | string;
}

export interface BusImage {
  id: string;
  image_url: string;
  bus_id: string;
}

export interface Seat {
  id: string;
  bus_id: string;
  seat_number: string;
  seat_type: string;
  status: "active" | "inactive" | "booked";
  price: number;
  created_at: Date;
  updated_at: Date;
}

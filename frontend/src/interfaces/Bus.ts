export interface BusCompany {
  id: string;
  name: string;
  image: string;
  descriptions: string;
  created_at: Date;
  updated_at: Date;
}

export interface Bus {
  id: string;
  company_id: string;
  name: string;
  descriptions: string;
  license_plate: String;
  capacity: number;
  created_at: Date;
  updated_at: Date;
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

export interface Schedules {
  id: string;
  route_id: string;
  bus_id: string;
  departure_time: Date;
  arrival_time: Date;
  available_seat: number;
  total_seats: number;
  status: "active" | "inactive";
  created_at: Date;
  updated_at: Date;
}

export interface Ticket {
  id: string;
  schedule_id: string;
  seat_id: string;
  bus_id: string;
  phone: string;
  departure_time: Date;
  arrival_time: Date;
  seat_type: "LUXURY" | "VIP" | "STANDARD";
  price: number;
  status: "Booked" | "Cancelled";
  created_at: Date;
  updated_at: Date;
}

export interface CancellationPolicies {
  id: string;
  descriptions: string;
  route_id: string;
  ticket_id: string;
  cancellation_time_limit: string;
  refund_percentage: number;
  created_at: Date;
  updated_at: Date;
}

export interface Review {
  id: string;
  user_id: string;
  bus_id: string;
  rating: number;
  review: string;
  created_at: string;
  updated_at: string;
}

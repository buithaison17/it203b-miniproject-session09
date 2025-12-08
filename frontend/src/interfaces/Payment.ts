export interface PaymentProvider {
  id: string;
  name: string;
  type: "card" | "e-wallet" | "bank_transfer" | "qr_code";
  api_endppoint: string;
  created_at: Date;
  updated_at: Date;
}

export interface Payment {
  id: string;
  payment_provider_id: string;
  user_id: string;
  ticket_id: string;
  payment_method: string;
  amount: number;
  status: "pending" | "completed" | "failed";
  created_at: Date;
  updated_at: Date;
}

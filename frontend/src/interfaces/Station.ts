export interface Station {
  id: string;
  name: string;
  location: string;
  descriptions: string;
  phone: string;
  image: string | null; // URL của ảnh
  wallpaper: string | null; // URL của hình nền
  created_at: string;
  updated_at: string;
}

export interface BusStation {
  station_id: string;
  bus_id: string;
}

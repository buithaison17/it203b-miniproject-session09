export interface Station {
  id: string;
  name: string;
  image: String;
  wallpaper: string;
  descriptions: string;
  location: string;
  created_at: Date;
  updated_at: Date;
}

export interface BusStation {
  station_id: string;
  bus_id: string;
}

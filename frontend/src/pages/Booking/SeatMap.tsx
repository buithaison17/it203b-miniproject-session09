import { useState } from "react";
import SeatItem from "./Seat";
import type { Seat } from "../../interfaces/Bus";

interface Props {
  seats: Seat[];
  selectSeat: (quantity: number) => void;
}

export default function SeatMap({ seats, selectSeat }: Props) {
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const handleSeatClick = (seat: Seat) => {
    console.log(seat);

    setSelectedSeats((prev) => {
      let newSeats;

      if (prev.includes(seat.id)) {
        newSeats = prev.filter((id) => id !== seat.id);
      } else {
        newSeats = [...prev, seat.id];
      }
      selectSeat(newSeats.length);

      return newSeats;
    });
  };

  return (
    <div className="grid grid-cols-4 gap-4 p-4 bg-gray-100 rounded w-full">
      {seats.map((seat: Seat) => (
        <SeatItem
          key={seat.id}
          seat={seat}
          isSelected={selectedSeats.includes(seat.id)}
          onClick={handleSeatClick}
        />
      ))}
    </div>
  );
}

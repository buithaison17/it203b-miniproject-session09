import type { Seat } from "../../interfaces/Bus";

export default function Seat({ seat, isSelected, onClick }: any) {
  const baseStyle =
    "w-10 h-10 flex items-center justify-center rounded cursor-pointer";

  const statusStyle =
    seat.status === "booked" || seat.status === "inactive"
      ? "bg-gray-400 cursor-not-allowed"
      : isSelected
      ? "bg-green-500"
      : "bg-blue-500 hover:bg-blue-600";

  return (
    <div
      className={`${baseStyle} ${statusStyle} text-white`}
      onClick={() => seat.status === "active" && onClick(seat)}
    >
      {seat.seat_number}
    </div>
  );
}

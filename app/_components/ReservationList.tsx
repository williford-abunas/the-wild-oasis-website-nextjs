"use client";


import { ReservationCardBooking } from "../_lib/types";
import ReservationCard from "./ReservationCard";
import { useOptimistic } from "react";
import { deleteReservationAction } from "@/app/_lib/actions";


export default function ReservationList({ bookings }: { bookings: ReservationCardBooking[] }) {

  const [optimisticBookings, updateOptimisticBookings] = useOptimistic(bookings, (curBookings, bookingId) => {
    return curBookings.filter((booking) => booking.id !== bookingId);
    });

  async function handleDelete(bookingId: number) {
    updateOptimisticBookings(bookingId);
    await deleteReservationAction(bookingId);
  }

  return (
    <div>
      {optimisticBookings.map((booking) => (
        <ReservationCard key={booking.id} booking={booking} onDelete={handleDelete} />
      ))}
    </div>
  );
}
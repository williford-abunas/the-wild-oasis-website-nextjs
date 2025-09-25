import ReservationList from "@/app/_components/ReservationList";
import { auth } from "@/app/_lib/auth";
import { getBookings } from "@/app/_lib/data-service";
import { ReservationCardBooking } from "@/app/_lib/types";
import Link from "next/link";

export const metadata = {
  title: "Reservations",
};

export default async function Page() {
  const session = await auth();
  const dbBookings = await getBookings(Number(session?.user?.guestId) ?? 0);
  
  // Transform database format to component format
  const bookings: ReservationCardBooking[] = dbBookings.map(booking => ({
    id: booking.id,
    guestId: booking.guest_id,
    startDate: booking.start_date,
    endDate: booking.end_date,
    numNights: booking.number_nights,
    totalPrice: booking.total_price,
    numGuests: booking.number_guests,
    status: booking.status,
    created_at: booking.created_at,
    cabins: {
      name: booking.cabins?.name || 'Unknown Cabin',
      image: booking.cabins?.image || '/logo.png'
    }
  }));

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Your reservations
      </h2>

      {bookings.length === 0 ? (
        <p className="text-lg">
          You have no reservations yet. Check out our{" "}
          <Link className="underline text-accent-500" href="/cabins">
            luxury cabins &rarr;
          </Link>
        </p>
      ) : (
        <ReservationList bookings={bookings} />
      )}
    </div>
  );
}

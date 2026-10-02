'use client';

import { deleteBooking } from '@/app/_lib/actions';
import { useOptimistic } from 'react';
import ReservationCard from './ReservationCard';

function ReservationList({ bookings }) {
  const [optimisticBookings, optimisticDelete] = useOptimistic(
    bookings,
    (curBookings, bookingId) =>
      curBookings.filter((booking) => booking.id !== bookingId),
  );

  async function handleDelete(bookingId) {
    optimisticDelete(bookingId);
    await deleteBooking(bookingId);
  }

  return (
    <ul className="space-y-6">
      {optimisticBookings.map((booking) => (
        <ReservationCard
          key={booking.id}
          booking={booking}
          onDelete={handleDelete}
        />
      ))}
    </ul>
  );
}

export default ReservationList;

'use client';

import { deleteBooking } from '@/app/_lib/actions';
import { Booking } from '@/app/_types/bookings';
import { useOptimistic } from 'react';
import ReservationCard from './ReservationCard';

function ReservationList({ bookings }: { bookings: Partial<Booking>[] }) {
	// console.log(bookings);

	const [optimisticBookings, optimisticDelete] = useOptimistic(
		// The 1st argument is the optimistic initial state
		bookings,
		// The 2nd argument is the action (callback function)
		(curBookings: Partial<Booking>[], bookingId: number) => {
			// Takes two arguments: - ↓↓
			// , 1st is optimistic current state.
			// , 2nd is optimisticAction 1st parameter.
			return curBookings.filter((booking) => booking.id !== bookingId);
		},
	);

	async function handleDelete(bookingId: number) {
		// bookingId 1st parameter of optimisticDelete
		optimisticDelete(bookingId);
		await deleteBooking(bookingId);
	}

	return (
		<ul className="space-y-6 max-sm:space-y-0 lg:max-w-2xl xl:max-w-3xl mx-auto">
			{optimisticBookings.map((booking: Partial<Booking>) => (
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

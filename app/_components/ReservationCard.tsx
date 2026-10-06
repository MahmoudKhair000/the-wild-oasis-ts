import { Booking } from '@/app/_types/bookings';
import { PencilSquareIcon } from '@heroicons/react/24/solid';
import { format, formatDistance, isPast, isToday, parseISO } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';
import DeleteReservation from './DeleteReservation';

export const formatDistanceFromNow = (dateStr: string) =>
	formatDistance(parseISO(dateStr), new Date(), {
		addSuffix: true,
	}).replace('about ', '');

// type NonNullable<T> = T extends null | undefined ? never : T;

function ReservationCard({
	booking,
	onDelete,
}: {
	booking: Booking;
	onDelete: (bookingId: number) => void;
}) {
	// console.log(booking);
	const {
		id,
		// guestId,
		startDate,
		endDate,
		numNights,
		totalPrice,
		numGuests,
		// status,
		created_at,
		// cabins: { name, image }, // Static import
		cabins: { name, image },
	} = booking;

	return (
		<div className="flex border border-primary-800">
			<div className="relative h-32 aspect-square">
				<Image
					src={image}
					alt={`Cabin ${name}`}
					fill
					className="object-cover border-r border-primary-800"
				/>
			</div>

			<div className="grow px-6 py-3 flex flex-col">
				<div className="flex items-center justify-between">
					<h3 className="text-xl font-semibold">
						{numNights} nights in Cabin {name}
					</h3>
					{isPast(parseISO(String(startDate))) ? (
						<span className="bg-yellow-800 text-yellow-200 h-7 px-3 uppercase text-xs font-bold flex items-center rounded-sm">
							past
						</span>
					) : (
						<span className="bg-green-800 text-green-200 h-7 px-3 uppercase text-xs font-bold flex items-center rounded-sm">
							upcoming
						</span>
					)}
				</div>

				<p className="text-lg text-primary-300">
					{format(parseISO(String(startDate)), 'EEE, MMM dd yyyy')} (
					{isToday(parseISO(String(startDate)))
						? 'Today'
						: formatDistanceFromNow(String(startDate))}
					) &mdash; {format(parseISO(String(endDate)), 'EEE, MMM dd yyyy')}
				</p>

				<div className="flex gap-5 mt-auto items-baseline">
					<p className="text-xl font-semibold text-accent-400">${totalPrice}</p>
					<p className="text-primary-300">&bull;</p>
					<p className="text-lg text-primary-300">
						{numGuests} guest{numGuests! > 1 ? 's' : ''}
					</p>
					<p className="ml-auto text-sm text-primary-400">
						Booked on{' '}
						{format(new Date(String(created_at)), 'EEE, MMM dd yyyy, p')}
					</p>
				</div>
			</div>

			{!isPast(parseISO(String(startDate))) && (
				<div className="flex flex-col border-l border-primary-800 w-25">
					<Link
						href={`/account/reservations/edit/${id}`}
						className="group flex items-center gap-2 uppercase text-xs font-bold text-primary-300 border-b border-primary-800 grow px-3 hover:bg-accent-600 transition-colors hover:text-primary-900"
					>
						<PencilSquareIcon className="h-5 w-5 text-primary-600 group-hover:text-primary-800 transition-colors" />
						<span className="mt-1">Edit</span>
					</Link>

					<DeleteReservation
						onDelete={onDelete}
						bookingId={id}
					/>
				</div>
			)}
		</div>
	);
}

export default ReservationCard;

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
	booking: Partial<Booking>;
	onDelete: (bookingId: number) => void;
}) {
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
		cabins: { name = '', image = '' } = {},
	} = booking;

	return (
		<div className="w-full mx-auto h-fit flex flex-col lg:flex-row border border-primary-800 max-sm:translate-[-5%] max-md:scale-90 max-md:translate-[-2.5%]">
			<div className="relative min-h-36 max-xl:max-h-100 aspect-square lg:h-full max-lg:w-full">
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
					<span className="flex lg:flex-col">
						(
						{isToday(parseISO(String(startDate)))
							? 'Today'
							: formatDistanceFromNow(String(startDate))}
						){' '}
					</span>
					<span>
						{format(parseISO(String(startDate)), 'EEE, MMM dd yyyy')} &mdash;{' '}
						{format(parseISO(String(endDate)), 'EEE, MMM dd yyyy')}
					</span>
				</p>

				<div className="flex gap-3 mt-auto items-baseline">
					<p className="text-xl font-semibold text-accent-400">${totalPrice}</p>

					<p className="text-primary-300">&bull;</p>

					<p className="text-lg text-primary-300">
						{numGuests! > 1 ? numGuests : 'A'} guest{numGuests! > 1 ? 's' : ''}
					</p>

					<p className="ml-auto text-sm text-primary-400">
						<i className="max-xl:hidden">Booked on</i>{' '}
						{format(new Date(String(created_at)), 'EEE, MMM dd yyyy, p')}
					</p>
				</div>
			</div>

			{!isPast(parseISO(String(startDate))) && (
				<div className="flex lg:flex-col max-lg:border-t lg:border-l border-primary-800 lg:w-25 max-lg:h-22 max-lg:*:px-10">
					<Link
						href={`/account/reservations/edit/${id}`}
						className="group flex items-center gap-2 uppercase text-xs font-bold text-primary-300 lg:border-b max-lg:border-r border-primary-800 grow px-3 hover:bg-accent-600 transition-colors hover:text-primary-900"
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

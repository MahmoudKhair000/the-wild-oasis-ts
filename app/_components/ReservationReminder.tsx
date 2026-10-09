'use client';

import { XMarkIcon } from '@heroicons/react/24/solid';
import { format } from 'date-fns';
import { useReservation } from '@/app/_contexts/ReservationContext';

function ReservationReminder() {
	const { range, resetRange } = useReservation();

	if (!range.from || !range.to) return null;

	return (
		<div
			className="fixed bottom-6 z-10 mx-auto w-fit py-5 px-8 rounded-[5vw] 
				font-semibold shadow-xl flex gap-4 items-center 
				bg-accent-500 text-primary-800 shadow-slate-900 
				max-sm:text-base max-md:text-md md:text-lg"
			//
		>
			<p
				className="text-center"
				//
			>
				<span>👋</span> Don&apos;t forget to reserve your dates
				<br /> from {format(new Date(range.from), 'MMM dd yyyy')} to{' '}
				{format(new Date(range.to), 'MMM dd yyyy')}
			</p>
			<button
				className="rounded-full p-1 hover:bg-accent-600 transition-all"
				onClick={resetRange}
			>
				<XMarkIcon className="h-5 w-5" />
			</button>
		</div>
	);
}

export default ReservationReminder;

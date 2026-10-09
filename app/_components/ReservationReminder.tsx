'use client';

import { XMarkIcon } from '@heroicons/react/24/solid';
import { format } from 'date-fns';
import { useReservation } from '@/app/_contexts/ReservationContext';

function ReservationReminder() {
	const { range, resetRange } = useReservation();

	if (!range.from || !range.to) return null;

	return (
		<div
			className="fixed bottom-0 left-0 z-10 
			md:bottom-6 md:mx-auto w-dvw md:w-fit 

			md:left-1/2 md:-translate-x-1/2 
			md:justify-between

			py-5 px-5 md:rounded-[6vw] text-center
			font-semibold shadow-xl 
			flex gap-4 items-center justify-evenly 
			bg-accent-500 text-primary-800 shadow-slate-900 
			max-sm:text-base max-md:text-md md:text-lg"
			//
		>
			<p
				className="text-center w-fit md:text-sm lg:text-lg max-md:text-lg"
				//
			>
				<span>👋</span> Don&apos;t forget to reserve your dates
				<br /> from {format(new Date(range.from), 'MMM dd yyyy')} to{' '}
				{format(new Date(range.to), 'MMM dd yyyy')}
			</p>
			<button
				className="rounded-full p-2 border border-primary-800 hover:bg-accent-600 transition-all"
				onClick={resetRange}
			>
				<XMarkIcon className="h-5 w-5" />
			</button>
		</div>
	);
}

export default ReservationReminder;

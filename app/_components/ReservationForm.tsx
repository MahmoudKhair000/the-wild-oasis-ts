'use client';

import { differenceInCalendarDays, format } from 'date-fns';
import { createBooking } from '@/app/_lib/actions';
import { useReservation } from '@/app/_contexts/ReservationContext';
import Image from 'next/image';
import { useState } from 'react';
import SubmitButton from './SubmitButton';
import { Cabin } from '@/app/_types/cabins';
import { Booking } from '@/app/_types/bookings';
import { SessionUser } from '@/app/_types/users';
import { Settings } from '@/app/_types/misc';

function ReservationForm({
	cabin,
	user,
	settings,
}: {
	cabin: Partial<Cabin>;
	user: SessionUser;
	settings: Settings;
}) {
	const { range, resetRange } = useReservation();
	// console.log(range);
	const { breakfastPrice } = settings;
	const { maxCapacity, regularPrice, discount, id: cabinId } = cabin;

	const { from: startDate, to: endDate } = range;
	const numNights =
		startDate && endDate ? differenceInCalendarDays(endDate, startDate) + 1 : 0;

	const cabinPrice = (regularPrice! - discount!) * numNights;
	const [hasBreakfast, setHasBreakfast] = useState(false);
	const extrasPrice = hasBreakfast ? numNights * breakfastPrice : 0;
	const totalPrice = cabinPrice + extrasPrice;

	const bookingData: Partial<Booking> = {
		cabinId,
		startDate: startDate ? format(startDate, 'yyyy-MM-dd') : undefined,
		endDate: endDate ? format(endDate, 'yyyy-MM-dd') : undefined,
		numNights,
		cabinPrice,
		hasBreakfast,
		extrasPrice,
		totalPrice,
	};
	const createBookingWithData = createBooking.bind(null, bookingData);
	// overwriting the 1st argument of createBooking with bookingData, so that when the form is submitted, the formData will be passed as the 2nd argument to createBooking.
	// .bind(null, bookingData) means that
	// bind(thisArg, arg1, arg2, ...) creates a new function that, when called, has its this keyword set to the provided value (the first argument), with a given sequence of arguments preceding any provided when the new function is called.--
	// and formData will be passed automatically by the form submission event, as the second argument to createBookingWithData.

	return (
		<div className="scale-[1.01] flex flex-col justify-between">
			<div className="bg-primary-800 text-primary-300 px-16 py-2 flex justify-between items-center">
				<p>Logged in as</p>

				<div className="flex gap-4 items-center">
					<div className="relative w-8 h-8">
						<Image
							// Important to display google profile images
							referrerPolicy="no-referrer"
							className="h-8 rounded-full"
							fill
							src={user.image}
							alt={user.name}
						/>
					</div>
					<p>{user.name}</p>
				</div>
			</div>

			{range.from && range.to && (
				<p className="flex flex-col md:flex-row flex-wrap gap-6 justify-center items-center py-4 px-6 border border-primary-800">
					<span>{format(new Date(range.from), 'EEE MMM dd yyyy')}</span>
					<span> &mdash; </span>
					<span>{format(new Date(range.to), 'EEE MMM dd yyyy')}</span>
				</p>
			)}

			<form
				// action={createBookingWithData}
				action={async (formData) => {
					await createBookingWithData(formData);
					resetRange();
				}}
				className="bg-primary-900 py-5 px-8 lg:py-10 lg:px-16 text-lg flex gap-5 flex-col grow justify-evenly"
			>
				<div className="space-y-2">
					<label htmlFor="numGuests">How many guests?</label>
					<select
						name="numGuests"
						id="numGuests"
						className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
						required
					>
						<option
							value=""
							key=""
						>
							Select number of guests...
						</option>
						{Array.from({ length: maxCapacity ?? 0 }, (_, i) => i + 1).map(
							(x) => (
								<option
									value={x}
									key={x}
								>
									{x} {x === 1 ? 'guest' : 'guests'}
								</option>
							),
						)}
					</select>
				</div>

				<div className="space-y-2">
					<label htmlFor="observations">
						Anything we should know about your stay?
					</label>
					<textarea
						name="observations"
						id="observations"
						className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
						placeholder="Any pets, allergies, special requirements, etc.?"
					/>
				</div>

				<div className="flex gap-4 justify-between items-center">
					<input
						className="h-5 w-5 accent-accent-500"
						type="checkbox"
						name="hasBreakfast"
						id="hasBreakfast"
						checked={hasBreakfast}
						onChange={(e) => setHasBreakfast(e.target.checked)}
					/>
					<label htmlFor="hasBreakfast">
						Do you want to have breakfast these {numNights} nights?
					</label>
				</div>
				<p className="text-xl text-center bg-primary-800 p-2">
					<span>${breakfastPrice}/night</span>
					<span>, with a total of ${breakfastPrice * numNights}</span>
				</p>

				{/* *Start hidden inputs */}
				{/* <input
					type="hidden"
					name="numNights"
					value={numNights}
				/> */}
				{/* We don't have to keep doing this as we could bind an object from this component with the server action */}
				{/* Finish hidden inputs */}

				<div className="flex flex-col lg:flex-row justify-end items-center gap-6 mb-2">
					{range.from && range.to ? (
						<p className="text-accent-600 bg-primary-900 border-4 border-accent-600 bg-opacity-80 text-2xl px-3 py-2.5">
							Total price: ${totalPrice}
						</p>
					) : (
						<p className="text-primary-300 text-base">
							Start by selecting dates
						</p>
					)}

					{range.from && range.to && (
						<SubmitButton
							label={'Reserve Now'}
							pendingLabel={'Reserving...'}
						/>
					)}
				</div>
			</form>
		</div>
	);
}

export default ReservationForm;

'use client';

import {
	differenceInDays,
	isSameDay,
	isWithinInterval,
	parseISO,
} from 'date-fns';
import { DayPicker } from 'react-day-picker';
// DayPicker uses Context, this component needs to be client
import { useReservation } from '@/app/_contexts/ReservationContext';
import { ReservationRange } from '@/app/_types/bookings';
import { Cabin } from '@/app/_types/cabins';
import { Settings } from '@/app/_types/misc';
import 'react-day-picker/style.css';

function isAlreadyBooked(range: ReservationRange, datesArr: Date[]): boolean {
	return (
		!!range.from
		&& !!range.to
		&& datesArr.some((date) =>
			isWithinInterval(date, { start: range.from!, end: range.to! }),
		)
	);
}

function DateSelector({
	cabin,
	settings,
	bookedDates,
}: {
	cabin: Partial<Cabin>;
	settings: Settings;
	bookedDates: string[];
}) {
	const { range, setRange, resetRange } = useReservation();
	// console.log(range);
	// console.log(bookedDates);
	const bookedDateObjects = bookedDates.map((date) => parseISO(date));

	const now = new Date();
	const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

	const displayRange: ReservationRange = isAlreadyBooked(
		range,
		bookedDateObjects,
	)
		? { from: undefined, to: undefined }
		: range;
	console.log(displayRange);

	const { regularPrice, discount } = cabin;

	const numNights =
		range.from && range.to ? differenceInDays(range.to, range.from) + 1 : 0;
	const cabinPrice = (regularPrice! - discount!) * numNights;
	const { minBookingLength, maxBookingLength } = settings;

	return (
		<div className="flex flex-col justify-between">
			<DayPicker
				className="px-8 pt-8 place-self-center"
				// mode config
				mode="range"
				// range config
				selected={displayRange}
				onSelect={(selectedRange) =>
					setRange(
						(selectedRange ?? {
							from: undefined,
							to: undefined,
						}) as ReservationRange,
					)
				}
				// some layout config
				captionLayout="dropdown"
				// showOutsideDays
				numberOfMonths={2}
				//// min & max booking length
				min={minBookingLength}
				max={maxBookingLength}
				// Start & End Months
				today={today}
				startMonth={today}
				endMonth={new Date(now.getFullYear() + 5, 11, 31)}
				// disabling booked dates
				disabled={(currDate) =>
					currDate <= today
					|| bookedDateObjects.some((date) => isSameDay(date, currDate))
				}
				excludeDisabled

				// fromMonth={new Date()}
				// fromDate={new Date()}
				// toYear={new Date().getFullYear() + 5}
			/>

			<div className="flex items-center justify-between px-8 py-2 bg-accent-500 text-primary-800 min-h-18">
				<div className="flex flex-wrap justify-evenly items-center gap-2 lg:gap-6">
					<div className="flex gap-2 lg:gap-6 items-baseline">
						<p className="flex gap-2 items-baseline">
							{discount! > 0 ? (
								<>
									<span className="text-2xl">${regularPrice! - discount!}</span>
									<span className="line-through font-semibold text-primary-700">
										${regularPrice}
									</span>
								</>
							) : (
								<span className="text-2xl">${regularPrice}</span>
							)}
							<span className="">/night</span>
						</p>

						{numNights ? (
							<>
								<p className="bg-accent-600 px-3 py-2 text-2xl">
									<span>&times;</span> <span>{numNights ?? 1}</span>
								</p>
							</>
						) : null}
					</div>

					<div className="flex gap-2 lg:gap-6 items-baseline">
						{numNights ? (
							<>
								<p>
									<span className="text-lg font-bold uppercase">Total</span>{' '}
									<span className="text-2xl font-semibold">${cabinPrice}</span>
								</p>
							</>
						) : null}
						{range.from || range.to ? (
							<button
								className="border border-primary-800 py-2 px-4 text-sm font-semibold"
								onClick={() => resetRange()}
							>
								Clear
							</button>
						) : null}
					</div>
				</div>
			</div>
		</div>
	);
}

export default DateSelector;

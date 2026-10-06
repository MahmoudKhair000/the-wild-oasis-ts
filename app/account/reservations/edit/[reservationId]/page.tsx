import SubmitButton from '@/app/_components/SubmitButton';
import { updateBooking } from '@/app/_lib/actions';
import { getBooking, getCabin } from '@/app/_lib/data-service';

async function Page({
	params,
}: {
	params: Promise<{ reservationId?: string }>;
}) {
	// console.log(params);
	const { reservationId } = await params;
	const booking = await getBooking(Number(reservationId));
	const cabin = await getCabin(booking.cabinId);
	// console.log(booking);
	const { maxCapacity } = cabin;
	const { observations, numGuests } = booking;

	return (
		<div>
			<h2 className="font-semibold text-2xl text-accent-400 mb-7">
				Edit Reservation #{reservationId}
			</h2>
			{/* I had to extract the form in a client component
      , to use useFormStatus() hook */}
			<form
				action={updateBooking}
				className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col"
			>
				<div className="space-y-2">
					<label htmlFor="numGuests">How many guests?</label>
					<select
						name="numGuests"
						id="numGuests"
						className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
						defaultValue={numGuests}
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
						className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
						defaultValue={observations ?? ''}
						placeholder="Write down your observations.."
					/>
				</div>

				<div className="flex justify-end items-center gap-6">
					<SubmitButton label={'Update reservation'} />
				</div>
				{/* The hidden input to pass the reservationId value */}
				<input
					type="hidden"
					name="reservationId"
					value={reservationId}
				/>
			</form>
		</div>
	);
}

export default Page;

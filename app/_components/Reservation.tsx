import { getBookedDatesByCabinId, getSettings } from '@/app/_lib/data-service';
import DateSelector from './DateSelector';
import ReservationForm from './ReservationForm';
import { auth, MySession } from '@/app/_lib/auth';
import LoginMessage from './LoginMessage';
import { Cabin } from '@/app/_types/cabins';

async function Reservation({ cabin }: { cabin: Partial<Cabin> }) {
	const session = (await auth()) as MySession;

	const [settings, bookedDates] = await Promise.all([
		getSettings(),
		getBookedDatesByCabinId(cabin.id!),
	]);

	// console.log(settings);
	// console.log([settings, bookedDates]);

	return (
		<div className="grid max-[1150px]:md:grid-cols-[4fr_6fr] min-[1150px]:grid-cols-[1fr_1fr] border border-primary-800 ">
			<DateSelector
				cabin={cabin}
				settings={settings}
				bookedDates={bookedDates}
			/>
			{session?.user ? (
				<ReservationForm
					cabin={cabin}
					user={session.user}
					settings={settings}
				/>
			) : (
				<LoginMessage />
			)}
		</div>
	);
}

export default Reservation;

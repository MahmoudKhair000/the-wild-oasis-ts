import { getBookedDatesByCabinId, getSettings } from '@/app/_lib/data-service';
import DateSelector from './DateSelector';
import ReservationForm from './ReservationForm';
import { auth } from '@/app/_lib/auth';
import LoginMessage from './LoginMessage';

async function Reservation({ cabin }) {
  const session = await auth();

  const [settings, bookedDates] = await Promise.all([
    getSettings(),
    getBookedDatesByCabinId(cabin.id),
  ]);

  // console.log([settings, bookedDates]);

  return (
    <div className="grid sm:grid-cols-2 border border-primary-800 ">
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

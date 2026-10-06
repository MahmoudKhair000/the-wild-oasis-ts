import { Booking } from '@/app/_types/bookings';
import { Cabin } from '@/app/_types/cabins';
import { Countries, ID, Settings } from '@/app/_types/misc';
import { Guest } from '@/app/_types/users';
import { eachDayOfInterval, format, parseISO } from 'date-fns';
import { notFound } from 'next/navigation';
import jsonCountries from './countries.json';
import supabase from './supabase';

/////////////
// GET

export async function getCabin(id: ID): Promise<Partial<Cabin> | never> {
	const { data, error } = await supabase
		.from('cabins')
		.select('*')
		.eq('id', id)
		.single();

	// // For testing
	// await new Promise((res) => setTimeout(res, 2000));

	if (error) {
		console.error(error);
		notFound();
	}

	return data as Partial<Cabin>;
}

export async function getCabinPrice(id: ID): Promise<Partial<Cabin> | null> {
	const { data, error } =
		// : { data: Partial<Cabin>; error: Error }
		await supabase
			.from('cabins')
			.select('regularPrice, discount')
			.eq('id', id)
			.single();

	if (error) {
		console.error(error);
		return null;
	}

	return data as Cabin;
}

export async function getCabins(): Promise<Cabin[]> {
	const { data, error } = await supabase
		.from('cabins')
		.select('id, name, maxCapacity, regularPrice, discount, image')
		.order('name');

	// // For testing
	// await new Promise((res) => setTimeout(res, 2000));

	if (error) {
		console.error(error);
		throw new Error('Cabins could not be loaded');
	}

	return data as Cabin[];
}

// Guests are uniquely identified by their email address
export async function getGuest(email: string): Promise<Guest> {
	const { data /*, error*/ } = await supabase
		.from('guests')
		.select('*')
		.eq('email', email)
		.single();

	// No error here! We handle the possibility of no guest in the sign in callback
	return data as Guest;
}

export async function getBooking(id: ID): Promise<Booking> {
	const { data, error /*, count*/ } = await supabase
		.from('bookings')
		.select('*')
		.eq('id', id)
		.single();

	if (error) {
		console.error(error);
		throw new Error('Booking could not get loaded');
	}

	return data as Booking;
}

export async function getBookings(
	guestId: ID,
): Promise<Array<Partial<Booking>> | never> {
	/*, count*/
	const { data, error } = await supabase
		.from('bookings')
		// We actually also need data on the cabins as well. But let's ONLY take the data that we actually need, in order to reduce downloaded data.
		.select(
			// '*, cabins(*)'
			'id, created_at, startDate, endDate, numNights, numGuests, totalPrice, guestId, cabinId, cabins(name, image)',
		)
		.eq('guestId', guestId)
		.order('startDate');

	if (error) {
		console.error(error);
		throw new Error('Bookings could not get loaded');
	}

	return data as unknown as Booking[];
}

export async function getBookedDatesByCabinId(
	cabinId: ID,
): Promise<string[] | never> {
	const today = new Date();
	today.setUTCHours(0, 0, 0, 0);
	const todayIsoString = today.toISOString();
	// Getting all bookings
	const { data, error } = await supabase
		.from('bookings')
		.select('*')
		.eq('cabinId', cabinId)
		.or(`startDate.gte.${todayIsoString},status.eq.checked-in`);
	// // For testing
	// await new Promise((res) => setTimeout(res, 5000));
	if (error) {
		console.error(error);
		throw new Error('Bookings could not get loaded');
	}
	// Converting to actual dates to be displayed in the date picker
	const bookedDates = data
		.map((booking) => {
			return eachDayOfInterval({
				start: parseISO(booking.startDate),
				end: parseISO(booking.endDate),
			}).map((date) => format(date, 'yyyy-MM-dd'));
		})
		.flat();

	return bookedDates as string[];
}

export async function getSettings(): Promise<Settings> {
	const { data, error } = await supabase.from('settings').select('*').single();

	// // For testing
	// await new Promise((res) => setTimeout(res, 5000));

	if (error) {
		console.error(error);
		throw new Error('Settings could not be loaded');
	}

	return data as Settings;
}

export async function getCountries(): Promise<Countries> {
	try {
		const countries = jsonCountries;
		return countries as Countries;
	} catch (error) {
		console.error(error);
		throw new Error('Could not fetch countries');
	}
}

// const apiKey = process.env.REST_COUNTRIES_API_KEY;
// if (!apiKey) throw new Error('REST_COUNTRIES_API_KEY is not configured');

// const countries = [];
// let offset = 0;
// let more = true;

// while (more) {
//   const res = await fetch(
//     `https://api.restcountries.com/countries/v5?limit=100&offset=${offset}&response_fields=names.common,flag`,
//     { headers: { Authorization: `Bearer ${apiKey}` } },
//   );

//   if (!res.ok) throw new Error(`Countries API returned ${res.status}`);

//   const { data } = await res.json();
//   countries.push(
//     ...data.objects.map((country) => ({
//       name: country.names.common,
//       flag: country.flag,
//     })),
//   );

//   more = data.meta.more;
//   offset += data.meta.count;
// }

/////////////
// CREATE

export async function createGuest(newGuest: object): Promise<Guest> {
	const { data, error } = await supabase
		.from('guests')
		.insert([newGuest])
		.select('*')
		.single();

	if (error) {
		console.error(error);
		throw new Error('Guest could not be created');
	}

	return data as Guest;
}

export async function createBooking(newBooking: object): Promise<Booking> {
	const { data, error } = await supabase
		.from('bookings')
		.insert([newBooking])
		// So that the newly created object gets returned!
		.select()
		.single();

	if (error) {
		console.error(error);
		throw new Error('Booking could not be created');
	}

	return data as Booking;
}

/////////////
// UPDATE

// The updatedFields is an object which should ONLY contain the updated data

/*

export async function updateGuest(id, updatedFields) {
  const { data, error } = await supabase
    .from('guests')
    .update(updatedFields)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error('Guest could not be updated');
  }
  return data;
}

export async function updateBooking(id, updatedFields) {
  const { data, error } = await supabase
    .from('bookings')
    .update(updatedFields)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error('Booking could not be updated');
  }
  return data;
}

/////////////
// DELETE

export async function deleteBooking(id) {
  const { data, error } = await supabase.from('bookings').delete().eq('id', id);

  if (error) {
    console.error(error);
    throw new Error('Booking could not be deleted');
  }
  return data;
}

*/

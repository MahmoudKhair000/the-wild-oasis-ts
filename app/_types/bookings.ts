import type { Cabin } from './cabins';
import type { ID } from './misc';

export type ReservationRange = {
	from: Date | undefined;
	to: Date | undefined;
};

export type Booking = {
	id: ID;
	cabinId: ID;
	guestId: ID;
	created_at: string;
	startDate: string;
	endDate: string;
	numNights: number;
	numGuests: number;
	cabinPrice: number;
	extrasPrice: number;
	totalPrice: number;
	status: 'unconfirmed' | 'checked-out' | 'checked-in';
	hasBreakfast: boolean;
	isPaid: boolean;
	observations: string;
	cabins: Cabin;
};

export type Bookings = Array<Booking>;

// /** |  |  | **/

// const exampleBooking: Booking = {
// 	id: 1061,
// 	created_at: '2026-08-03T00:42:28.249+00:00',
// 	startDate: '2026-08-13',
// 	endDate: '2026-08-23',
// 	numNights: 10,
// 	numGuests: 2,
// 	cabinPrice: 2500,
// 	extrasPrice: 300,
// 	totalPrice: 2800,
// 	status: 'checked-out',
// 	hasBreakfast: true,
// 	isPaid: true,
// 	observations: 'Did Ed edit it??\r\nI, Ed, did edit it.',
// 	cabinId: 387,
// 	guestId: 1119,
// 	cabins: {
// 		id: 387,
// 		name: '001',
// 		image:
// 			'https://hrqxtwqgkuljmyfbiohl.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg',
// 		discount: 0,
// 		created_at: '2026-09-05T00:42:41.693114+00:00',
// 		description:
// 			'Discover the ultimate luxury getaway for couples in the cozy wooden cabin 001. Nestled in a picturesque forest, this stunning cabin offers a secluded and intimate retreat. Inside, enjoy modern high-quality wood interiors, a comfortable seating area, a fireplace and a fully-equipped kitchen. The plush king-size bed, dressed in fine linens guarantees a peaceful nights sleep. Relax in the spa-like shower and unwind on the private deck with hot tub.',
// 		maxCapacity: 2,
// 		regularPrice: 250,
// 	},
// };

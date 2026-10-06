export type Cabin = {
	id: number;
	created_at: string;
	name: string;
	maxCapacity: number;
	description: string;
	image: string;
	regularPrice: number;
	discount: number;
};

// /** |  |  | **/

// const exampleCabin: Cabin = {
// 	id: 387,
// 	name: '001',
// 	image:
// 		'https://hrqxtwqgkuljmyfbiohl.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg',
// 	discount: 0,
// 	created_at: '2026-09-05T00:42:41.693114+00:00',
// 	description:
// 		'Discover the ultimate luxury getaway for couples in the cozy wooden cabin 001. Nestled in a picturesque forest, this stunning cabin offers a secluded and intimate retreat. Inside, enjoy modern high-quality wood interiors, a comfortable seating area, a fireplace and a fully-equipped kitchen. The plush king-size bed, dressed in fine linens guarantees a peaceful nights sleep. Relax in the spa-like shower and unwind on the private deck with hot tub.',
// 	maxCapacity: 2,
// 	regularPrice: 250,
// };

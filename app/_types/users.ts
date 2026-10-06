export type Guest = {
	id: number;
	created_at: string;
	fullName: string;
	email: string;
	nationalID: string;
	nationality: string;
	countryFlag: string;
};

export type SessionUser = {
	name: string;
	email: string;
	image: string;
	guestId?: number;
};

export type MySession = {
	user: SessionUser;
	expires: string;
};

/** |  |  | **/
// const exampleGuest: Guest = {
// 	id: 1119,
// 	created_at: '2026-09-24T02:47:59.821969+00:00',
// 	fullName: 'Mahmoud Al-Seyyid',
// 	email: 'mahmoudkhair01010789887@gmail.com',
// 	nationalID: '30303030303030',
// 	nationality: 'Egypt',
// 	countryFlag: 'https://flags.restcountries.com/v5/svg/eg.svg',
// };

/** |  |  | **/
// const exampleSession: MySession = {
// 	user: {
// 		name: 'Mahmoud Al-Seyyid',
// 		email: 'mahmoudkhair01010789887@gmail.com',
// 		image:
// 			'https://lh3.googleusercontent.com/a/ACg8ocLn2EDBRLC1xU3bgGvp6Ou4dD5jix72Gfog5p6eHZvca8tXaRTV=s96-c',
// 		guestId: 1119,
// 	},
// 	expires: '2026-11-05T13:42:51.209Z',
// };

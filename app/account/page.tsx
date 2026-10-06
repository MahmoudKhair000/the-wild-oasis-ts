import { auth } from '@/app/_lib/auth';
import { MySession } from '@/app/_types/users';

export const metadata = {
	title: 'Guest Area',
};

export default async function Page() {
	const session = (await auth()) as MySession;
	const firstName = session.user.name.split(' ')[0];

	// console.log(session);

	return (
		<div>
			<h2 className="font-semibold text-2xl text-accent-400 mb-7">
				Welcome, {firstName}.
			</h2>
			<hr />
			<br />
			<hr />
			<br />
			<hr />
		</div>
	);
}

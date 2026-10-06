import Cabin from '@/app/_components/Cabin';
import Reservation from '@/app/_components/Reservation';
import Spinner from '@/app/_components/Spinner';
import { getCabin, getCabins } from '@/app/_lib/data-service';
import { Suspense } from 'react';

// export const metadata= {}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ cabinId: string }>;
}) {
	const { cabinId } = await params;
	const { name, description } = await getCabin(cabinId);
	return {
		title: `Cabin ${name}`,
		// And the SEO booster...
		//, the written desription content for every cabin
		description,
	};
}

export async function generateStaticParams() {
	const cabins = await getCabins();

	const ids = cabins.map((cabin) => ({ cabinId: `${cabin.id}` }));

	return ids;

	// const ids = [
	// 	{ cabinId: '387' },
	// 	{ cabinId: '388' },
	// 	{ cabinId: '389' },
	// 	{ cabinId: '390' },
	// 	{ cabinId: '391' },
	// 	{ cabinId: '392' },
	// 	{ cabinId: '393' },
	// 	{ cabinId: '394' },
	// ];
}

export default async function Page({
	params,
}: {
	params: Promise<{ cabinId: string }>;
}) {
	// first, you fetch the cabin data
	const { cabinId } = await params;
	const cabin = await getCabin(cabinId);
	// const settings = await getSettings();
	// const bookedDates = await getBookedDatesByCabinId(params.cabinId);

	// // This is a blocking waterfall, we can use Promise.all

	// console.log(params);

	return (
		<div className="max-w-6xl mx-auto mt-8">
			<Cabin cabin={cabin} />

			<div>
				<h2 className="text-5xl font-semibold text-center mb-10 text-accent-400">
					Reserve {cabin.name} today. Pay on arrival.
				</h2>
				<Suspense
					fallback={<Spinner />}
					key={cabinId}
				>
					<Reservation cabin={cabin} />
				</Suspense>
			</div>
		</div>
	);
}

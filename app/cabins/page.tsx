import CabinList from '@/app/_components/CabinList';
import Spinner from '@/app/_components/Spinner';
import Filter from '@/app/_components/Filter';
import { Suspense } from 'react';
import ReservationReminder from '@/app/_components/ReservationReminder';
// import Counter from '@/app/_components/Counter';

// // export const revalidate = 0;
// export const revalidate = 3600;
// // export const revalidate = 15;

// // searchParams make this page dynamic, so revalidate is unnecessary.

export const metadata = {
	title: 'Cabins',
};

export default async function Page({
	searchParams,
}: {
	searchParams: Promise<{ capacity?: string }>;
}) {
	// using search params turns this page to dynamic.
	// searchParams is only available here in page.js,
	// , so pass the filter to CabinList as a prop.
	const { capacity } = await searchParams;
	const filter = capacity ?? 'all';

	return (
		<div>
			<h1 className="text-4xl mb-5 text-accent-400 font-medium">
				Our Luxury Cabins
			</h1>
			<p className="text-primary-200 text-lg mb-10">
				Cozy yet luxurious cabins, located right in the heart of the Italian
				Dolomites. Imagine waking up to beautiful mountain views, spending your
				days exploring the dark forests around, or just relaxing in your private
				hot tub under the stars. Enjoy nature&apos;s beauty in your own little
				home away from home. The perfect spot for a peaceful, calm vacation.
				Welcome to paradise.
			</p>

			<div className="flex justify-end mb-8">
				<Filter />
			</div>
			{/* giving Suspense a key will force it to re-render when the filter changes, so that the fallback is shown while the new data is being fetched. Otherwise, it will just show the old data until the new data is ready. */}
			<Suspense
				fallback={<Spinner />}
				key={filter}
			>
				<CabinList filter={filter} />
				<ReservationReminder />
			</Suspense>
		</div>
	);
}

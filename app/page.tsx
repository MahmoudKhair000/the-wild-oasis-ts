import Image from 'next/image';
import Link from 'next/link';
// import Navigation from "./components/Navigation";
import bg from '@/public/bg.png';

export default function Page() {
	return (
		<main className="relative isolate flex flex-1 items-center justify-center">
			<div className="fixed inset-0 -z-10">
				<Image
					src={bg}
					className="object-cover object-top"
					placeholder="blur"
					quality={80}
					fill
					sizes="100vw"
					alt=""
				/>
			</div>

			<div className="relative z-10 text-center mt-[20dvh]">
				<h1
					className="text-4xl sm:text-6xl md:text-8xl text-primary-50 mb-10 tracking-tight font-normal"
					//
				>
					Welcome to paradise.
				</h1>
				<Link
					href="/cabins"
					className="bg-accent-500 px-8 py-6 text-primary-800 text-lg md:text-xl font-semibold hover:bg-accent-600 transition-all"
				>
					Explore luxury cabins
				</Link>
			</div>
		</main>
	);
}

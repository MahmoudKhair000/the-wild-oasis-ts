import Header from '@/app/_components/Header';
import { ReservationProvider } from '@/app/_contexts/ReservationContext';
import '@/app/_styles/globals.css';
import { Metadata } from 'next';

import { Josefin_Sans } from 'next/font/google';

const josefin = Josefin_Sans({
	subsets: ['latin'],
	display: 'swap',
});
/* {
	style: {
		fontFamily: "'__Josefin_Sans_a8383b', '__Josefin_Sans_Fallback_a8383b'",
		fontStyle: 'normal'
	},
	className: '__className_a8383b' // always changes
} */

export const metadata: Metadata = {
	// title: 'The Wild Oasis',
	title: {
		template: '%s | The Wild Oasis',
		default: 'Welcome! | The Wild Oasis',
	},
	// and for SEO, the description meta element
	// , also will be overridden if exported for any other page
	description:
		'Luxurious cabin hotel, located in the heart of the Italian Dolomites, surrounded by beautiful mountains and dark forests',
	/*
  <meta name="description" content="Luxurious cabin hotel,
  located in the heart of the Italian Dolomites,
  surrounded by beautiful mountains and dark forests"> 
  */
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
	return (
		<html>
			<body
				className={`${josefin.className} bg-primary-950 text-primary-100 min-h-screen flex flex-col antialiased`}
			>
				<Header />
				<div className="flex-1 px-8 py-12 flex">
					<main className="max-w-7xl mx-auto flex-1">
						{/* No worries at all, we're passing them as children */}
						<ReservationProvider>{children}</ReservationProvider>
					</main>
				</div>
			</body>
		</html>
	);
}

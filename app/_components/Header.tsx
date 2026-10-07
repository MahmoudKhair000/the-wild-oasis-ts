'use client';

import Logo from '@/app/_components/Logo';
import Navigation from '@/app/_components/Navigation';
import { MySession } from '@/app/_types/users';
import { Bars3Icon } from '@heroicons/react/24/outline';
import { MouseEvent, useState } from 'react';
import Menu from './Menu';

function Header({ session }: { session: MySession }) {
	const [isShown, setIsShown] = useState<boolean>(false);
	function toggleMenu(e: MouseEvent<HTMLButtonElement>): void {
		e.preventDefault();
		setIsShown((x) => !x);
	}

	return (
		<>
			{/* --md and more header */}
			<>
				<header className="border-b border-primary-900 px-8 py-5 hidden md:block">
					<div className="flex justify-between items-center max-w-7xl mx-auto gap-10">
						<Logo />
						<Navigation session={session} />
					</div>
				</header>
			</>
			{/* less than --md header */}
			<>
				<header className="border-b border-primary-900 px-8 py-5 block md:hidden">
					<div className="flex justify-between items-center max-w-7xl mx-auto gap-10">
						<Logo />
						<button
							className="z-10 text-accent-400 hover:text-accent-600 transition-colors duration-500 cursor-pointer"
							onClick={toggleMenu}
						>
							<Bars3Icon
								title="menu"
								width={60}
								// fill="white"
								// stroke="white"
								height={60}
							/>
						</button>
						{/* <Navigation /> */}
					</div>
				</header>
			</>
			{/* the overlay menu portal */}
			{isShown && (
				<Menu
					setIsShown={setIsShown}
					session={session}
				/>
			)}
		</>
	);
}

export default Header;

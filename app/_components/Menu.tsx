import { Dispatch, MouseEvent, SetStateAction } from 'react';
import { MySession } from '../_types/users';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import Image from 'next/image';
import Logo from './Logo';
import { XMarkIcon } from '@heroicons/react/24/outline';

function Menu({
	setIsShown,
	session,
}: {
	setIsShown: Dispatch<SetStateAction<boolean>>;
	session: MySession;
}) {
	//
	function handleClose(
		e: MouseEvent<HTMLDivElement | HTMLButtonElement | HTMLLIElement>,
	): void {
		e.preventDefault();

		setIsShown(false);
	}

	return createPortal(
		<>
			<div className="z-10 h-dvh w-dvw fixed bg-primary-900 opacity-80"></div>
			<div
				// title="overlay"
				className="z-11 h-dvh w-dvw fixed grid grid-rows-1 grid-cols-[fit-content_1fr]"
				onClick={handleClose}
				//
			>
				<div
					className="py-8 ps-10 pe-18 bg-primary-800 w-fit flex flex-col gap-6 relative"
					onClick={(e) => e.stopPropagation()}
				>
					<button
						className="absolute overflow-hidden top-5 right-5 p-0.5 rounded-full bg-accent-500 cursor-pointer"
						onClick={handleClose}
					>
						<XMarkIcon
							width="30"
							height="30"
						/>
					</button>

					<div
						className="w-full"
						onClick={handleClose}
					>
						<Logo />
					</div>
					<ul className="flex grow flex-col gap-2 items-start justify-center w-fit p-2 rounded-lg border-0 border-primary-500">
						<li
							className="w-full"
							onClick={handleClose}
						>
							<Link
								href="/cabins"
								className="block hover:text-accent-400 transition-colors w-full border text-xl border-primary-700 rounded-md px-4 py-2"
							>
								Cabins
							</Link>
						</li>
						<li
							className="w-full"
							onClick={handleClose}
						>
							<Link
								href="/about"
								className="block hover:text-accent-400 transition-colors w-full border text-xl border-primary-700 rounded-md px-4 py-2"
							>
								About
							</Link>
						</li>
						<li
							className="w-full mt-auto"
							onClick={handleClose}
						>
							<Link
								href="/account"
								className={`${
									session?.user?.image ? 'flex items-center gap-3' : ''
								} block hover:text-accent-400 transition-colors w-full border text-xl border-primary-700 rounded-md px-4 py-2`}
							>
								{session?.user?.image && (
									<div className="relative w-10 h-10 rounded-[9999px] overflow-hidden">
										<Image
											src={session.user.image}
											className="object-cover object-center aspect-square w-full"
											fill
											alt={session.user.name ? String(session.user.name) : ''}
										/>
									</div>
								)}
								<span>
									{/* <p
									//
									className="block whitespace-nowrap overflow-hidden text-ellipsis w-30 md:w-full"
									//
								>
								</p> */}
									{session?.user?.name ?? 'Guest area'}
								</span>
							</Link>
						</li>
					</ul>
				</div>
				{/* <div className="opacity-80 bg-primary-800 w-50"></div> */}
			</div>
		</>,
		document.body,
	);
}

export default Menu;

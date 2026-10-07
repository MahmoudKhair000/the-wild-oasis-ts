import Link from 'next/link';
import Image from 'next/image';
import { MySession } from '@/app/_types/users';

export default function Navigation({ session }: { session: MySession }) {
	// console.log(session);
	/**
{
  user: {
    name: 'Mahmoud Al-Seyyid',
    email: 'mahmoudkhair01010789887@gmail.com',
    image: 'https://lh3.googleusercontent.com/a/ACg8ocLn2EDBRLC1xU3bgGvp6Ou4dD5jix72Gfog5p6eHZvca8tXaRTV=s96-c',
    guestId: 1119
  },
  expires: '2026-10-23T23:43:06.919Z'
}
  */

	return (
		<nav className="z-10 text-xl">
			<ul className="flex gap-16 items-center">
				<li>
					<Link
						href="/cabins"
						className="hover:text-accent-400 transition-colors"
					>
						Cabins
					</Link>
				</li>
				<li>
					<Link
						href="/about"
						className="hover:text-accent-400 transition-colors"
					>
						About
					</Link>
				</li>
				<li>
					<Link
						href="/account"
						className={`${
							session?.user?.image ? 'flex items-center gap-3' : ''
						} hover:text-accent-400 transition-colors`}
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
							<p
								//
								className="block whitespace-nowrap overflow-hidden text-ellipsis w-30 ml:w-full"
								//
							>
								{session?.user?.name ?? 'Guest area'}
							</p>
						</span>
					</Link>
				</li>
			</ul>
		</nav>
	);
}

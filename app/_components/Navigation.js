import Link from 'next/link';
import { auth } from '@/app/_lib/auth';
import Image from 'next/image';

export default async function Navigation() {
  const session = await auth();
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
            className={`${session?.user?.image ? 'flex items-center gap-3' : ''
              } hover:text-accent-400 transition-colors`}
          >
            {session?.user?.image && (
              <div className="relative w-10 h-10 rounded-full overflow-hidden">
                <Image
                  src={session.user.image}
                  className="object-cover object-center aspect-square"
                  fill
                  alt={session.user.name}
                />
              </div>
            )}
            <span>{session?.user?.name ?? 'Guest area'}</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

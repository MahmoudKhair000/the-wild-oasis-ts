import Image from 'next/image';
import Link from 'next/link';

import logo from '@/public/logo.png';

function Logo() {
	return (
		<Link
			href="/"
			className="flex items-center gap-4 z-10"
		>
			{/* <Image src="/logo.png" height="60" width="60" alt="The Wild Oasis logo" /> */}
			<div className="h-15 w-15 relative">
				<Image
					src={logo}
					quality={100}
					fill
					alt="The Wild Oasis logo"
				/>
			</div>
			<span className="text-xl font-semibold text-primary-100">
				The Wild Oasis
			</span>
		</Link>
	);
}

export default Logo;

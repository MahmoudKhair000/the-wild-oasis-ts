'use client';

import { signInAction } from '@/app/_lib/actions';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';

// ({ baseUrl })
function SignInButton() {
	const searchParams = useSearchParams();
	const callbackUrl = searchParams.get('callbackUrl') ?? '/';
	// const callbackRoute = String(callbackUrl).split(`${baseUrl}`)[1];
	// console.log(callbackUrl);
	// console.log(baseUrl, callbackRoute);
	function handleSignIn() {
		signInAction(callbackUrl);
		// redirect(callbackUrl);
	}

	return (
		<form action={handleSignIn}>
			<button className="flex items-center gap-6 text-lg border border-primary-300 px-10 py-4 font-medium">
				<Image
					src="https://authjs.dev/img/providers/google.svg"
					alt="Google logo"
					height="24"
					width="24"
				/>
				<span>Continue with Google</span>
			</button>
		</form>
	);
}

export default SignInButton;

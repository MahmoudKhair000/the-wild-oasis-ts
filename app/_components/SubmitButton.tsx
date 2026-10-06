'use client';

import { useFormStatus } from 'react-dom';
import SpinnerMini from './SpinnerMini';
import { ReactNode } from 'react';

// For useFormStatus() to work
// , The whole component has to be wrapped
// , and rendered in a form element
// , like this ↓
// return (<form>
//   <SubmitButton/>
// </form>)

function SubmitButton({
	label,
	pendingLabel,
}: {
	label: string;
	pendingLabel?: string | ReactNode;
}) {
	const status = useFormStatus();
	const isPending = status?.pending;

	return (
		<button
			disabled={isPending}
			className="bg-accent-500 px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300 capitalize"
		>
			{isPending ? (
				<>
					{pendingLabel ? (
						<>{pendingLabel}</>
					) : (
						<span>
							<SpinnerMini />
						</span>
					)}
				</>
			) : (
				<>{label}</>
			)}
		</button>
	);
}

export default SubmitButton;

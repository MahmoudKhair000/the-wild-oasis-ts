'use client';
// for interactivity
import { ID } from '@/app/_types/misc';
import { TrashIcon } from '@heroicons/react/24/solid';
import { useTransition } from 'react';
import SpinnerMini from './SpinnerMini';

// async function deleteReservation() {
//   'use server';
//   // to start a server action
// }

// type NonNullable<T> = T extends null | undefined ? never : T;

function DeleteReservation({
	bookingId,
	onDelete,
}: {
	bookingId: ID | undefined;
	onDelete: (bookingId: number) => void;
}) {
	// Navigations and server actions can be marked as transitions; HTTP requests are not automatically transitions.
	const [isPending, startTransition] = useTransition();
	// we can mark a server action as a react transition
	function handleDelete() {
		if (window.confirm('Are you sure you want to delete this reservation?')) {
			startTransition(() => onDelete(Number(bookingId)));
		}
	}

	return (
		<button
			disabled={isPending}
			onClick={handleDelete}
			className="group flex items-center gap-2 uppercase text-xs font-bold text-primary-300 grow px-3 hover:bg-accent-600 transition-colors hover:text-primary-900"
		>
			{!isPending ? (
				<>
					<TrashIcon className="h-5 w-5 text-primary-600 group-hover:text-primary-800 transition-colors" />
					<span className="mt-1">Delete</span>
				</>
			) : (
				<span className="mx-auto">
					<SpinnerMini />
				</span>
			)}
		</button>
	);
}

export default DeleteReservation;

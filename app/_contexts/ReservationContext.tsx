'use client';

import { ReservationRange } from '@/app/_types/bookings';
import {
	createContext,
	useContext,
	useState,
	type Dispatch,
	type ReactNode,
	type SetStateAction,
} from 'react';

type ReservationContext = {
	range: ReservationRange;
	setRange: Dispatch<SetStateAction<ReservationRange>>;
	resetRange: () => void;
};

const initialState: ReservationRange = { from: undefined, to: undefined };

const reservationContext = createContext<ReservationContext | undefined>(
	undefined,
);

function ReservationProvider({
	children,
}: {
	children: ReactNode | undefined;
}) {
	const [range, setRange] = useState<ReservationRange>(initialState);

	function resetRange() {
		setRange(initialState);
	}

	return (
		<reservationContext.Provider value={{ range, setRange, resetRange }}>
			{children}
		</reservationContext.Provider>
	);
}

function useReservation() {
	const context = useContext(reservationContext);
	if (context == undefined)
		throw new Error('Context was used outside its provider');
	return context;
}

export { ReservationProvider, useReservation };

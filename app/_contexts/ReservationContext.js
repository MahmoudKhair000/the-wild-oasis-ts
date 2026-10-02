'use client';

import { createContext, useContext, useState } from 'react';

const reservationContext = createContext();

function ReservationProvider({ children }) {
  const initialState = { from: undefined, to: undefined };
  const [range, setRange] = useState(initialState);
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
  if (context === undefined)
    throw new Error('Context was used outside its provider');
  return context;
}

export { ReservationProvider, useReservation };

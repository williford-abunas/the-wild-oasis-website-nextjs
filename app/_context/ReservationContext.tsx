"use client";


import { createContext, useContext, useState } from "react";


export const ReservationContext = createContext<{
  range: {from: null, to: null},
  setRange: (range: {from: null, to: null}) => void,
  resetRange: () => void,
}>({
  range: {from: null, to: null},
  setRange: () => {},
  resetRange: () => {},
})

const initialState =  {from: null, to: null}

function ReservationProvider({ children }: { children: React.ReactNode }) {
  const [range, setRange] = useState(initialState);

  const resetRange = () => {
    setRange(initialState);
  };

  return <ReservationContext.Provider value={{ range, setRange, resetRange }}>{children}</ReservationContext.Provider>;
}

function useReservation() {
  const context = useContext(ReservationContext);
  if (!context) {
    throw new Error('useReservation must be used within a ReservationProvider');
  }
  return context;
}

export {ReservationProvider, useReservation};
"use client";

import { createContext, useContext, useState} from "react";

interface DateRange {
  from: Date | null;
  to: Date | null;
}

interface PricingData {
  regularPrice: number;
  discount: number;
  numNights: number;
  cabinPrice: number;
}

export const ReservationContext = createContext<{
  range: DateRange;
  setRange: (range: DateRange) => void;
  resetRange: () => void;
  clearPricingData: () => void;
  calculatePricing: (cabin: { regular_price: number; discount: number }) => PricingData;
}>({
  range: { from: null, to: null },
  setRange: () => {},
  resetRange: () => {},
  clearPricingData: () => {},
  calculatePricing: () => ({ regularPrice: 0, discount: 0, numNights: 0, cabinPrice: 0 })
});

const initialState: DateRange = { from: null, to: null };

function ReservationProvider({ children }: { children: React.ReactNode }) {
  const [range, setRange] = useState<DateRange>(initialState);

  const resetRange = () => {
    setRange(initialState);
  };

  const clearPricingData = () => {
    setRange(initialState);
  };

  const calculatePricing = (cabin: { regular_price: number; discount: number }): PricingData => {
    const regularPrice = cabin.regular_price;
    const discount = cabin.discount;
    
    let numNights = 0;
    if (range.from && range.to) {
      numNights = Math.ceil((range.to.getTime() - range.from.getTime()) / (1000 * 60 * 60 * 24));
    }
    
    const cabinPrice = numNights * (regularPrice - discount);
    
    return {
      regularPrice,
      discount,
      numNights,
      cabinPrice
    };
  };

  return (
    <ReservationContext.Provider value={{ range, setRange, resetRange, clearPricingData, calculatePricing }}>
      {children}
    </ReservationContext.Provider>
  );
}

function useReservation() {
  const context = useContext(ReservationContext);
  if (!context) {
    throw new Error('useReservation must be used within a ReservationProvider');
  }
  return context;
}

export { ReservationProvider, useReservation };
export type { DateRange, PricingData };
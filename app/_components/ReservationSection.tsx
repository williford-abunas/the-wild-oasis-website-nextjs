"use client";

import { useEffect } from "react";
import DateSelector from "./DateSelector";
import ReservationForm from "./ReservationForm";
import { Cabin } from "../_lib/types";
import { useReservation } from "../_context/ReservationContext";

export default function ReservationSection({ cabin }: { cabin: Cabin }) {
  const { range, calculatePricing, resetRange } = useReservation();
  
  // Clear any existing dates when component first loads (to prevent stale dates from previous navigation)
  useEffect(() => {
    if (range.from || range.to) {
      resetRange();
    }
  }, []); // Empty dependency array means this only runs once on mount
  
  const pricing = calculatePricing(cabin);

  return (
    <div className="border border-primary-800">
      <div className="grid grid-cols-[1.1fr_0.9fr] min-h-[400px]">
        <div className="border-r border-primary-800 h-full">
          <DateSelector />
        </div>
        <div className="h-full">
          <ReservationForm 
            cabin={cabin} 
          />
        </div>
      </div>
      <div className="border-t border-primary-800 bg-accent-500 text-primary-800 px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-6">
            <p className="flex gap-2 items-baseline">
              {pricing.discount > 0 ? (
                <>
                  <span className="text-2xl font-bold">${pricing.regularPrice - pricing.discount}</span>
                  <span className="line-through font-semibold text-primary-700">
                    ${pricing.regularPrice}
                  </span>
                </>
              ) : (
                <span className="text-2xl font-bold">${pricing.regularPrice}</span>
              )}
              <span className="text-sm">/night</span>
            </p>
            {pricing.numNights > 0 && (
              <div className="flex gap-5 items-baseline">
                <p className="bg-accent-600 px-3 py-2 text-xl rounded">
                  <span>&times;</span> <span>{pricing.numNights}</span>
                </p>
                <p>
                  <span className="text-lg font-bold uppercase">Total</span>{" "}
                  <span className="text-2xl font-semibold">${pricing.cabinPrice}</span>
                </p>
              </div>
            )}
          </div>
          <div className="flex gap-4 min-h-[40px] items-center">
            {(range.from || range.to) && (
              <button
                className="border border-primary-800 py-2 px-4 text-sm font-semibold rounded hover:bg-primary-800 hover:text-accent-400 transition-colors"
                onClick={resetRange}
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

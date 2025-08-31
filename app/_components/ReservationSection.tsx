import DateSelector from "./DateSelector";
import ReservationForm from "./ReservationForm";
import PricingDisplay from "./PricingDisplay";
import { Cabin } from "../_lib/types";

export default function ReservationSection({ cabin }: { cabin: Cabin }) {
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
      <PricingDisplay cabin={cabin} />
    </div>
  );
}

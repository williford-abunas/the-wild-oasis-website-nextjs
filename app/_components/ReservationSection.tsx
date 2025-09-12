import DateSelector from "./DateSelector";
import ReservationForm from "./ReservationForm";
import PricingDisplay from "./PricingDisplay";
import { Cabin, User } from "../_lib/types";
import { getBookedDatesByCabinId, getSettings } from "../_lib/data-service";
import { auth } from "../_lib/auth";
import LoginMessage from "./LoginMessage";

export default async function ReservationSection({ cabin }: { cabin: Cabin }) {

  const [settings, bookedDates] = await Promise.all([
    getSettings(),
    getBookedDatesByCabinId(cabin.id)
  ]);

  const session = await auth();

  return (
    <div className="border border-primary-800">
      <div className="grid grid-cols-[1.1fr_0.9fr] min-h-[400px]">
        <div className="border-r border-primary-800 h-full">
          <DateSelector settings={settings} bookedDates={bookedDates} cabin={cabin}/>
        </div>
        <div className="h-full">
          {session?.user ? <ReservationForm 
            cabin={cabin} user={session.user as User}
          /> : <LoginMessage />}
        </div>
      </div>
      <PricingDisplay cabin={cabin} />
    </div>
  );
}

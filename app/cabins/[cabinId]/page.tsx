import { EyeSlashIcon, MapPinIcon, UsersIcon } from "@heroicons/react/24/solid";
import { getCabin, getCabins } from "@/app/_lib/data-service";
import { Cabin } from "@/app/_lib/types";
import Image from "next/image";
import TextExpander from "@/app/_components/TextExpander";
import ReservationSection from "@/app/_components/ReservationSection";

type Props = {
  params: Promise<{ cabinId: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { cabinId } = await params;
  const { name } = await getCabin(Number(cabinId));

  return {
    title: `Cabin ${name}`,
  };
}

export async function generateStaticParams() {
  const cabins: Cabin[] = await getCabins();
  const ids = cabins.map((cabin) => ({ cabinId: String(cabin.id) }));

  return ids;
}

export default async function Page({ params }: Props) {
  const { cabinId } = await params;
  const cabin: Cabin = await getCabin(Number(cabinId));
  const {
    id,
    name,
    max_capacity: maxCapacity,
    regular_price: regularPrice,
    discount,
    image,
    description,
  } = cabin;

  return (
    <div className="max-w-6xl mx-auto mt-8 px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-[3fr_4fr] gap-8 lg:gap-20 border border-primary-800 py-6 lg:py-3 px-6 lg:px-10 mb-16 lg:mb-24 rounded-md">
        <div className="relative h-64 sm:h-80 lg:h-auto lg:scale-[1.15] lg:-translate-x-3 order-1 lg:order-none">
          <Image
            src={image}
            alt={`Cabin ${name}`}
            className="object-cover rounded-md"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            quality={75}
            fill
          />
        </div>

        <div className="order-2 lg:order-none">
          <h3 className="text-accent-100 font-black text-4xl sm:text-5xl lg:text-7xl mb-5 lg:translate-x-[-254px] lg:bg-primary-950 lg:p-6 lg:pb-1 lg:w-[150%] text-center lg:text-left">
            Cabin {name}
          </h3>

          <p className="text-base sm:text-lg text-primary-300 mb-8 lg:mb-10">
            <TextExpander>{description}</TextExpander>
          </p>

          <ul className="flex flex-col gap-4 mb-7">
            <li className="flex gap-3 items-center">
              <UsersIcon className="h-5 w-5 text-primary-600 flex-shrink-0" />
              <span className="text-base sm:text-lg">
                For up to <span className="font-bold">{maxCapacity}</span>{" "}
                guests
              </span>
            </li>
            <li className="flex gap-3 items-center">
              <MapPinIcon className="h-5 w-5 text-primary-600 flex-shrink-0" />
              <span className="text-base sm:text-lg">
                Located in the heart of the{" "}
                <span className="font-bold">Dolomites</span> (Italy)
              </span>
            </li>
            <li className="flex gap-3 items-center">
              <EyeSlashIcon className="h-5 w-5 text-primary-600 flex-shrink-0" />
              <span className="text-base sm:text-lg">
                Privacy <span className="font-bold">100%</span> guaranteed
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div>
        <h2 className="text-2xl sm:text-3xl lg:text-5xl font-semibold text-center px-4 mb-10 text-accent-400">
          Reserve Cabin {name} today. Pay on arrival.
        </h2>
        <ReservationSection cabin={cabin}/>
      </div>
    </div>
  );
}

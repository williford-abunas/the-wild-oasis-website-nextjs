import CabinCard from "@/app/_components/CabinCard";
import { Cabin } from "@/app/_lib/types";
import { getCabins } from "@/app/_lib/data-service";

async function CabinList({filter}: {filter: string | string[] | undefined}) {

  const cabins = await getCabins();
  console.log(cabins);

  let filteredCabins: Cabin[] = [];

  // If no filter is applied, show all cabins
  if (!filter || filter === "all") {
    filteredCabins = cabins;
  } else if (filter === "small") {
    filteredCabins = cabins.filter((cabin) => cabin.max_capacity <= 3);
  } else if (filter === "medium") {
    filteredCabins = cabins.filter((cabin) => cabin.max_capacity >= 4 && cabin.max_capacity <= 7);
  } else if (filter === "large") {
    filteredCabins = cabins.filter((cabin) => cabin.max_capacity >= 8);
  }

  if (!cabins.length) return null;

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
      {filteredCabins.map((cabin) => (
        <CabinCard cabin={cabin} key={cabin.id} />
      ))}
    </div>
  );
}

export default CabinList;

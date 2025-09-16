"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

function Button({
  children,
  handleFilter,
  filter,
  activeFilter,
}: ButtonProps) {
  return (
    <button
      onClick={() => handleFilter(filter)}
      className={`py-2 px-4 hover:bg-primary-700 ${
        filter === activeFilter ? "bg-primary-700 text-primary-50" : ""
      }`}
    >
      {children}
    </button>
  );
}

interface ButtonProps {
  children: React.ReactNode;
  handleFilter: (filter: string) => void;
  filter: string;
  activeFilter: string;
}

export default function Filter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const activeFilter = searchParams.get("capacity") ?? "all";

  function handleFilter(filter: string) {
    const params = new URLSearchParams(searchParams);
    params.set("capacity", filter);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="border border-primary-800 flex">
      <Button handleFilter={handleFilter} filter="all" activeFilter={activeFilter}>
        All Cabins
      </Button>
      <Button
        handleFilter={handleFilter}
        filter="small"
        activeFilter={activeFilter}
      >
        1&ndash;3 Guests
      </Button>
      <Button
        handleFilter={handleFilter}
        filter="medium"
        activeFilter={activeFilter}
      >
        4&ndash;7 Guests
      </Button>
      <Button
        handleFilter={handleFilter}
        filter="large"
        activeFilter={activeFilter}
      >
        8&ndash;12 Guests
      </Button>
    </div>
  );
}
import Spinner from "@/app/_components/Spinner";

export default function Loading() {
  return (
    <div className="grid items-center justify-center min-h-[200px]">
      <Spinner />
      <p className="text-primary-200">Loading cabin data...</p>
    </div>
  );
}
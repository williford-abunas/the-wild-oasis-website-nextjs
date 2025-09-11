import { NextResponse } from "next/server";
import { getCabin, getBookedDatesByCabinId } from "@/app/_lib/data-service";

export async function GET(request: Request, { params }: { params: Promise<{ cabinId: string }> }) {
  const { cabinId } = await params;

  try {
    const [cabin, bookedDates] = await Promise.all([getCabin(Number(cabinId)), getBookedDatesByCabinId(Number(cabinId))]);
    return NextResponse.json({ cabin, bookedDates });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Cabin not found" }, { status: 404 });
  }
}
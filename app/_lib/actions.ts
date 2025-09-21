"use server";

import { auth, signIn, signOut } from "@/app/_lib/auth";
import { supabase } from "./supabase";
import { revalidatePath } from "next/cache";
import { getBookings } from "./data-service";

export async function signInAction() {
  return await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  return await signOut({ redirectTo: "/" });
}

export async function updateProfileAction(formData: FormData) {
  const session = await auth();

  if (!session) throw new Error("You must be logged in to update your profile");

  const [nationality, countryFlag] = formData?.get("nationality")?.toString().split("%") || [];
  const nationalID = formData.get("nationalID");

  if (!nationalID || !/^[a-zA-Z0-9]{6,12}$/.test(nationalID.toString())) throw new Error("Please provide a valid national ID")

  const updateData = {nationality, country_flag: countryFlag, national_id: nationalID.toString()}

  const { error } = await supabase
    .from("guests")
    .update(updateData)
    .eq("id", session.user?.guestId)

  if (error) throw new Error("Failed to update profile");

  revalidatePath("/account/profile");
}

export async function deleteReservationAction(bookingId: number) {
  const session = await auth();

  if (!session) throw new Error("You must be logged in to delete a reservation");

  const guestBookings = await getBookings(Number(session.user?.guestId));
  const guestBookingIds = guestBookings.map(booking => booking.id);

  if(!guestBookingIds.includes(bookingId)) throw new Error("You are not authorized to delete this reservation");

  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error) throw new Error("Failed to delete reservation");

  revalidatePath("/account/reservations");
}
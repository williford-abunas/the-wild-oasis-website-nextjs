"use server";

import { auth, signIn, signOut } from "@/app/_lib/auth";
import { supabase } from "./supabase";
import { revalidatePath } from "next/cache";

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
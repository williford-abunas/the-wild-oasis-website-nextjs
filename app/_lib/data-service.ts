/* eslint-disable @typescript-eslint/no-unused-vars */
import { notFound } from "next/navigation";
import { eachDayOfInterval } from "date-fns";
import { supabase } from "@/app/_lib/supabase";
import {
  Cabin,
  CabinPrice,
  Guest,
  Booking,
  Settings,
  Country,
  BookingWithCabin,
  CreateGuestData,
  CreateBookingData,
  UpdateGuestData,
  UpdateBookingData,
} from "@/app/_lib/types";

/////////////
// GET

export async function getCabin(id: number): Promise<Cabin> {
  const { data, error } = await supabase
    .from("cabins")
    .select("*")
    .eq("id", id)
    .single();

  // For testing
  // await new Promise((res) => setTimeout(res, 1000));

  if (error) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error(error);
    }

    notFound();
  }

  return data;
}

export async function getCabinPrice(id: number): Promise<CabinPrice | null> {
  const { data, error } = await supabase
    .from("cabins")
    .select("regular_price, discount")
    .eq("id", id)
    .single();

  if (error) {
    if (error instanceof Error) {
      console.error("getCabinPrice error:", error.message);
    } else {
      console.error("getCabinPrice error:", error);
    }
  }

  return data;
}

export const getCabins = async function (): Promise<Cabin[]> {
  const { data, error } = await supabase
    .from("cabins")
    .select("id, name, max_capacity, regular_price, discount, image, description")
    .order("name");

  if (error) {
    if (error instanceof Error) {
      console.error("getCabins error:", error.message);
    } else {
      console.error("getCabins error:", error);
    }
    throw new Error("Cabins could not be loaded");
  }

  return data;
};

// Guests are uniquely identified by their email address
export async function getGuest(email: string): Promise<Guest | null> {
  const { data, error } = await supabase
    .from("guests")
    .select("*")
    .eq("email", email)
    .single();

  // No error here! We handle the possibility of no guest in the sign in callback
  return data;
}

export async function getBooking(id: number): Promise<Booking> {
  const { data, error, count } = await supabase
    .from("bookings")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    if (error instanceof Error) {
      console.error("getBooking error:", error.message);
    } else {
      console.error("getBooking error:", error);
    }
    throw new Error("Booking could not get loaded");
  }

  return data;
}

export async function getBookings(guestId: number): Promise<BookingWithCabin[]> {
  const { data, error, count } = await supabase
    .from("bookings")
    // We actually also need data on the cabins as well. But let's ONLY take the data that we actually need, in order to reduce downloaded data.
    .select(
      "id, created_at, start_date, end_date, number_nights, number_guests, total_price, guest_id, cabin_id, status, cabins(name, image)",
    )
    .eq("guest_id", guestId)
    .order("start_date")
    

  if (error) {
    if (error instanceof Error) {
      console.error("getBookings error:", error.message);
    } else {
      console.error("getBookings error:", error);
    }
    throw new Error("Bookings could not get loaded");
  }

  return (data || []).map(booking => ({
    ...booking,
    cabins: Array.isArray(booking.cabins) ? booking.cabins[0] : booking.cabins
  }));
}

export async function getBookedDatesByCabinId(cabinId: number): Promise<Date[]> {
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  const todayISO = today.toISOString();

  // Getting all bookings
  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .eq("cabin_id", cabinId)
    .or(`start_date.gte.${todayISO},status.eq.checked-in`);

  if (error) {
    if (error instanceof Error) {
      console.error("getBookedDatesByCabinId error:", error.message);
    } else {
      console.error("getBookedDatesByCabinId error:", error);
    }
    throw new Error("Bookings could not get loaded");
  }

  // Converting to actual dates to be displayed in the date picker
  const bookedDates = data
    .map((booking) => {
      return eachDayOfInterval({
        start: new Date(booking.start_date),
        end: new Date(booking.end_date),
      });
    })
    .flat();

  return bookedDates;
}

export async function getSettings(): Promise<Settings> {
  const { data, error } = await supabase.from("settings").select("*").single();

  if (error) {
    if (error instanceof Error) {
      console.error("getSettings error:", error.message);
    } else {
      console.error("getSettings error:", error);
    }
    throw new Error("Settings could not be loaded");
  }

  return data;
}

export async function getCountries(): Promise<Country[]> {
  try {
    const res = await fetch(
      "https://restcountries.com/v2/all?fields=name,flag",
      {
        cache: 'no-store' // Disable caching to ensure fresh data
      }
    );
    const countries = await res.json();
    return countries;
  } catch {
    throw new Error("Could not fetch countries");
  }
}

/////////////
// CREATE

export async function createGuest(newGuest: CreateGuestData): Promise<Guest[]> {
  const { data, error } = await supabase.from("guests").insert([newGuest]);

  if (error) {
    if (error instanceof Error) {
      console.error("createGuest error:", error.message);
    } else {
      console.error("createGuest error:", error);
    }
    throw new Error("Guest could not be created");
  }

  return data || [];
}

export async function createBooking(newBooking: CreateBookingData): Promise<Booking> {
  const { data, error } = await supabase
    .from("bookings")
    .insert([newBooking])
    // So that the newly created object gets returned!
    .select()
    .single();

  if (error) {
    if (error instanceof Error) {
      console.error("createBooking error:", error.message);
    } else {
      console.error("createBooking error:", error);
    }
    throw new Error("Booking could not be created");
  }

  return data;
}

/////////////
// UPDATE

// The updatedFields is an object which should ONLY contain the updated data
export async function updateGuest(id: number, updatedFields: UpdateGuestData): Promise<Guest> {
  const { data, error } = await supabase
    .from("guests")
    .update(updatedFields)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    if (error instanceof Error) {
      console.error("updateGuest error:", error.message);
    } else {
      console.error("updateGuest error:", error);
    }
    throw new Error("Guest could not be updated");
  }
  return data;
}

export async function updateBooking(id: number, updatedFields: UpdateBookingData): Promise<Booking> {
  const { data, error } = await supabase
    .from("bookings")
    .update(updatedFields)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    if (error instanceof Error) {
      console.error("updateBooking error:", error.message);
    } else {
      console.error("updateBooking error:", error);
    }
    throw new Error("Booking could not be updated");
  }
  return data;
}

/////////////
// DELETE

export async function deleteBooking(id: number): Promise<{ id: number } | null> {
  const { data, error } = await supabase.from("bookings").delete().eq("id", id);

  if (error) {
    if (error instanceof Error) {
      console.error("deleteBooking error:", error.message);
    } else {
      console.error("deleteBooking error:", error);
    }
    throw new Error("Booking could not be deleted");
  }
  return data;
}

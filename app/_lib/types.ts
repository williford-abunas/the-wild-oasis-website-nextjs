// Data model types for The Wild Oasis application

export interface Cabin {
  id: number;
  name: string;
  max_capacity: number;
  regular_price: number;
  discount: number;
  image: string;
  description: string;
}

export interface CabinPrice {
  regular_price: number;
  discount: number;
}

export interface Guest {
  id: number;
  email: string;
  full_name: string;
  national_id: string;
  nationality: string;
  country_flag: string;
}

export interface Booking {
  id: number;
  created_at: string;
  start_date: string;
  end_date: string;
  number_nights: number;
  number_guests: number;
  total_price: number;
  guest_id: number;
  cabin_id: number;
  status: string;
}

export interface Settings {
  id: number;
  min_booking_length: number;
  max_booking_length: number;
  max_guests_per_booking: number;
  breakfast_price: number;
}

export interface Country {
  name: string;
  flag: string;
}

// Extended types for specific use cases
export interface BookingWithCabin {
  id: number;
  created_at: string;
  start_date: string;
  end_date: string;
  number_nights: number;
  number_guests: number;
  total_price: number;
  guest_id: number;
  cabin_id: number;
  cabins: { name: string; image: string }[];
}

// Type for ReservationCard component (matches the existing structure)
export interface ReservationCardBooking {
  id: number;
  guestId: number;
  startDate: string;
  endDate: string;
  numNights: number;
  totalPrice: number;
  numGuests: number;
  status: string;
  created_at: string;
  cabins: {
    name: string;
    image: string;
  };
}

// Utility types for creating new records
export type CreateGuestData = {
  email: string;
  full_name: string;
  national_id?: string;
  nationality?: string;
  country_flag?: string;
};
export type CreateBookingData = Omit<Booking, 'id' | 'created_at'>;

// Partial types for updates
export type UpdateGuestData = Partial<Guest>;
export type UpdateBookingData = Partial<Booking>;

export type User = {
  id: string;
  name: string;
  email: string;
  image: string;
};

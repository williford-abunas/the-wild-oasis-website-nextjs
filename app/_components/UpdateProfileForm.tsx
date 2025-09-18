"use client";


import Image from "next/image";
import { Guest } from "@/app/_lib/types";
import { updateProfileAction } from "../_lib/actions";
import SubmitButton from "./SubmitButton";


export default function UpdateProfileForm({children, guest}: {children: React.ReactNode, guest: Guest}) {


  return <form action={updateProfileAction} className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col">
  <div className="space-y-2">
    <label>Full name</label>
    <input
      disabled
      id="fullName"
      className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
      defaultValue={guest?.full_name}
      name="fullName"
      type="text"
    />
  </div>

  <div className="space-y-2">
    <label>Email address</label>
    <input
      disabled
      className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
      defaultValue={guest?.email}
      name="email"
      type="email"
    />
  </div>

  <div className="space-y-2">
    <div className="flex items-center justify-between">
      <label htmlFor="nationality">Where are you from?</label>
      {guest?.country_flag && (
        <Image
          src={guest.country_flag}
          alt="Country flag"
          width={20}
          height={20}
          className="h-5 rounded-sm"
        />
      )}
    </div>

    {children}
  </div>

  <div className="space-y-2">
    <label htmlFor="nationalID">National ID number</label>
    <input
      name="nationalID"
      id="nationalID"
      className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
      defaultValue={guest?.national_id}
      type="text"
    />
  </div>

  <div className="flex justify-end items-center gap-6">
    <SubmitButton loadingText="Updating...">
      Update profile
    </SubmitButton>
  </div>
</form>
}
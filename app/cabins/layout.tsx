import React from "react";
import Header from "@/app/_components/Header";
import { ReservationProvider } from "@/app/_context/ReservationContext";

type ChildrenProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: ChildrenProps) {
  return (
    <ReservationProvider>
      <Header showBorder={true} />
      <div className="flex-1 px-8 py-12 grid">
        <main className="max-w-7xl mx-auto w-full">{children}</main>
      </div>
    </ReservationProvider>
  );
}

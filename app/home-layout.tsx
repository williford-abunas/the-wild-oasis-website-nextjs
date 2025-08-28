import React from "react";
import Header from "@/app/_components/Header";

type ChildrenProps = {
  children: React.ReactNode;
};

export default function HomeLayout({ children }: ChildrenProps) {
  return (
    <>
      <Header showBorder={false} />
      <div className="flex-1 px-8 py-12 grid">
        <main className="max-w-7xl mx-auto w-full">{children}</main>
      </div>
    </>
  );
}

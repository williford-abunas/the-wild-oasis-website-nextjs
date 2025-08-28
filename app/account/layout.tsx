import React from "react";
import Header from "@/app/_components/Header";
import SideNavigation from "@/app/_components/SideNavigation";

type ChildrenProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: ChildrenProps) {
  return (
    <>
      <Header showBorder={true} />
      <div className="flex-1 px-8 py-12 grid">
        <main className="max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-[16rem_1fr] h-full gap-12">
            <SideNavigation />
            <div className="py-1">{children}</div>
          </div>
        </main>
      </div>
    </>
  );
}

import React from "react";
import Header from "@/app/_components/Header";

type ChildrenProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: ChildrenProps) {
  return (
    <>
      <Header showBorder={true} />
      <div className="flex-1 px-8 py-12 grid">
        <main className="max-w-7xl mx-auto w-full">{children}</main>
      </div>
    </>
  );
}

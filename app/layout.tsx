import type { Metadata } from "next";
import "@/app/_styles/globals.css";

import { Josefin_Sans } from "next/font/google";

const josefinSans = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | The Wild Oasis",
    default: "Welcome / The Wild Oasis",
  },
  description: "The Wild Oasis is a cabin rental company in the mountains of Colorado.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${josefinSans.className} antialiased bg-primary-950 text-primary-50 min-h-screen flex flex-col`}>
       {children}
      </body>
    </html>
  );
}

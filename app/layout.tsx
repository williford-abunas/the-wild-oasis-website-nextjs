import type { Metadata } from "next";
import Navigation from "./components/Navigation";
import Logo from "./components/Logo";

export const metadata: Metadata = {
  title: "The Wild Oasis",
  description: "The Wild Oasis is a cabin rental company in the mountains of Colorado.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      >
        <header>
          <Logo />
          <Navigation />
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}

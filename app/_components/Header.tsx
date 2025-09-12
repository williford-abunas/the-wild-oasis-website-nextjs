import Navigation from "@/app/_components/Navigation";
import Logo from "@/app/_components/Logo";
import MobileMenu from "@/app/_components/MobileMenu";
import { auth } from "@/app/_lib/auth";

interface HeaderProps {
  showBorder?: boolean;
}

export default async function Header({ showBorder = true }: HeaderProps) {
  const session = await auth();

  return (
      <header className={`relative z-50 px-4 sm:px-6 lg:px-8 py-3 sm:py-4 lg:py-5 ${showBorder ? 'border-b border-primary-900' : ''}`}>
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <Logo />
        
        {/* Desktop Navigation */}
        <div className="hidden sm:block">
          <Navigation session={session} />
        </div>

        {/* Mobile Menu */}
        <MobileMenu session={session} />
      </div>
    </header>
  );
}

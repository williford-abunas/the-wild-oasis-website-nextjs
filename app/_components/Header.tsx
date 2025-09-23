import Navigation from "@/app/_components/Navigation";
import Logo from "@/app/_components/Logo";
import MobileMenu from "@/app/_components/MobileMenu";
import { auth } from "@/app/_lib/auth";

interface HeaderProps {
  showBorder?: boolean;
  session?: any; // Optional session prop for Client Component usage
}

export default async function Header({ showBorder = true, session }: HeaderProps) {
  // Only fetch session on server if not provided
  const sessionData = session || await auth();

  return (
      <header className={`relative z-50 px-4 sm:px-6 lg:px-8 py-3 sm:py-4 lg:py-5 ${showBorder ? 'border-b border-primary-900' : ''}`}>
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <Logo />
        
        {/* Desktop Navigation */}
        <div className="hidden sm:block">
          <Navigation session={sessionData} />
        </div>

        {/* Mobile Menu */}
        <MobileMenu session={sessionData} />
      </div>
    </header>
  );
}

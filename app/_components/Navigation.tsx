import Link from "next/link";
import Image from "next/image";
import { UserIcon } from "@heroicons/react/24/solid";

interface NavigationProps {
  isMobile?: boolean;
  onClose?: () => void;
  session?: {
    user?: {
      image?: string | null;
    };
  } | null;
}

export default function Navigation({ isMobile = false, onClose, session }: NavigationProps) {
  
  const handleLinkClick = () => {
    if (isMobile && onClose) {
      onClose();
    }
  };

  if (isMobile) {
    return (
      <nav className="relative z-50 text-lg">
        <ul className="flex flex-col py-4 space-y-4">
          <li>
            <Link
              href="/cabins"
              className="block px-4 py-2 hover:text-accent-400 hover:bg-primary-800 transition-colors"
              onClick={handleLinkClick}
            >
              Cabins
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className="block px-4 py-2 hover:text-accent-400 hover:bg-primary-800 transition-colors"
              onClick={handleLinkClick}
            >
              About
            </Link>
          </li>
        <li>
          <Link
            href="/account"
            className="flex items-center gap-2 px-4 py-2 hover:text-accent-400 hover:bg-primary-800 transition-colors"
            onClick={handleLinkClick}
          >
            {session?.user?.image ? (
              <Image 
                src={session.user.image} 
                alt="User avatar" 
                width={20} 
                height={20}
                className="rounded-full"
              />
            ) : (
              <UserIcon className="h-5 w-5 text-primary-600" />
            )}
            <span>Guest area</span>
          </Link>
        </li>
        </ul>
      </nav>
    );
  }

  return (
    <nav className="relative z-50 text-xl">
      <ul className="flex gap-16 items-center">
        <li>
          <Link
            href="/cabins"
            className="text-primary-50 hover:text-accent-400 transition-colors font-medium"
          >
            Cabins
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className="text-primary-50 hover:text-accent-400 transition-colors font-medium"
          >
            About
          </Link>
        </li>
        <li>
          <Link
            href="/account"
            className="flex items-center gap-2 text-primary-50 hover:text-accent-400 transition-colors font-medium"
          >
            {session?.user?.image ? (
              <Image 
                src={session.user.image} 
                alt="User avatar" 
                width={24} 
                height={24}
                className="rounded-full"
              />
            ) : (
              <UserIcon className="h-6 w-6 text-primary-400" />
            )}
            <span>Guest area</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

import Link from "next/link";

interface NavigationProps {
  isMobile?: boolean;
  onClose?: () => void;
}

export default function Navigation({ isMobile = false, onClose }: NavigationProps) {
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
              className="block px-4 py-2 hover:text-accent-400 hover:bg-primary-800 transition-colors"
              onClick={handleLinkClick}
            >
              Guest area
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
            className="text-primary-50 hover:text-accent-400 transition-colors font-medium"
          >
            Guest area
          </Link>
        </li>
      </ul>
    </nav>
  );
}

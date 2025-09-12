"use client";

import { useState } from "react";
import Navigation from "@/app/_components/Navigation";

interface MobileMenuProps {
  session?: {
    user?: {
      image?: string | null;
    };
  } | null;
}

export default function MobileMenu({ session }: MobileMenuProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      {/* Mobile Hamburger Button */}
      <button
        onClick={toggleMenu}
        className="sm:hidden p-2 text-primary-100 hover:text-accent-400 transition-colors"
        aria-label="Toggle navigation menu"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          {isMenuOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="sm:hidden border-t border-primary-800 bg-primary-950 relative z-40">
          <Navigation isMobile={true} onClose={() => setIsMenuOpen(false)} session={session} />
        </div>
      )}
    </>
  );
}

"use client";

import { useState } from "react";
import Navigation from "@/app/_components/Navigation";
import Logo from "@/app/_components/Logo";

interface HeaderProps {
  showBorder?: boolean;
}

function Header({ showBorder = true }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
      <header className={`relative z-50 px-4 sm:px-6 lg:px-8 py-3 sm:py-4 lg:py-5 ${showBorder ? 'border-b border-primary-900' : ''}`}>
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <Logo />
        
        {/* Desktop Navigation */}
        <div className="hidden sm:block">
          <Navigation />
        </div>

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
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
          <div className="sm:hidden border-t border-primary-800 bg-primary-950 relative z-40">
          <Navigation isMobile={true} onClose={() => setIsMenuOpen(false)} />
        </div>
      )}
    </header>
  );
}

export default Header;

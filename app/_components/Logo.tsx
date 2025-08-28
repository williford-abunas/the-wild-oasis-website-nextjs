import Image from "next/image";
import Link from "next/link";

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 sm:gap-3 lg:gap-4 z-10">
      <Image 
        src="/logo.png" 
        priority={false} 
        height="40" 
        width="40" 
        className="w-8 h-8 sm:w-10 sm:h-10 lg:w-[60px] lg:h-[60px]"
        quality={75} 
        alt="The Wild Oasis logo" 
      />
      <span className="text-lg sm:text-xl font-semibold text-primary-100">
        The Wild Oasis
      </span>
    </Link>
  );
}

export default Logo;

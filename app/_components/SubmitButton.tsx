"use client";

import { useFormStatus } from "react-dom";

interface SubmitButtonProps {
  children: React.ReactNode;
  loadingText?: string;
  className?: string;
}

export default function SubmitButton({ 
  children, 
  loadingText, 
  className = "bg-accent-500 px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300" 
}: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button 
      type="submit" 
      disabled={pending}
      className={className}
    >
      {pending ? (loadingText || "Loading...") : children}
    </button>
  );
}

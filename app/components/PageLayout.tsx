import type { ReactNode } from "react";
import Navigation from "./Navigation";

interface PageLayoutProps {
  children: ReactNode;
  className?: string;
}

export default function PageLayout({ children, className = "" }: PageLayoutProps) {
  return (
    <div className={`min-h-screen w-full max-w-full bg-primary-bg text-primary-text ${className}`}>
      <Navigation />
      <main className="w-full">
        {children}
      </main>
    </div>
  );
}


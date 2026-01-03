"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: "About", href: "/#about" },
  { label: "Videos", href: "/videos" },
  { label: "Events", href: "/events" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/#contact" },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const scrollToElement = useCallback((targetId: string) => {
    const element = document.getElementById(targetId);
    if (element) {
      const navHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height')) || 72;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - navHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  }, []);

  useEffect(() => {
    if (pathname === "/" && window.location.hash) {
      const targetId = window.location.hash.replace("#", "");
      setTimeout(() => {
        scrollToElement(targetId);
      }, 100);
    }
  }, [pathname, scrollToElement]);

  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setIsOpen(false);

    const isHashLink = href.startsWith("/#") || href.startsWith("#");
    
    if (!isHashLink) {
      return;
    }

    const targetId = href.replace("/#", "").replace("#", "");
    const isHomePage = pathname === "/";

    if (isHomePage) {
      e.preventDefault();
      scrollToElement(targetId);
    }
  }, [pathname, scrollToElement]);

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        isOpen
          ? "bg-primary-bg"
          : scrolled
            ? "bg-secondary-bg/95 shadow-sm backdrop-blur-md"
            : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-[var(--nav-height)] max-w-7xl items-center justify-between px-6 lg:px-8">
        <Link
          href="/"
          className="font-serif text-2xl font-semibold tracking-tight text-primary-text transition-colors duration-200 hover:text-primary-text-hover"
        >
          Yogi Blevins
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="group relative px-4 py-2 text-sm font-medium tracking-wide text-primary-text transition-colors duration-200 hover:text-primary-text-hover"
              >
                {item.label}
                <span className="absolute bottom-0 left-1/2 h-0.5 w-0 -translate-x-1/2 bg-accent transition-all duration-300 group-hover:w-3/4" />
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-lg text-primary-text transition-colors duration-200 hover:bg-accent/20 md:hidden"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
        >
          <span
            className={`h-0.5 w-5 rounded-full bg-current transition-all duration-300 ${
              isOpen ? "translate-y-2 rotate-45" : ""
            }`}
          />
          <span
            className={`h-0.5 w-5 rounded-full bg-current transition-all duration-300 ${
              isOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`h-0.5 w-5 rounded-full bg-current transition-all duration-300 ${
              isOpen ? "-translate-y-2 -rotate-45" : ""
            }`}
          />
        </button>
      </nav>

      <div
        className={`fixed inset-0 z-40 bg-primary-bg transition-all duration-500 md:hidden ${
          isOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        <div className="flex h-full flex-col items-center justify-center">
          <ul className="flex flex-col items-center gap-8">
            {navItems.map((item, index) => (
              <li
                key={item.href}
                className={`transition-all duration-500 ${
                  isOpen
                    ? "translate-y-0 opacity-100"
                    : "translate-y-4 opacity-0"
                }`}
                style={{
                  transitionDelay: isOpen ? `${index * 75 + 100}ms` : "0ms",
                }}
              >
                <a
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="group relative font-serif text-3xl font-medium tracking-wide text-primary-text transition-colors duration-200 hover:text-primary-text-hover"
                >
                  {item.label}
                  <span className="absolute -bottom-2 left-0 h-0.5 w-0 bg-accent transition-all duration-300 group-hover:w-full" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
}


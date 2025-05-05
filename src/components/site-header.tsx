"use client";

import Link from "next/link";
import { ModeToggle } from "./mode-toggle";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";

export function SiteHeader() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const routes = [
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
    { href: "/privacy", label: "Privacy" },
  ];

  const handleLinkClick = () => {
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="border-b bg-background">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="logo-container">
          <div className="logo-wrap">
            <Link
              className="hover-target relative flex items-center text-xl font-extrabold"
              href="/"
              onClick={handleLinkClick}
            >
              <span
                className="relative flex"
                style={{
                  textShadow: "rgba(138, 75, 255, 0.2) 0px 1px 3px",
                  transform: "translateZ(0px)",
                }}
              >
                <span
                  className="absolute left-0 top-0 translate-x-[1px] translate-y-[1px] select-none text-xl text-muted-foreground/10"
                  style={{ WebkitTextStroke: "1px rgba(0, 0, 0, 0.05)" }}
                >
                  CAVCOUNT
                </span>
                <span className="bg-gradient-to-r from-primary to-violet-600 bg-clip-text text-transparent">
                  CAV
                </span>
                <span className="text-foreground">COUNT</span>
              </span>
            </Link>
          </div>
        </div>

        <div className="header-right flex items-center space-x-4">
          <nav className="nav-menu space-x-4 hidden md:block">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "hover:text-primary",
                  pathname === route.href ? "text-primary" : ""
                )}
              >
                {route.label}
              </Link>
            ))}
          </nav>

          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="p-2 hover:text-primary md:hidden"
              >
                <Menu />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col space-y-4 mt-8">
                <Link
                  href="/"
                  className={cn(
                    "hover:text-primary block py-2 font-bold",
                    pathname === "/" ? "text-primary" : ""
                  )}
                  onClick={handleLinkClick}
                >
                  Home
                </Link>
                {routes.map((route) => (
                  <Link
                    key={route.href}
                    href={route.href}
                    className={cn(
                      "hover:text-primary block py-2",
                      pathname === route.href ? "text-primary" : ""
                    )}
                    onClick={handleLinkClick}
                  >
                    {route.label}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>

          <div className="theme-switch-wrapper">
            <ModeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}

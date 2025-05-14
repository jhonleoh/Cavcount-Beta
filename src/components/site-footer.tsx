"use client";

import Link from "next/link";
import { Facebook, Heart } from "lucide-react";
import { SponsoredLogo } from "./sponsored-logo";

export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-background">
      {/* Main container: py-6 for consistent padding, items-center for mobile, md:justify-between for desktop */}
      <div className="container mx-auto flex flex-col items-center gap-6 py-6 md:flex-row md:justify-between md:gap-4 md:py-8">

        {/* Copyright - order-3 on mobile to push to bottom, md:order-1 for desktop left */}
        <div className="order-3 text-center md:order-1 md:text-left">
          <p className="text-sm leading-loose text-muted-foreground">
            © {currentYear} CavCount. All rights reserved.
          </p>
        </div>

        {/* Navigation & Made by - order-1 on mobile, md:order-2 for desktop center/right */}
        {/* items-center and gap-4 for mobile stacking, md:flex-row for desktop layout */}
        <div className="order-1 flex flex-col items-center gap-4 md:order-2 md:flex-row md:gap-6">
          <nav className="flex flex-wrap justify-center gap-4 text-sm font-medium md:gap-6">
            <Link
              href="https://facebook.com/Cavcount"
              className="text-muted-foreground transition-colors hover:text-foreground"
              aria-label="Facebook"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Facebook className="h-5 w-5" />
              <span className="sr-only">Facebook</span>
            </Link>
            <Link
              href="https://www.buymeacoffee.com/cavcount"
              className="bmc-button text-muted-foreground transition-colors hover:text-foreground flex items-center"
              aria-label="Buy Me A Coffee"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="text-xs sm:text-sm">Buy Me A Coffee</span>
            </Link>
          </nav>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <span>Made with</span>
            <Heart className="h-4 w-4 fill-current text-red-500" />
            <span>by Leo</span>
          </div>
        </div>

        {/* Sponsored Logo - order-2 on mobile, md:order-3 for desktop right */}
        {/* w-full and flex justify-center for mobile to allow logo's internal centering/start to work */}
        {/* md:w-auto to allow it to shrink to content size on desktop */}
        <div className="order-2 w-full md:order-3 md:w-auto flex justify-center md:justify-end">
          <SponsoredLogo />
        </div>

      </div>
    </footer>
  );
}

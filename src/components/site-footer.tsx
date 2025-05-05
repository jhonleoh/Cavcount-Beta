"use client";

import Link from "next/link";
import { Facebook, Heart } from "lucide-react";

export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-background">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © {currentYear} CavCount. All rights reserved.
          </p>
        </div>
        <div className="flex items-center">
          <nav className="flex items-center gap-4 text-sm font-medium">
            <Link
              href="https://facebook.com/Cavcount"
              className="text-muted-foreground transition-colors hover:text-foreground flex items-center"
              aria-label="Facebook"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Facebook className="h-4 w-4" />
              <span className="sr-only">Facebook</span>
            </Link>
            <Link
              href="https://www.buymeacoffee.com/cavcount"
              className="bmc-button text-muted-foreground transition-colors hover:text-foreground flex items-center"
              aria-label="Buy Me A Coffee"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>Buy Me A Coffee</span>
            </Link>
            <div className="flex items-center gap-1 text-muted-foreground">
              <span>Made with</span>
              <Heart className="h-4 w-4 fill-current text-red-500" />
              <span>by Leo</span>
            </div>
          </nav>
        </div>
      </div>
    </footer>
  );
}

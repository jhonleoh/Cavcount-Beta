"use client"

import Link from "next/link"
import { Github, Heart } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t bg-background">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            &copy; {currentYear} CavCount. All rights reserved.
          </p>
        </div>
        <div className="flex items-center">
          <nav className="flex items-center gap-4 text-sm font-medium">
            <Link
              href="/about"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Contact
            </Link>
            <Link
              href="/privacy"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Privacy
            </Link>
            <a
              href="https://github.com/naptha/tesseract.js"
              target="_blank"
              rel="noreferrer"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              <Github className="h-4 w-4" />
              <span className="sr-only">GitHub</span>
            </a>
            <div className="flex items-center gap-1 text-muted-foreground">
              <span>Made with</span>
              <Heart className="h-4 w-4 text-red-500" />
              <span>by Leo</span>
            </div>
          </nav>
        </div>
      </div>
    </footer>
  )
}

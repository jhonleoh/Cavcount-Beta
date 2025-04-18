"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { ThemeSwitch } from "@/components/theme-switch"
import { useState } from "react"
import { Menu } from "lucide-react"

export function Navbar() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <header className="border-b bg-background">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="logo-container">
          <div className="logo-wrap">
            <Link href="/" className="hover-target relative flex items-center text-xl font-extrabold">
              <span
                className="relative flex"
                style={{
                  textShadow: "0 1px 3px rgba(138, 75, 255, 0.2)",
                  transform: "translateZ(0)",
                  WebkitTransform: "translateZ(0)",
                }}
              >
                <span
                  className="absolute left-0 top-0 translate-x-[1px] translate-y-[1px] select-none text-xl text-muted-foreground/10"
                  style={{
                    WebkitTextStroke: "1px rgba(0,0,0,0.05)",
                  }}
                >
                  CAVCOUNT
                </span>
                <span className="bg-gradient-to-r from-primary to-violet-600 bg-clip-text text-transparent">
                  CAV
                </span>
                <span className="text-foreground">
                  COUNT
                </span>
              </span>
            </Link>
          </div>
        </div>

        <div className="header-right flex items-center space-x-4">
          <nav className="nav-menu space-x-4 hidden md:block">
            <Link
              href="/about"
              className={cn("hover:text-primary", {
                "text-primary": pathname === "/about",
              })}
            >
              About
            </Link>
            <Link
              href="/contact"
              className={cn("hover:text-primary", {
                "text-primary": pathname === "/contact",
              })}
            >
              Contact
            </Link>
            <Link
              href="/privacy"
              className={cn("hover:text-primary", {
                "text-primary": pathname === "/privacy",
              })}
            >
              Privacy
            </Link>
          </nav>

          <button
            className="p-2 hover:text-primary md:hidden"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            <Menu size={20} />
          </button>

          <div className="theme-switch-wrapper">
            <ThemeSwitch />
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <div className="container py-3">
            <Link
              href="/about"
              className={cn("block py-2 hover:text-primary", {
                "text-primary": pathname === "/about",
              })}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/contact"
              className={cn("block py-2 hover:text-primary", {
                "text-primary": pathname === "/contact",
              })}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </Link>
            <Link
              href="/privacy"
              className={cn("block py-2 hover:text-primary", {
                "text-primary": pathname === "/privacy",
              })}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Privacy
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}

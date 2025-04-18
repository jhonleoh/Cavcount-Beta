"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { ThemeSwitch } from "@/components/theme-switch"

export function Navbar() {
  const pathname = usePathname()

  return (
    <header className="border-b bg-background">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="logo-container">
          <div className="logo-wrap">
            <Link href="/" className="hover-target relative flex items-center text-xl font-extrabold">
              <span
                className="relative bg-gradient-to-r from-primary to-violet-600 bg-clip-text text-transparent"
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
                CAVCOUNT
              </span>
            </Link>
          </div>
        </div>
        <div className="header-right flex items-center space-x-4">
          <nav className="nav-menu space-x-4">
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
          <div className="theme-switch-wrapper">
            <ThemeSwitch />
          </div>
        </div>
      </div>
    </header>
  )
}

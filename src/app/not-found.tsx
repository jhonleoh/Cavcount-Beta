"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { useTheme } from "next-themes"

export default function NotFound() {
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'

  // Handle mounting to prevent hydration mismatch with theme
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <div className="container max-w-lg px-4 py-12 flex flex-col items-center justify-center">
        {/* 3D-like CSS 404 */}
        <div className="relative mb-10 w-full flex justify-center">
          <div className="flex items-center justify-center gap-2 sm:gap-4">
            {/* First 4 */}
            <div
              className="text-7xl sm:text-8xl md:text-9xl font-bold relative transform hover:scale-105 transition-transform duration-300"
              style={{
                textShadow: isDark
                  ? '0 0 1px #a78bfa, 0 0 3px #a78bfa, 2px 2px 0px rgba(0,0,0,0.2), 4px 4px 8px rgba(0,0,0,0.3)'
                  : '0 0 1px #7c3aed, 0 0 3px #7c3aed, 2px 2px 0px rgba(0,0,0,0.1), 4px 4px 8px rgba(0,0,0,0.2)',
                color: isDark ? '#a78bfa' : '#7c3aed',
                animation: 'float 4s ease-in-out infinite'
              }}
            >
              4
            </div>

            {/* 0 */}
            <div
              className="text-7xl sm:text-8xl md:text-9xl font-bold relative transform hover:scale-105 transition-transform duration-300"
              style={{
                textShadow: isDark
                  ? '0 0 1px #a78bfa, 0 0 3px #a78bfa, 2px 2px 0px rgba(0,0,0,0.2), 4px 4px 8px rgba(0,0,0,0.3)'
                  : '0 0 1px #7c3aed, 0 0 3px #7c3aed, 2px 2px 0px rgba(0,0,0,0.1), 4px 4px 8px rgba(0,0,0,0.2)',
                color: isDark ? '#a78bfa' : '#7c3aed',
                animation: 'float 4s ease-in-out infinite',
                animationDelay: '0.5s'
              }}
            >
              0
            </div>

            {/* Second 4 */}
            <div
              className="text-7xl sm:text-8xl md:text-9xl font-bold relative transform hover:scale-105 transition-transform duration-300"
              style={{
                textShadow: isDark
                  ? '0 0 1px #a78bfa, 0 0 3px #a78bfa, 2px 2px 0px rgba(0,0,0,0.2), 4px 4px 8px rgba(0,0,0,0.3)'
                  : '0 0 1px #7c3aed, 0 0 3px #7c3aed, 2px 2px 0px rgba(0,0,0,0.1), 4px 4px 8px rgba(0,0,0,0.2)',
                color: isDark ? '#a78bfa' : '#7c3aed',
                animation: 'float 4s ease-in-out infinite',
                animationDelay: '1s'
              }}
            >
              4
            </div>
          </div>
        </div>

        {/* Not Found Text */}
        <div
          className="text-xl sm:text-2xl font-semibold mb-6 relative transform"
          style={{
            textShadow: isDark
              ? '1px 1px 1px rgba(167, 139, 250, 0.3)'
              : '1px 1px 1px rgba(124, 58, 237, 0.3)',
            color: isDark ? '#a78bfa' : '#7c3aed',
            animation: 'float 5s ease-in-out infinite',
            animationDelay: '0.7s'
          }}
        >
          Page Not Found
        </div>

        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary to-violet-600 bg-clip-text text-transparent mb-2">
            Oops! Page Not Found
          </h1>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            We couldn't find the page you were looking for.
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-md transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
          >
            Return Home
          </Link>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx global>{`
        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
          100% {
            transform: translateY(0px);
          }
        }
      `}</style>
    </div>
  )
}

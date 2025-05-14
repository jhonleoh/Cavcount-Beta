"use client";

import { useTheme } from "next-themes";
import Link from "next/link";
import { useEffect, useState } from "react";

export function SponsoredLogo() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Ensure component is mounted before using theme to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Render null during server-side rendering or before mount to avoid mismatch
    return null;
  }

  const logoSrc =
    theme === "dark"
      ? "https://storage.googleapis.com/eleven-public-cdn/images/elevenlabs_grants_white.png" // White logo for dark theme
      : "https://storage.googleapis.com/eleven-public-cdn/images/elevenlabs-grants-logo.png"; // Dark logo for light theme

  const altText = "Text to Speech by ElevenLabs";
  const href = "https://elevenlabs.io/text-to-speech";

  return (
    <div className="my-4 flex justify-center md:justify-start">
      <Link href={href} target="_blank" rel="noopener noreferrer">
        <img
          src={logoSrc}
          alt={altText}
          className="w-48 md:w-[250px] h-auto"
        />
      </Link>
    </div>
  );
}

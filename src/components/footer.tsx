"use client"

import { useEffect } from "react";
import { Heart, Facebook } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  // Add Buy Me A Coffee script
  useEffect(() => {
    // Create script element for Buy Me A Coffee
    const script = document.createElement("script");
    script.src = "https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js";
    script.setAttribute("data-name", "BMC-Widget");
    script.setAttribute("data-cfasync", "false");
    script.setAttribute("data-id", "cavcount");
    script.setAttribute("data-description", "Support me on Buy me a coffee!");
    script.setAttribute("data-message", "");
    script.setAttribute("data-color", "#BD5FFF"); // Match the primary color
    script.setAttribute("data-position", "Right");
    script.setAttribute("data-x_margin", "18");
    script.setAttribute("data-y_margin", "18");

    // Add the script to the body
    document.body.appendChild(script);

    // Clean up on unmount
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Add custom styling for the BMC button to match the site's design
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      .bmc-button {
        border-radius: 0.5rem !important;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1) !important;
        transition: all 0.2s ease !important;
      }
      .bmc-button:hover {
        transform: translateY(-2px) !important;
        box-shadow: 0 4px 12px rgba(189, 95, 255, 0.2) !important;
      }
      /* Custom styling for the frame */
      #bmc-wbtn {
        box-shadow: 0 4px 12px rgba(189, 95, 255, 0.3) !important;
      }
      /* Dark mode compatibility */
      .dark #bmc-wbtn {
        filter: brightness(0.9) !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

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
            <a
              href="https://facebook.com/Cavcount"
              className="text-muted-foreground transition-colors hover:text-foreground flex items-center"
              aria-label="Facebook"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Facebook className="h-4 w-4" />
              <span className="sr-only">Facebook</span>
            </a>
            <a
              href="https://www.buymeacoffee.com/cavcount"
              className="bmc-button text-muted-foreground transition-colors hover:text-foreground flex items-center"
              aria-label="Buy Me A Coffee"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>Buy Me A Coffee</span>
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
  );
}

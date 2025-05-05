"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Switch } from "@/components/ui/switch";
import { SunIcon, MoonIcon } from "lucide-react";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [isMounted, setIsMounted] = React.useState(false);
  const isDark = theme === "dark";

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleThemeChange = (checked: boolean) => {
    setTheme(checked ? "dark" : "light");
  };

  if (!isMounted) {
    return (
      <div className="flex items-center space-x-2">
        <SunIcon className="w-4 h-4" />
        <Switch id="theme-switch" />
        <MoonIcon className="w-4 h-4" />
        <p className="theme-labels">
          <span>Dark</span>
        </p>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-2">
      <SunIcon className="w-4 h-4" />
      <Switch
        id="theme-switch"
        checked={isDark}
        onCheckedChange={handleThemeChange}
        aria-label="Toggle theme"
      />
      <MoonIcon className="w-4 h-4" />
      <p className="theme-labels">
        <span>{isDark ? "Dark" : "Light"}</span>
      </p>
    </div>
  );
}

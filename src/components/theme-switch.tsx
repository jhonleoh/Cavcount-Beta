"use client"

import { useTheme } from "@/components/theme-provider"
import { Switch } from "@/components/ui/switch"
import { MoonIcon, SunIcon } from "lucide-react"

export function ThemeSwitch() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="flex items-center space-x-2">
      <MoonIcon className="h-4 w-4" />
      <Switch
        id="theme-switch"
        checked={theme === "light"}
        onCheckedChange={() => setTheme(theme === "dark" ? "light" : "dark")}
      />
      <SunIcon className="h-4 w-4" />
      <p className="theme-labels">
        <span>{theme === "dark" ? "Dark" : "Light"}</span>
      </p>
    </div>
  )
}

"use client"

import { useEffect } from "react"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ThemeToggleProps {
  currentTheme: "dark" | "light"
  setTheme: (theme: "dark" | "light") => void
}

export default function ThemeToggle({ currentTheme, setTheme }: ThemeToggleProps) {
  // Detect system preference on initial load
  useEffect(() => {
    const isDarkMode = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
    if (!localStorage.getItem("theme")) {
      setTheme(isDarkMode ? "dark" : "light")
    }
  }, [setTheme])

  return (
    <Button
      variant="outline"
      size="icon"
      className={`rounded-full transition-all duration-300 ${
        currentTheme === "dark"
          ? "bg-zinc-800 text-white border-zinc-700 hover:bg-zinc-700 hover:text-amber-400 hover:scale-110"
          : "bg-white text-amber-700 border-amber-600 hover:bg-amber-50 hover:text-black hover:scale-110"
      }`}
      onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
    >
      {currentTheme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}

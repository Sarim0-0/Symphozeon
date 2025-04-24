"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Music } from "lucide-react"
import ThemeSwitcher from "@/components/theme-switcher"
import { Button } from "@/components/ui/button"

interface NavbarProps {
  theme: "dark" | "light"
  setTheme: (theme: "dark" | "light") => void
}

export default function Navbar({ theme, setTheme }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false)
    const element = document.getElementById(id)
    if (element) {
      const navbarHeight = 80 // Approximate navbar height
      const targetPosition = element.getBoundingClientRect().top + window.pageYOffset - navbarHeight

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      })
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? theme === "dark"
            ? "bg-zinc-900/90 backdrop-blur-md border-b border-amber-600/20 shadow-lg shadow-purple-900/10"
            : "bg-white/90 backdrop-blur-md border-b border-amber-600/20 shadow-lg shadow-amber-500/10"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 ${
                theme === "dark"
                  ? "bg-zinc-800 text-amber-500 border border-amber-600/50"
                  : "bg-white text-amber-600 border border-amber-500 shadow-md shadow-amber-200"
              }`}
            >
              <Music size={20} />
            </div>
            <span className="text-xl font-serif font-bold tracking-wide">Symphozeon</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <nav className="flex items-center space-x-6">
              <button
                onClick={() => scrollToSection("features")}
                className={`text-sm font-medium transition-colors duration-300 hover:${
                  theme === "dark" ? "text-amber-400" : "text-amber-600"
                } ${theme === "dark" ? "text-zinc-300" : "text-zinc-700"}`}
              >
                Features
              </button>
              <button
                onClick={() => scrollToSection("how-it-works")}
                className={`text-sm font-medium transition-colors duration-300 hover:${
                  theme === "dark" ? "text-amber-400" : "text-amber-600"
                } ${theme === "dark" ? "text-zinc-300" : "text-zinc-700"}`}
              >
                How It Works
              </button>
              <button
                onClick={() => scrollToSection("featured-rooms")}
                className={`text-sm font-medium transition-colors duration-300 hover:${
                  theme === "dark" ? "text-amber-400" : "text-amber-600"
                } ${theme === "dark" ? "text-zinc-300" : "text-zinc-700"}`}
              >
                Jam Rooms
              </button>
            </nav>

            <div className="flex items-center space-x-3">
              <Link href="/login">
                <Button
                  variant="outline"
                  className={`transition-all duration-300 ${
                    theme === "dark"
                      ? "border-zinc-700 text-zinc-200 hover:border-amber-600 hover:text-amber-400 hover:scale-105"
                      : "border-amber-600/70 bg-white text-amber-800 hover:border-amber-700 hover:bg-amber-50 hover:text-amber-900 hover:scale-105"
                  }`}
                >
                  Log In
                </Button>
              </Link>
              <Link href="/signup">
                <Button
                  className={`transition-all duration-300 ${
                    theme === "dark"
                      ? "bg-amber-600 hover:bg-amber-500 text-black hover:scale-105"
                      : "bg-amber-600 hover:bg-amber-500 text-white hover:scale-105"
                  }`}
                >
                  Sign Up
                </Button>
              </Link>
              <ThemeSwitcher currentTheme={theme} setTheme={setTheme} />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-3 md:hidden">
            <ThemeSwitcher currentTheme={theme} setTheme={setTheme} />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-md transition-colors duration-300 ${
                theme === "dark" ? "hover:bg-zinc-800" : "hover:bg-zinc-100"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div
          className={`md:hidden ${
            theme === "dark" ? "bg-zinc-900 border-b border-zinc-800" : "bg-white border-b border-zinc-200"
          }`}
        >
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              <button onClick={() => scrollToSection("features")} className="py-2 text-left">
                Features
              </button>
              <button onClick={() => scrollToSection("how-it-works")} className="py-2 text-left">
                How It Works
              </button>
              <button onClick={() => scrollToSection("featured-rooms")} className="py-2 text-left">
                Jam Rooms
              </button>
              <div className="flex flex-col space-y-3 pt-2">
                <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button
                    variant="outline"
                    className={`w-full ${
                      theme === "dark" ? "border-zinc-700 text-zinc-200" : "border-amber-600/70 bg-white text-amber-800"
                    }`}
                  >
                    Log In
                  </Button>
                </Link>
                <Link href="/signup" onClick={() => setMobileMenuOpen(false)}>
                  <Button
                    className={`w-full ${
                      theme === "dark"
                        ? "bg-amber-600 hover:bg-amber-500 text-black"
                        : "bg-amber-600 hover:bg-amber-500 text-white"
                    }`}
                  >
                    Sign Up
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}

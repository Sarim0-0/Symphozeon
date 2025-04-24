"use client"

import { useState } from "react"
import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import Features from "@/components/features"
import HowItWorks from "@/components/how-it-works"
import FeaturedRooms from "@/components/featured-rooms"
import Footer from "@/components/footer"

export default function Home() {
  const [theme, setTheme] = useState<"dark" | "light">("dark")

  return (
    <div
      className={`min-h-screen w-full transition-colors duration-500 ${
        theme === "dark"
          ? "bg-zinc-950 text-white bg-[radial-gradient(ellipse_at_top,rgba(120,40,140,0.15),transparent_70%),radial-gradient(ellipse_at_bottom,rgba(120,40,140,0.1),transparent_70%)]"
          : "bg-[#fcfcf8] text-zinc-900 bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.1),transparent_70%),radial-gradient(ellipse_at_bottom,rgba(212,175,55,0.05),transparent_70%)]"
      }`}
    >
      <Navbar theme={theme} setTheme={setTheme} />
      <main>
        <Hero theme={theme} />
        <Features theme={theme} />
        <HowItWorks theme={theme} />
        <FeaturedRooms theme={theme} />
      </main>
      <Footer theme={theme} />
    </div>
  )
}

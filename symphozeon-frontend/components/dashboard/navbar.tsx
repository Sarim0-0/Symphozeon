"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Music, User } from 'lucide-react'
import ThemeToggle from "@/components/theme-toggle"

interface NavbarProps {
  theme: "dark" | "light"
  setTheme: (theme: "dark" | "light") => void
  userName?: string
  showUserProfile?: boolean
  rightContent?: React.ReactNode
}

export default function Navbar({ 
  theme, 
  setTheme, 
  userName = "Music Lover", 
  showUserProfile = true,
  rightContent
}: NavbarProps) {
  return (
    <header
      className={`w-full py-4 px-6 flex items-center justify-between ${
        theme === "dark" ? "bg-zinc-900/50" : "bg-white/50"
      } backdrop-blur-md border-b ${theme === "dark" ? "border-zinc-800" : "border-zinc-200"} z-10`}
    >
      <div className="flex items-center">
        <Link href="/" className="flex items-center group">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 mr-3 ${
              theme === "dark"
                ? "bg-zinc-800 text-amber-500 border border-amber-600/50"
                : "bg-white text-amber-600 border border-amber-500 shadow-md shadow-amber-200"
            }`}
          >
            <Music size={20} />
          </div>
          <h1
            className={`font-serif text-2xl font-bold tracking-wide hidden sm:block ${
              theme === "dark" ? "text-white" : "text-zinc-900"
            }`}
          >
            Symphozeon
          </h1>
        </Link>
      </div>

      <div className="flex items-center space-x-4">
        {rightContent}
        
        <ThemeToggle currentTheme={theme} setTheme={setTheme} />
        
        {showUserProfile && (
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`hidden sm:flex items-center space-x-2 p-2 pl-3 pr-4 rounded-full cursor-pointer ${
              theme === "dark"
                ? "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                : "bg-white text-zinc-600 hover:bg-zinc-50 shadow-sm"
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                theme === "dark" ? "bg-amber-600 text-black" : "bg-amber-500 text-white"
              }`}
            >
              <User size={16} />
            </div>
            <span className="text-sm font-medium">{userName}</span>
          </motion.div>
        )}
      </div>
    </header>
  )
}
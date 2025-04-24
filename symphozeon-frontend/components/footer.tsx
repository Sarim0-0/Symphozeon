"use client"

import Link from "next/link"
import { Music, Github } from "lucide-react"
import SplashCursor from './SplashCursor'

interface FooterProps {
  theme: "dark" | "light"
}

export default function Footer({ theme }: FooterProps) {
  return (
    <footer className={`py-12 ${theme === "dark" ? "bg-zinc-900" : "bg-zinc-50"}`}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and description */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4 group">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 ${
                  theme === "dark"
                    ? "bg-zinc-800 text-amber-500 border border-amber-600/50"
                    : "bg-white text-amber-600 border border-amber-500"
                }`}
              >
                <Music size={20} />
              </div>
              <span className="text-xl font-serif font-bold tracking-wide">Symphozeon</span>
            </Link>
            <p className={`max-w-md ${theme === "dark" ? "text-zinc-400" : "text-zinc-600"}`}>
              A collaborative music platform where people come together to share, discover, and experience music in
              real-time. Join our growing community of music enthusiasts today.
            </p>

            {/* Greek pattern accent */}
            <div className="mt-6 h-4 w-40 overflow-hidden opacity-30">
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className={`text-lg font-serif font-bold mb-4 ${theme === "dark" ? "text-white" : "text-zinc-900"}`}>
              Company
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className={`transition-colors duration-300 hover:${
                    theme === "dark" ? "text-amber-400" : "text-amber-600"
                  } ${theme === "dark" ? "text-zinc-400" : "text-zinc-600"}`}
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className={`transition-colors duration-300 hover:${
                    theme === "dark" ? "text-amber-400" : "text-amber-600"
                  } ${theme === "dark" ? "text-zinc-400" : "text-zinc-600"}`}
                >
                  Privacy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className={`text-lg font-serif font-bold mb-4 ${theme === "dark" ? "text-white" : "text-zinc-900"}`}>
              Resources
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className={`transition-colors duration-300 hover:${
                    theme === "dark" ? "text-amber-400" : "text-amber-600"
                  } ${theme === "dark" ? "text-zinc-400" : "text-zinc-600"}`}
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className={`transition-colors duration-300 hover:${
                    theme === "dark" ? "text-amber-400" : "text-amber-600"
                  } ${theme === "dark" ? "text-zinc-400" : "text-zinc-600"}`}
                >
                  GitHub
                  <Github size={16} className="inline ml-1" />
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-zinc-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className={theme === "dark" ? "text-zinc-500" : "text-zinc-600"}>
              &copy; {new Date().getFullYear()} Symphozeon. All rights reserved.
            </p>
          </div>
        </div>
      </div>
      <SplashCursor />
    </footer>
  )
}

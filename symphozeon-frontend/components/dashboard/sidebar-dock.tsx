"use client"

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { Home, FolderPlus, Clock, Heart } from 'lucide-react'

interface SidebarDockProps {
  theme: "dark" | "light"
}

export default function SidebarDock({ theme }: SidebarDockProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [activeItem, setActiveItem] = useState<string | null>(null)

  // Set active item based on current path
  useEffect(() => {
    if (pathname === "/" || pathname === "/dashboard") {
      setActiveItem("home")
    } else {
      setActiveItem(null) // Deselect when not on dashboard
    }
  }, [pathname])

  const navItems = [
    {
      id: "home",
      label: "Home",
      icon: <Home size={20} />,
      path: "/dashboard",
    },
    {
      id: "created",
      label: "Created",
      icon: <FolderPlus size={20} />,
      path: "#", // Placeholder path
    },
    {
      id: "recent",
      label: "Recent",
      icon: <Clock size={20} />,
      path: "#", // Placeholder path
    },
    {
      id: "liked",
      label: "Liked",
      icon: <Heart size={20} />,
      path: "#", // Placeholder path
    },
  ]

  return (
    <>
      {/* Desktop sidebar - positioned more in the center and thinner */}
      <div className="fixed left-0 top-1/2 -translate-y-1/2 z-30 hidden md:block">
        <div
          className={`flex flex-col items-center space-y-6 py-6 px-2 rounded-r-xl ${
            theme === "dark"
              ? "bg-zinc-900/30 border-r border-t border-b border-zinc-800/30"
              : "bg-white/30 border-r border-t border-b border-zinc-200/30"
          }`}
        >
          {navItems.map((item) => (
            <Link href={item.path} key={item.id} className="w-full">
              <div className="flex flex-col items-center justify-center">
                <motion.div
                  className={`flex items-center justify-center p-2.5 rounded-full cursor-pointer transition-colors ${
                    activeItem === item.id
                      ? theme === "dark"
                        ? "bg-amber-600/20 text-amber-500"
                        : "bg-amber-100 text-amber-600"
                      : theme === "dark"
                        ? "text-zinc-400 hover:text-zinc-200"
                        : "text-zinc-600 hover:text-zinc-800"
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  onClick={() => setActiveItem(item.id)}
                >
                  {item.icon}
                </motion.div>
                <span 
                  className={`text-xs font-medium mt-1 ${
                    activeItem === item.id
                      ? theme === "dark"
                        ? "text-amber-500"
                        : "text-amber-600"
                      : theme === "dark"
                        ? "text-zinc-400"
                        : "text-zinc-600"
                  }`}
                >
                  {item.label}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile floating navigation - only icons, no text */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 md:hidden">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className={`flex justify-around items-center py-1.5 px-3 rounded-full shadow-lg ${
            theme === "dark" ? "bg-zinc-900/90 border border-zinc-800" : "bg-white/90 border border-zinc-200"
          } backdrop-blur-md`}
        >
          {navItems.map((item) => (
            <Link href={item.path} key={item.id}>
              <motion.div
                className={`relative flex items-center justify-center p-2 mx-1.5 rounded-full cursor-pointer transition-colors ${
                  activeItem === item.id
                    ? theme === "dark"
                      ? "bg-amber-600/20 text-amber-500"
                      : "bg-amber-100 text-amber-600"
                    : theme === "dark"
                      ? "text-zinc-400 hover:text-zinc-200"
                      : "text-zinc-600 hover:text-zinc-800"
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                onClick={() => setActiveItem(item.id)}
              >
                {item.icon}
              </motion.div>
            </Link>
          ))}
        </motion.div>
      </div>
    </>
  )
}

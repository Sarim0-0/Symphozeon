"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { PlusCircle, LogOut, Search, Users, ChevronRight, Lightbulb } from "lucide-react"
import Navbar from "@/components/dashboard/navbar"
import SidebarDock from "@/components/dashboard/sidebar-dock"
import Orb from "@/components/Orb"

export default function Dashboard() {
  const router = useRouter()
  const [theme, setTheme] = useState<"dark" | "light">("dark")
  const [userName, setUserName] = useState("Music Lover")
  const [hoveredOrb, setHoveredOrb] = useState<string | null>(null)

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "dark" | "light" | null
    if (savedTheme) {
      setTheme(savedTheme)
    }

    const storedUserName = localStorage.getItem("userName")
    if (storedUserName) {
      setUserName(storedUserName)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("theme", theme)
  }, [theme])

  const handleLogout = () => {
    setTimeout(() => {
      router.push("/login")
    }, 500)
  }

  const dashboardOrbs = [
    {
      id: "create",
      title: "Create Room",
      description: "Start a new music room",
      icon: <PlusCircle size={28} />,
      hue: 30, // Amber
      action: () => router.push("/create-room"),
    },
    {
      id: "join",
      title: "Join Room",
      description: "Enter a room code",
      icon: <Users size={28} />,
      hue: 270, // Purple
      action: () => router.push("/join-room"),
    },
    {
      id: "discover",
      title: "Discover",
      description: "Browse public rooms",
      icon: <Search size={28} />,
      hue: 200, // Blue
      action: () => router.push("/discover"),
    },
    {
      id: "exit",
      title: "Exit",
      description: "Sign out",
      icon: <LogOut size={28} />,
      hue: 0, // Red-ish
      action: handleLogout,
    },
  ]

  return (
    <div
      className={`min-h-screen w-full transition-colors duration-500 ${
        theme === "dark" ? "bg-zinc-950 text-white" : "bg-[#fcfcf8] text-zinc-900"
      }`}
    >
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[60%] rounded-full blur-[120px] opacity-20 ${
            theme === "dark"
              ? "bg-gradient-to-r from-purple-600 via-transparent to-amber-500"
              : "bg-gradient-to-r from-purple-300 via-transparent to-amber-300"
          }`}
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.2, 0.25, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
      </div>

      {/* Navbar */}
      <Navbar theme={theme} setTheme={setTheme} userName={userName} />

      {/* Sidebar Dock */}
      <SidebarDock theme={theme} />

      <main className="container mx-auto px-4 py-8 w-full max-w-[1800px]">
        {/* Welcome section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <h1
            className={`text-3xl sm:text-4xl font-serif font-bold mb-2 ${
              theme === "dark" ? "text-white" : "text-zinc-900"
            }`}
          >
            Welcome back, {userName.split(" ")[0]}
          </h1>
          <p className={`text-lg ${theme === "dark" ? "text-zinc-400" : "text-zinc-600"}`}>
            What would you like to do today?
          </p>
        </motion.div>

        {/* Orb Navigation - Made larger */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 w-full">
          {dashboardOrbs.map((orb, index) => (
            <motion.div
              key={orb.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative h-80 cursor-pointer w-full" // Increased height from h-64 to h-80
              onMouseEnter={() => setHoveredOrb(orb.id)}
              onMouseLeave={() => setHoveredOrb(null)}
              onClick={orb.action}
            >
              <div className="absolute inset-0 w-full h-full rounded-xl overflow-hidden">
                <Orb hue={orb.hue} hoverIntensity={0.5} rotateOnHover={true} forceHoverState={hoveredOrb === orb.id} />
              </div>

              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10 pointer-events-none">
                <div
                  className={`w-16 h-16 mx-auto mb-5 rounded-full flex items-center justify-center ${
                    theme === "dark" ? "bg-black/30 text-white" : "bg-white/30 text-zinc-900"
                  }`}
                >
                  {orb.icon}
                </div>

                <motion.h3
                  className={`text-2xl font-bold mb-3 ${theme === "dark" ? "text-white" : "text-zinc-900"}`}
                  animate={{
                    scale: hoveredOrb === orb.id ? 1.05 : 1,
                  }}
                >
                  {orb.title}
                </motion.h3>

                <motion.p
                  className={`text-base ${theme === "dark" ? "text-zinc-300" : "text-zinc-700"}`}
                  animate={{
                    opacity: hoveredOrb === orb.id ? 1 : 0.8,
                  }}
                >
                  {orb.description}
                </motion.p>

                <motion.div
                  className="mt-6"
                  animate={{
                    opacity: hoveredOrb === orb.id ? 1 : 0.7,
                    y: hoveredOrb === orb.id ? 0 : 5,
                  }}
                >
                  <div className={`p-3 rounded-full ${theme === "dark" ? "bg-black/30" : "bg-white/30"}`}>
                    <ChevronRight size={20} className={theme === "dark" ? "text-white" : "text-zinc-900"} />
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quick Tips Section - Pushed down by larger orbs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className={`p-6 rounded-lg w-full ${
            theme === "dark" ? "bg-zinc-900/70 border border-zinc-800" : "bg-white/70 border border-zinc-200"
          }`}
        >
          <div className="flex items-center mb-4">
            <Lightbulb className={`mr-2 ${theme === "dark" ? "text-amber-500" : "text-amber-600"}`} size={20} />
            <h3 className={`text-lg font-medium ${theme === "dark" ? "text-white" : "text-zinc-900"}`}>Quick Tips</h3>
          </div>
          <ul className={`space-y-3 ${theme === "dark" ? "text-zinc-400" : "text-zinc-600"}`}>
            <li className="flex items-start">
              <ChevronRight className={`h-4 w-4 mt-1 mr-2 ${theme === "dark" ? "text-amber-500" : "text-amber-600"}`} />
              <span>Create a room to start your own music session and invite friends</span>
            </li>
            <li className="flex items-start">
              <ChevronRight className={`h-4 w-4 mt-1 mr-2 ${theme === "dark" ? "text-amber-500" : "text-amber-600"}`} />
              <span>Join a room using a room code shared by another user</span>
            </li>
            <li className="flex items-start">
              <ChevronRight className={`h-4 w-4 mt-1 mr-2 ${theme === "dark" ? "text-amber-500" : "text-amber-600"}`} />
              <span>Discover public rooms to find new music and connect with others</span>
            </li>
          </ul>
        </motion.div>
      </main>
    </div>
  )
}

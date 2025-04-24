"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  Music,
  PlusCircle,
  LogOut,
  Search,
  Users,
  Headphones,
  Settings,
  Bell,
  User,
  ChevronRight,
  Disc3,
  Lightbulb,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import ThemeToggle from "@/components/theme-toggle"
import Orb from "@/components/Orb"

export default function Dashboard() {
  const router = useRouter()
  const [theme, setTheme] = useState<"dark" | "light">("dark")
  const [userName, setUserName] = useState("Music Lover")
  const [showTooltip, setShowTooltip] = useState<string | null>(null)
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
      icon: <PlusCircle size={24} />,
      hue: 30, // Amber
      action: () => router.push("/create-room"),
    },
    {
      id: "join",
      title: "Join Room",
      description: "Enter a room code",
      icon: <Users size={24} />,
      hue: 270, // Purple
      action: () => router.push("/join-room"),
    },
    {
      id: "discover",
      title: "Discover",
      description: "Browse public rooms",
      icon: <Search size={24} />,
      hue: 200, // Blue
      action: () => router.push("/discover"),
    },
    {
      id: "exit",
      title: "Exit",
      description: "Sign out",
      icon: <LogOut size={24} />,
      hue: 0, // Red-ish
      action: handleLogout,
    },
  ]

  const recentRooms = [
    { id: "room1", name: "Jazz Fusion Jam", participants: 8, active: true },
    { id: "room2", name: "Classical Appreciation", participants: 12, active: false },
    { id: "room3", name: "Rock Legends", participants: 5, active: true },
  ]

  return (
    <div className={`min-h-screen w-full transition-colors duration-500 overflow-hidden ${
      theme === "dark"
        ? "bg-zinc-950 text-white"
        : "bg-[#fcfcf8] text-zinc-900"
    }`}>
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
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

      {/* Header */}
      <header className={`w-full py-4 px-6 flex items-center justify-between ${
        theme === "dark" ? "bg-zinc-900/50" : "bg-white/50"
      } backdrop-blur-md border-b ${
        theme === "dark" ? "border-zinc-800" : "border-zinc-200"
      }`}>
        <div className="flex items-center">
          <Link href="/" className="flex items-center group">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
              theme === "dark"
                ? "bg-zinc-800 text-amber-500 border border-amber-600/50"
                : "bg-white text-amber-600 border border-amber-500 shadow-md shadow-amber-200"
            }`}>
              <Music size={20} />
            </div>
            <h1 className={`font-serif text-2xl font-bold tracking-wide hidden sm:block ${
              theme === "dark" ? "text-white" : "text-zinc-900"
            }`}>
              Symphozeon
            </h1>
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <ThemeToggle currentTheme={theme} setTheme={setTheme} />
          <motion.div
            whileHover={{ scale: 1.05 }}
            className={`hidden sm:flex items-center space-x-2 p-2 pl-3 pr-4 rounded-full cursor-pointer ${
              theme === "dark"
                ? "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                : "bg-white text-zinc-600 hover:bg-zinc-50 shadow-sm"
            }`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              theme === "dark" ? "bg-amber-600 text-black" : "bg-amber-500 text-white"
            }`}>
              <User size={16} />
            </div>
            <span className="text-sm font-medium">{userName}</span>
          </motion.div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 w-full max-w-[1800px]">
        {/* Welcome section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <h1 className={`text-3xl sm:text-4xl font-serif font-bold mb-2 ${
            theme === "dark" ? "text-white" : "text-zinc-900"
          }`}>
            Welcome back, {userName.split(" ")[0]}
          </h1>
          <p className={`text-lg ${theme === "dark" ? "text-zinc-400" : "text-zinc-600"}`}>
            What would you like to do today?
          </p>
        </motion.div>

        {/* Orb Navigation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 w-full">
          {dashboardOrbs.map((orb, index) => (
            <motion.div
              key={orb.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative h-64 cursor-pointer w-full"
              onMouseEnter={() => setHoveredOrb(orb.id)}
              onMouseLeave={() => setHoveredOrb(null)}
              onClick={orb.action}
            >
              <div className="absolute inset-0 w-full h-full rounded-xl overflow-hidden">
                <Orb
                  hue={orb.hue}
                  hoverIntensity={0.5}
                  rotateOnHover={true}
                  forceHoverState={hoveredOrb === orb.id}
                />
              </div>
              
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10 pointer-events-none">
                <div className={`w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center ${
                  theme === "dark" ? "bg-black/30 text-white" : "bg-white/30 text-zinc-900"
                }`}>
                  {orb.icon}
                </div>
                
                <motion.h3
                  className={`text-xl font-bold mb-2 ${
                    theme === "dark" ? "text-white" : "text-zinc-900"
                  }`}
                  animate={{
                    scale: hoveredOrb === orb.id ? 1.05 : 1,
                  }}
                >
                  {orb.title}
                </motion.h3>
                
                <motion.p
                  className={`text-sm ${
                    theme === "dark" ? "text-zinc-300" : "text-zinc-700"
                  }`}
                  animate={{
                    opacity: hoveredOrb === orb.id ? 1 : 0.8,
                  }}
                >
                  {orb.description}
                </motion.p>
                
                <motion.div
                  className="mt-4"
                  animate={{
                    opacity: hoveredOrb === orb.id ? 1 : 0.7,
                    y: hoveredOrb === orb.id ? 0 : 5,
                  }}
                >
                  <div className={`p-2 rounded-full ${
                    theme === "dark" ? "bg-black/30" : "bg-white/30"
                  }`}>
                    <ChevronRight
                      size={18}
                      className={theme === "dark" ? "text-white" : "text-zinc-900"}
                    />
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Recent rooms section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-8 w-full"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className={`text-2xl font-serif font-bold ${
              theme === "dark" ? "text-white" : "text-zinc-900"
            }`}>
              Recent Rooms
            </h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors border ${
                theme === "dark"
                  ? "border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-amber-500"
                  : "border-zinc-300 text-zinc-700 hover:bg-zinc-100 hover:text-amber-600"
              }`}
              onClick={() => router.push("/rooms/history")}
            >
              View All
            </motion.button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
            {recentRooms.map((room, index) => (
              <motion.div
                key={room.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className={`p-4 rounded-lg cursor-pointer transition-all duration-300 ${
                  theme === "dark"
                    ? "bg-zinc-900/70 border border-zinc-800 hover:border-amber-600/50"
                    : "bg-white/70 border border-zinc-200 hover:border-amber-500/50"
                }`}
                onClick={() => router.push(`/rooms/${room.id}`)}
              >
                <div className="flex items-center mb-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                    theme === "dark" ? "bg-zinc-800" : "bg-zinc-100"
                  }`}>
                    <Disc3 size={20} className={theme === "dark" ? "text-amber-500" : "text-amber-600"} />
                  </div>
                  <div>
                    <h3 className={`font-medium ${
                      theme === "dark" ? "text-white" : "text-zinc-900"
                    }`}>
                      {room.name}
                    </h3>
                    <p className={`text-sm ${
                      theme === "dark" ? "text-zinc-400" : "text-zinc-600"
                    }`}>
                      {room.participants} participants
                    </p>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    room.active
                      ? theme === "dark"
                        ? "bg-green-900/30 text-green-400"
                        : "bg-green-100 text-green-700"
                      : theme === "dark"
                        ? "bg-zinc-800 text-zinc-400"
                        : "bg-zinc-200 text-zinc-600"
                  }`}>
                    {room.active ? "Active" : "Ended"}
                  </span>
                  <Button
                    size="sm"
                    variant="ghost"
                    className={
                      theme === "dark" ? "text-amber-500 hover:text-amber-400" : "text-amber-600 hover:text-amber-700"
                    }
                  >
                    <Headphones size={16} className="mr-1" />
                    Join
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quick Tips Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className={`p-6 rounded-lg mb-8 w-full ${
            theme === "dark" 
              ? "bg-zinc-900/70 border border-zinc-800" 
              : "bg-white/70 border border-zinc-200"
          }`}
        >
          <div className="flex items-center mb-4">
            <Lightbulb className={`mr-2 ${
              theme === "dark" ? "text-amber-500" : "text-amber-600"
            }`} size={20} />
            <h3 className={`text-lg font-medium ${
              theme === "dark" ? "text-white" : "text-zinc-900"
            }`}>
              Quick Tips
            </h3>
          </div>
          <ul className={`space-y-3 ${
            theme === "dark" ? "text-zinc-400" : "text-zinc-600"
          }`}>
            <li className="flex items-start">
              <ChevronRight className={`h-4 w-4 mt-1 mr-2 ${
                theme === "dark" ? "text-amber-500" : "text-amber-600"
              }`} />
              <span>Create a room to start your own music session and invite friends</span>
            </li>
            <li className="flex items-start">
              <ChevronRight className={`h-4 w-4 mt-1 mr-2 ${
                theme === "dark" ? "text-amber-500" : "text-amber-600"
              }`} />
              <span>Join a room using a room code shared by another user</span>
            </li>
            <li className="flex items-start">
              <ChevronRight className={`h-4 w-4 mt-1 mr-2 ${
                theme === "dark" ? "text-amber-500" : "text-amber-600"
              }`} />
              <span>Discover public rooms to find new music and connect with others</span>
            </li>
          </ul>
        </motion.div>
      </main>
    </div>
  )
}
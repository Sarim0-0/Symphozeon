"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, LogIn, Check, Users, Disc3, Music } from 'lucide-react'
import { Button } from "@/components/ui/button"
import Navbar from "@/components/dashboard/navbar"

export default function JoinRoomPage() {
  const router = useRouter()
  const [theme, setTheme] = useState<"dark" | "light">("dark")
  const [roomUrl, setRoomUrl] = useState("")
  const [isValidUrl, setIsValidUrl] = useState(false)
  const [isJoining, setIsJoining] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [recentRooms, setRecentRooms] = useState([
    { id: "room-123", name: "Jazz Night", genre: "Jazz", host: "MusicMaestro" },
    { id: "room-456", name: "Rock Legends", genre: "Rock", host: "GuitarHero" },
    { id: "room-789", name: "Classical Hour", genre: "Classical", host: "BachFan" },
  ])

  // Load theme from localStorage on initial render
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "dark" | "light" | null
    if (savedTheme) {
      setTheme(savedTheme)
    }
  }, [])

  // Save theme to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("theme", theme)
  }, [theme])

  // Validate URL format
  useEffect(() => {
    // Simple validation - check if it contains symphozeon and room
    const isValid = roomUrl.trim() !== "" && (roomUrl.includes("symphozeon") || roomUrl.includes("room"))
    setIsValidUrl(isValid)
  }, [roomUrl])

  const handleJoinRoom = () => {
    if (!isValidUrl) return

    setIsJoining(true)

    // Simulate joining process
    setTimeout(() => {
      setIsJoining(false)
      setShowSuccess(true)

      // Redirect after showing success message
      setTimeout(() => {
        // This would redirect to the actual room in a real implementation
        router.push("/dashboard")
      }, 1500)
    }, 1000)
  }

  const handleQuickJoin = (roomId: string) => {
    setIsJoining(true)

    // Simulate joining process
    setTimeout(() => {
      setIsJoining(false)
      setShowSuccess(true)

      // Redirect after showing success message
      setTimeout(() => {
        // This would redirect to the actual room in a real implementation
        router.push("/dashboard")
      }, 1500)
    }, 1000)
  }


  return (
    <div
      className={`min-h-screen w-full transition-colors duration-500 ${
        theme === "dark"
          ? "bg-zinc-950 text-white bg-[radial-gradient(ellipse_at_top,rgba(120,40,140,0.15),transparent_70%),radial-gradient(ellipse_at_bottom,rgba(120,40,140,0.1),transparent_70%)]"
          : "bg-[#fcfcf8] text-zinc-900 bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.1),transparent_70%),radial-gradient(ellipse_at_bottom,rgba(212,175,55,0.05),transparent_70%)]"
      }`}
    >
      {/* Background ambient elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">

        {/* Ambient glow */}
        <motion.div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[60%] rounded-full blur-[120px] opacity-20 ${
            theme === "dark"
              ? "bg-gradient-to-r from-purple-600 via-transparent to-amber-500"
              : "bg-gradient-to-r from-purple-500 via-transparent to-amber-400"
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
        ></motion.div>

        {/* Animated particles */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 15 }).map((_, i) => (
            <motion.div
              key={i}
              className={`absolute w-1 h-1 rounded-full ${theme === "dark" ? "bg-amber-500/30" : "bg-amber-600/30"}`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -100],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 5 + Math.random() * 10,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 5,
              }}
            />
          ))}
        </div>
      </div>

      {/* Navbar */}
      <Navbar 
        theme={theme} 
        setTheme={setTheme} 
        showUserProfile={true}
      />

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Page title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10 text-center"
        >
          <h1
            className={`text-3xl sm:text-4xl font-serif font-bold mb-2 ${
              theme === "dark" ? "text-white" : "text-zinc-900"
            }`}
          >
            Join a Room
          </h1>
          <p className={`text-lg ${theme === "dark" ? "text-zinc-400" : "text-zinc-600"}`}>
            Enter a room link or code to join an existing music session
          </p>
        </motion.div>

        {/* Join room form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={`p-8 rounded-xl ${
            theme === "dark"
              ? "bg-zinc-900/70 border border-zinc-800 shadow-xl shadow-black/20"
              : "bg-white/70 border border-zinc-200 shadow-xl shadow-zinc-200/50"
          }`}
        >
          <div className="space-y-6 max-w-2xl mx-auto">
            {/* Room URL input */}
            <div className="space-y-2">
              <label
                htmlFor="roomUrl"
                className={`block text-sm font-medium ${theme === "dark" ? "text-zinc-300" : "text-zinc-700"}`}
              >
                Room Link or Code
              </label>
              <motion.div
                whileFocus={{ scale: 1.01 }}
                className={`relative rounded-md shadow-sm ${!roomUrl.trim() && isJoining ? "ring-2 ring-red-500" : ""}`}
              >
                <div
                  className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none ${
                    theme === "dark" ? "text-zinc-500" : "text-zinc-400"
                  }`}
                >
                  <Disc3 size={18} />
                </div>
                <input
                  type="text"
                  id="roomUrl"
                  value={roomUrl}
                  onChange={(e) => setRoomUrl(e.target.value)}
                  className={`block w-full pl-10 pr-3 py-3 border ${
                    theme === "dark"
                      ? "bg-zinc-800/50 border-zinc-700 text-white placeholder-zinc-500"
                      : "bg-white border-zinc-300 text-zinc-900 placeholder-zinc-400"
                  } rounded-md shadow-sm focus:outline-none focus:ring-2 ${
                    theme === "dark" ? "focus:ring-amber-500" : "focus:ring-amber-600"
                  } focus:border-transparent transition-all duration-200 ${isValidUrl ? "border-amber-500/50" : ""}`}
                  placeholder="https://symphozeon.com/room/abc123 or abc123"
                />
              </motion.div>
              {!roomUrl.trim() && isJoining && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-red-500 mt-1"
                >
                  Please enter a room link or code
                </motion.p>
              )}
            </div>

            {/* Join button */}
            <div className="pt-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleJoinRoom}
                disabled={!isValidUrl || isJoining}
                className={`w-full flex items-center justify-center space-x-2 px-6 py-4 rounded-md font-medium transition-all duration-300 ${
                  isJoining || !isValidUrl
                    ? theme === "dark"
                      ? "bg-zinc-700 text-zinc-400 cursor-not-allowed"
                      : "bg-zinc-400 text-zinc-200 cursor-not-allowed"
                    : theme === "dark"
                      ? "bg-amber-600 hover:bg-amber-500 text-black hover:shadow-lg hover:shadow-amber-900/20"
                      : "bg-amber-600 hover:bg-amber-500 text-white hover:shadow-lg hover:shadow-amber-500/20"
                }`}
              >
                {isJoining ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Joining...</span>
                  </>
                ) : (
                  <>
                    <LogIn size={18} />
                    <span>Join Room</span>
                  </>
                )}
              </motion.button>
            </div>

            {/* Success message */}
            <AnimatePresence>
              {showSuccess && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`mt-4 p-4 rounded-md flex items-center ${
                    theme === "dark"
                      ? "bg-green-900/20 border border-green-900/30 text-green-400"
                      : "bg-green-100 border border-green-200 text-green-800"
                  }`}
                >
                  <Check size={18} className="mr-2" />
                  <span>Successfully joined the room! Redirecting...</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Tips section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className={`mt-8 p-6 rounded-lg ${
            theme === "dark" ? "bg-zinc-900/70 border border-zinc-800" : "bg-white/70 border border-zinc-200"
          }`}
        >
          <h3 className={`text-lg font-medium mb-3 ${theme === "dark" ? "text-white" : "text-zinc-900"}`}>
            Tips for Joining Rooms
          </h3>
          <ul className={`list-disc list-inside space-y-2 ${theme === "dark" ? "text-zinc-400" : "text-zinc-600"}`}>
            <li>Room links are typically shared by room hosts via messaging apps or email</li>
            <li>You can also enter just the room code (the characters after the last slash in the URL)</li>
            <li>Private rooms require permission from the host to join</li>
            <li>If a room has ended, you won't be able to join it</li>
          </ul>
        </motion.div>
      </main>
    </div>
  )
}
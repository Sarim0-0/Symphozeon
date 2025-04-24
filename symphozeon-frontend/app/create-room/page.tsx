"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Music, Copy, Check, ChevronDown, Globe, Lock, ArrowLeft, Disc3, Sparkles, Share2, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import ThemeToggle from "@/components/theme-toggle"

const musicGenres = [
  { id: "rock", name: "Rock", icon: "🎸", color: "from-red-600 to-red-700" },
  { id: "jazz", name: "Jazz", icon: "🎷", color: "from-blue-600 to-blue-700" },
  { id: "classical", name: "Classical", icon: "🎻", color: "from-green-600 to-green-700" },
  { id: "electronic", name: "Electronic", icon: "🎧", color: "from-purple-600 to-purple-700" },
  { id: "hiphop", name: "Hip Hop", icon: "🎤", color: "from-yellow-600 to-yellow-700" },
  { id: "rnb", name: "R&B", icon: "🎵", color: "from-pink-600 to-pink-700" },
  { id: "pop", name: "Pop", icon: "🎪", color: "from-cyan-600 to-cyan-700" },
  { id: "indie", name: "Indie", icon: "🎹", color: "from-amber-600 to-amber-700" },
]

export default function CreateRoom() {
  const router = useRouter()
  const [theme, setTheme] = useState<"dark" | "light">("dark")
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null)
  const [isPublic, setIsPublic] = useState(true)
  const [roomName, setRoomName] = useState("")
  const [generatedLink, setGeneratedLink] = useState("")
  const [copied, setCopied] = useState(false)
  const [isGenreDropdownOpen, setIsGenreDropdownOpen] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [isLinkGenerated, setIsLinkGenerated] = useState(false)
  const [animateSuccess, setAnimateSuccess] = useState(false)
  const linkInputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

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

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsGenreDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const generateRoomLink = () => {
    if (!selectedGenre || !roomName.trim()) {
      // Show validation error
      return
    }

    setIsGenerating(true)

    // Simulate API call
    setTimeout(() => {
      const randomString = Math.random().toString(36).substring(2, 10)
      const link = `https://symphozeon.com/room/${randomString}`
      setGeneratedLink(link)
      setIsGenerating(false)
      setIsLinkGenerated(true)
      setAnimateSuccess(true)

      setTimeout(() => {
        setAnimateSuccess(false)
      }, 2000)
    }, 1500)
  }

  const copyToClipboard = () => {
    if (linkInputRef.current) {
      linkInputRef.current.select()
      document.execCommand("copy")
      setCopied(true)

      setTimeout(() => {
        setCopied(false)
      }, 2000)
    }
  }

  const getSelectedGenreColor = () => {
    if (!selectedGenre) return "from-zinc-600 to-zinc-700"
    const genre = musicGenres.find((g) => g.id === selectedGenre)
    return genre ? genre.color : "from-zinc-600 to-zinc-700"
  }

  const getSelectedGenreIcon = () => {
    if (!selectedGenre) return "🎵"
    const genre = musicGenres.find((g) => g.id === selectedGenre)
    return genre ? genre.icon : "🎵"
  }

  const getSelectedGenreName = () => {
    if (!selectedGenre) return "Select Genre"
    const genre = musicGenres.find((g) => g.id === selectedGenre)
    return genre ? genre.name : "Select Genre"
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
      <div className="absolute inset-0 pointer-events-none">
        {/* Top meander pattern */}

        {/* Bottom meander pattern */}

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

      {/* Header */}
      <header
        className={`w-full py-4 px-6 flex items-center justify-between ${
          theme === "dark" ? "bg-zinc-900/50" : "bg-white/50"
        } backdrop-blur-md border-b ${theme === "dark" ? "border-zinc-800" : "border-zinc-200"}`}
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
                theme === "dark" ? "title-effect-dark" : "title-effect"
              }`}
            >
              Symphozeon
            </h1>
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            className={`${theme === "dark" ? "text-zinc-400 hover:text-white" : "text-zinc-600 hover:text-zinc-900"}`}
            onClick={() => router.push("/dashboard")}
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to Dashboard
          </Button>
          <ThemeToggle currentTheme={theme} setTheme={setTheme} />
        </div>
      </header>

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
            Create a New Room
          </h1>
          <p className={`text-lg ${theme === "dark" ? "text-zinc-400" : "text-zinc-600"}`}>
            Set up your music room and invite others to join
          </p>
        </motion.div>

        {/* Create room form */}
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
          <div className="space-y-6">
            {/* Room name input */}
            <div className="space-y-2">
              <label
                htmlFor="roomName"
                className={`block text-sm font-medium ${theme === "dark" ? "text-zinc-300" : "text-zinc-700"}`}
              >
                Room Name
              </label>
              <motion.div
                whileFocus={{ scale: 1.01 }}
                className={`relative rounded-md shadow-sm ${
                  !roomName.trim() && isLinkGenerated ? "ring-2 ring-red-500" : ""
                }`}
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
                  id="roomName"
                  value={roomName}
                  onChange={(e) => setRoomName(e.target.value)}
                  className={`block w-full pl-10 pr-3 py-3 border ${
                    theme === "dark"
                      ? "bg-zinc-800/50 border-zinc-700 text-white placeholder-zinc-500"
                      : "bg-white border-zinc-300 text-zinc-900 placeholder-zinc-400"
                  } rounded-md shadow-sm focus:outline-none focus:ring-2 ${
                    theme === "dark" ? "focus:ring-amber-500" : "focus:ring-amber-600"
                  } focus:border-transparent transition-all duration-200`}
                  placeholder="Enter a name for your room"
                />
              </motion.div>
              {!roomName.trim() && isLinkGenerated && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-red-500 mt-1"
                >
                  Room name is required
                </motion.p>
              )}
            </div>

            {/* Genre selection */}
            <div className="space-y-2">
              <label
                htmlFor="genre"
                className={`block text-sm font-medium ${theme === "dark" ? "text-zinc-300" : "text-zinc-700"}`}
              >
                Music Genre
              </label>
              <div className="relative" ref={dropdownRef}>
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => setIsGenreDropdownOpen(!isGenreDropdownOpen)}
                  className={`relative w-full flex items-center justify-between px-4 py-3 border ${
                    theme === "dark"
                      ? "bg-zinc-800/50 border-zinc-700 text-white hover:border-amber-600/50"
                      : "bg-white border-zinc-300 text-zinc-900 hover:border-amber-500/50"
                  } rounded-md shadow-sm focus:outline-none focus:ring-2 ${
                    theme === "dark" ? "focus:ring-amber-500" : "focus:ring-amber-600"
                  } focus:border-transparent transition-all duration-300 ${
                    !selectedGenre && isLinkGenerated ? "ring-2 ring-red-500" : ""
                  }`}
                >
                  <div className="flex items-center">
                    <span className="mr-2 text-xl">{getSelectedGenreIcon()}</span>
                    <span>{getSelectedGenreName()}</span>
                  </div>
                  <ChevronDown
                    size={18}
                    className={`transition-transform duration-200 ${isGenreDropdownOpen ? "rotate-180" : ""}`}
                  />
                </motion.button>

                <AnimatePresence>
                  {isGenreDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className={`absolute z-10 mt-1 w-full rounded-md shadow-lg ${
                        theme === "dark" ? "bg-zinc-800 border border-zinc-700" : "bg-white border border-zinc-200"
                      }`}
                    >
                      <div className="py-1 max-h-60 overflow-auto">
                        {musicGenres.map((genre) => (
                          <motion.button
                            key={genre.id}
                            whileHover={{ backgroundColor: theme === "dark" ? "#27272a" : "#f4f4f5" }}
                            onClick={() => {
                              setSelectedGenre(genre.id)
                              setIsGenreDropdownOpen(false)
                            }}
                            className={`w-full text-left px-4 py-2 flex items-center ${
                              selectedGenre === genre.id
                                ? theme === "dark"
                                  ? "bg-zinc-700 text-amber-500"
                                  : "bg-zinc-100 text-amber-600"
                                : theme === "dark"
                                  ? "text-white"
                                  : "text-zinc-900"
                            }`}
                          >
                            <span className="mr-2 text-xl">{genre.icon}</span>
                            <span>{genre.name}</span>
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              {!selectedGenre && isLinkGenerated && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-red-500 mt-1"
                >
                  Please select a genre
                </motion.p>
              )}
            </div>

            {/* Room visibility */}
            <div className="space-y-2">
              <label className={`block text-sm font-medium ${theme === "dark" ? "text-zinc-300" : "text-zinc-700"}`}>
                Room Visibility
              </label>
              <div className="flex space-x-4">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setIsPublic(true)}
                  className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-md transition-all duration-300 ${
                    isPublic
                      ? theme === "dark"
                        ? "bg-amber-600 hover:bg-amber-500 text-black"
                        : "bg-amber-600 hover:bg-amber-500 text-white"
                      : theme === "dark"
                        ? "bg-zinc-800 text-zinc-300 border border-zinc-700 hover:border-amber-600 hover:text-amber-400"
                        : "bg-white text-zinc-700 border border-zinc-300 hover:border-amber-600 hover:text-amber-700"
                  }`}
                >
                  <Globe size={18} />
                  <span>Public</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setIsPublic(false)}
                  className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-md transition-all duration-300 ${
                    !isPublic
                      ? theme === "dark"
                        ? "bg-amber-600 hover:bg-amber-500 text-black"
                        : "bg-amber-600 hover:bg-amber-500 text-white"
                      : theme === "dark"
                        ? "bg-zinc-800 text-zinc-300 border border-zinc-700 hover:border-amber-600 hover:text-amber-400"
                        : "bg-white text-zinc-700 border border-zinc-300 hover:border-amber-600 hover:text-amber-700"
                  }`}
                >
                  <Lock size={18} />
                  <span>Private</span>
                </motion.button>
              </div>
              <p className={`text-xs ${theme === "dark" ? "text-zinc-500" : "text-zinc-600"}`}>
                {isPublic
                  ? "Public rooms can be discovered by anyone on Symphozeon"
                  : "Private rooms can only be joined with the invite link"}
              </p>
            </div>

            {/* Generate link button */}
            <div className="pt-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={generateRoomLink}
                disabled={isGenerating}
                className={`w-full flex items-center justify-center space-x-2 px-6 py-4 rounded-md font-medium transition-all duration-300 ${
                  isGenerating
                    ? theme === "dark"
                      ? "bg-zinc-700 text-zinc-400 cursor-not-allowed"
                      : "bg-zinc-400 text-zinc-200 cursor-not-allowed"
                    : theme === "dark"
                      ? "bg-amber-600 hover:bg-amber-500 text-black hover:shadow-lg hover:shadow-amber-900/20"
                      : "bg-amber-600 hover:bg-amber-500 text-white hover:shadow-lg hover:shadow-amber-500/20"
                }`}
              >
                {isGenerating ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Generating...</span>
                  </>
                ) : (
                  <>
                    <Sparkles size={18} />
                    <span>Generate Room Link</span>
                  </>
                )}
              </motion.button>
            </div>

            {/* Generated link */}
            <AnimatePresence>
              {isLinkGenerated && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="pt-4"
                >
                  <div className="space-y-2">
                    <label
                      htmlFor="roomLink"
                      className={`block text-sm font-medium ${theme === "dark" ? "text-zinc-300" : "text-zinc-700"}`}
                    >
                      Room Invite Link
                    </label>
                    <div className="relative">
                      <input
                        ref={linkInputRef}
                        type="text"
                        id="roomLink"
                        value={generatedLink}
                        readOnly
                        className={`block w-full p-3 pr-12 py-3 border ${
                          theme === "dark"
                            ? "bg-zinc-800/50 border-zinc-700 text-white"
                            : "bg-white border-zinc-300 text-zinc-900"
                        } rounded-md shadow-sm focus:outline-none focus:ring-2 ${
                          theme === "dark" ? "focus:ring-amber-500" : "focus:ring-amber-600"
                        } focus:border-transparent transition-all duration-200`}
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={copyToClipboard}
                          className={`p-1 rounded-md transition-colors duration-300 ${
                            theme === "dark"
                              ? "text-zinc-400 hover:text-amber-500"
                              : "text-zinc-600 hover:text-amber-600"
                          }`}
                        >
                          {copied ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
                        </motion.button>
                      </div>
                    </div>
                    <p className={`text-xs ${theme === "dark" ? "text-zinc-500" : "text-zinc-600"}`}>
                      Share this link with others to invite them to your room
                    </p>
                  </div>

                  {/* Success animation */}
                  <AnimatePresence>
                    {animateSuccess && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.3 }}
                        className="mt-6 p-4 rounded-md bg-green-500/20 border border-green-500/30 flex items-center justify-center space-x-2"
                      >
                        <Check size={18} className="text-green-500" />
                        <span className={theme === "dark" ? "text-green-400" : "text-green-600"}>
                          Room created successfully!
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Action buttons */}
                  <div className="mt-6 flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => router.push("/dashboard")}
                      className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-md transition-all duration-300 ${
                        theme === "dark"
                          ? "border-zinc-700 text-zinc-200 hover:border-amber-600 hover:text-amber-400 hover:bg-zinc-800 border"
                          : "border-amber-600/70 bg-white text-amber-800 hover:border-amber-700 hover:bg-amber-50 hover:text-amber-900 border"
                      }`}
                    >
                      <ArrowLeft size={18} />
                      <span>Back to Dashboard</span>
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-md transition-all duration-300 ${
                        theme === "dark"
                          ? "bg-amber-600 hover:bg-amber-500 text-black hover:shadow-lg hover:shadow-amber-900/20"
                          : "bg-amber-600 hover:bg-amber-500 text-white hover:shadow-lg hover:shadow-amber-500/20"
                      }`}
                    >
                      <Users size={18} />
                      <span>Enter Room</span>
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-md transition-all duration-300 ${
                        theme === "dark"
                          ? "border border-amber-600 text-zinc-200 hover:bg-zinc-800 hover:text-amber-400"
                          : "border border-amber-600 text-amber-800 hover:bg-amber-50 hover:text-amber-900"
                      }`}
                    >
                      <Share2 size={18} />
                      <span>Share</span>
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Tips section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className={`mt-8 p-6 rounded-lg ${
            theme === "dark" ? "bg-zinc-900/70 border border-zinc-800" : "bg-white/70 border border-zinc-200"
          }`}
        >
          <h3 className={`text-lg font-medium mb-3 ${theme === "dark" ? "text-white" : "text-zinc-900"}`}>Room Tips</h3>
          <ul className={`list-disc list-inside space-y-2 ${theme === "dark" ? "text-zinc-400" : "text-zinc-600"}`}>
            <li>Public rooms can be discovered by anyone on the platform</li>
            <li>Private rooms are only accessible with the invite link</li>
            <li>You can change room settings after creation</li>
            <li>Room links expire after 24 hours of inactivity</li>
          </ul>
        </motion.div>
      </main>
    </div>
  )
}

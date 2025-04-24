"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { Users, Headphones, Radio, Disc, Mic2, Play, Pause, Heart, Clock, Music } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import type { JSX } from "react"
import Threads from "./Threads"

interface FeaturedRoomsProps {
  theme: "dark" | "light"
}

interface Room {
  id: string
  name: string
  listeners: number
  genre: string
  tags: string[]
  description: string
  currentTrack: {
    title: string
    artist: string
    duration: number
    progress: number
    albumArt: string
  }
  nextTrack: {
    title: string
    artist: string
  }
  host: {
    name: string
    avatar: string
  }
  icon: JSX.Element
  isLive: boolean
}

export default function FeaturedRooms({ theme }: FeaturedRoomsProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const [activeRoom, setActiveRoom] = useState<string | null>(null)
  const [playingRoom, setPlayingRoom] = useState<string | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in")
          }
        })
      },
      { threshold: 0.1 },
    )

    const roomCards = document.querySelectorAll(".room-card")
    roomCards.forEach((card, index) => {
      card.setAttribute("style", `animation-delay: ${index * 150}ms`)
      observer.observe(card)
    })

    const interval = setInterval(() => {
      setRooms((currentRooms) =>
        currentRooms.map((room) => {
          if (playingRoom === room.id) {
            const newProgress = room.currentTrack.progress + 1
            return {
              ...room,
              currentTrack: {
                ...room.currentTrack,
                progress: newProgress > room.currentTrack.duration ? 0 : newProgress,
              },
            }
          }
          return room
        }),
      )
    }, 1000)

    return () => {
      roomCards.forEach((card) => {
        observer.unobserve(card)
      })
      clearInterval(interval)
    }
  }, [playingRoom])

  const [rooms, setRooms] = useState<Room[]>([
    {
      id: "room1",
      name: "Chill Lo-Fi Beats",
      listeners: 42,
      genre: "Lo-Fi",
      tags: ["Study", "Relax", "Beats"],
      description: "Relaxing beats to study and unwind. Perfect for focused work sessions or calm evenings.",
      currentTrack: {
        title: "Sleepy Fish - Fireflies",
        artist: "Sleepy Fish",
        duration: 180,
        progress: 75,
        albumArt: "/placeholder.svg?height=80&width=80",
      },
      nextTrack: {
        title: "Kupla - Kingdom in Blue",
        artist: "Kupla",
      },
      host: {
        name: "MellowMaster",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      icon: <Headphones size={24} />,
      isLive: true,
    },
    {
      id: "room2",
      name: "Classic Rock Anthems",
      listeners: 78,
      genre: "Rock",
      tags: ["70s", "80s", "Guitar"],
      description:
        "Timeless rock hits from the 70s and 80s. Experience the golden age of rock with fellow enthusiasts.",
      currentTrack: {
        title: "Led Zeppelin - Stairway to Heaven",
        artist: "Led Zeppelin",
        duration: 240,
        progress: 120,
        albumArt: "/placeholder.svg?height=80&width=80",
      },
      nextTrack: {
        title: "Queen - Bohemian Rhapsody",
        artist: "Queen",
      },
      host: {
        name: "RockLegend",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      icon: <Radio size={24} />,
      isLive: true,
    },
    {
      id: "room3",
      name: "Deep House Vibes",
      listeners: 56,
      genre: "Electronic",
      tags: ["House", "Deep", "Electronic"],
      description:
        "Smooth electronic beats with deep basslines. Let the rhythm guide your day with these hypnotic tracks.",
      currentTrack: {
        title: "Lane 8 - Brightest Lights",
        artist: "Lane 8",
        duration: 210,
        progress: 45,
        albumArt: "/placeholder.svg?height=80&width=80",
      },
      nextTrack: {
        title: "Yotto - Nova",
        artist: "Yotto",
      },
      host: {
        name: "BeatMaster",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      icon: <Disc size={24} />,
      isLive: false,
    },
    {
      id: "room4",
      name: "Jazz & Soul Collective",
      listeners: 34,
      genre: "Jazz",
      tags: ["Soul", "Smooth", "Saxophone"],
      description: "Soulful jazz classics and modern interpretations. Immerse yourself in the rich textures of jazz.",
      currentTrack: {
        title: "Kamasi Washington - Truth",
        artist: "Kamasi Washington",
        duration: 195,
        progress: 100,
        albumArt: "/placeholder.svg?height=80&width=80",
      },
      nextTrack: {
        title: "Robert Glasper - Black Radio",
        artist: "Robert Glasper",
      },
      host: {
        name: "JazzCat",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      icon: <Mic2 size={24} />,
      isLive: true,
    },
  ])

  const handlePlayToggle = (roomId: string) => {
    setPlayingRoom(playingRoom === roomId ? null : roomId)
  }

  const handleLikeRoom = (roomId: string, event: React.MouseEvent) => {
    event.stopPropagation()
    // Add like functionality here
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <section id="featured-rooms" ref={sectionRef} className="py-20 relative">
      {/* Threads background */}
      <Threads 
        theme={theme} 
        amplitude={0.5} 
        distance={0.2} 
        enableMouseInteraction={true} 
        className="opacity-10"
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="max-w-3xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2
            className={`text-3xl md:text-4xl font-serif font-bold mb-4 tracking-wide decorative-underline ${theme === "dark" ? "text-white" : "text-zinc-900"}`}
          >
            Featured Public Jam Rooms
          </h2>
          <div className="w-24 h-1 mx-auto mb-6 bg-gradient-to-r from-purple-500 to-amber-500"></div>
          <p className={`${theme === "dark" ? "text-zinc-400" : "text-zinc-600"} max-w-2xl mx-auto`}>
            Join these popular rooms and start experiencing music together. Each room offers a unique atmosphere and
            carefully curated tracks to match your mood and taste.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {rooms.map((room) => (
            <motion.div
              key={room.id}
              variants={itemVariants}
              className={`room-card relative p-6 rounded-lg transition-all duration-300 group ${
                theme === "dark"
                  ? "bg-zinc-900/50 border border-zinc-800 hover:border-amber-600/50 shadow-lg shadow-purple-900/10"
                  : "bg-white border border-zinc-200 hover:border-amber-600/50 shadow-lg shadow-amber-500/10"
              }`}
              onMouseEnter={() => setActiveRoom(room.id)}
              onMouseLeave={() => setActiveRoom(null)}
            >
              {/* Ambient light on hover */}
              <div
                className={`absolute inset-0 opacity-0 group-hover:opacity-40 transition-opacity duration-500 rounded-lg blur-xl ${
                  theme === "dark"
                    ? "bg-gradient-to-br from-purple-600/30 to-amber-500/30"
                    : "bg-gradient-to-br from-amber-200/30 to-amber-500/30"
                }`}
              />

              {/* Greek pattern top */}
              <div className="h-2 w-full overflow-hidden absolute top-0 left-0 right-0">
              </div>

              <div className="flex items-center justify-between mb-4 mt-3">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 ${
                    activeRoom === room.id
                      ? theme === "dark"
                        ? "bg-amber-600 text-black"
                        : "bg-amber-500 text-white"
                      : theme === "dark"
                        ? "bg-zinc-800 text-amber-500"
                        : "bg-amber-50 text-amber-600"
                  }`}
                >
                  {room.icon}
                </div>
                <div className="flex items-center space-x-2">
                  {room.isLive && (
                    <span className="flex items-center px-2 py-1 rounded-full bg-red-500 text-white text-xs">
                      <span className="w-2 h-2 bg-white rounded-full mr-1 animate-pulse"></span>
                      LIVE
                    </span>
                  )}
                  <span
                    className={`text-sm px-3 py-1 rounded-full transition-colors duration-300 ${
                      theme === "dark"
                        ? "bg-zinc-800 text-zinc-400 group-hover:bg-zinc-700 group-hover:text-amber-400"
                        : "bg-zinc-100 text-zinc-600 group-hover:bg-amber-50 group-hover:text-amber-700"
                    }`}
                  >
                    {room.genre}
                  </span>
                </div>
              </div>

              <h3
                className={`text-lg font-serif font-bold mb-2 transition-colors duration-300 ${
                  theme === "dark"
                    ? "text-white group-hover:text-amber-400"
                    : "text-zinc-900 group-hover:text-amber-600"
                }`}
              >
                {room.name}
              </h3>

              <div className="flex items-center mb-2">
                <Users size={16} className={theme === "dark" ? "text-zinc-500" : "text-zinc-400"} />
                <span className={`ml-2 text-sm ${theme === "dark" ? "text-zinc-400" : "text-zinc-600"}`}>
                  {room.listeners} listening now
                </span>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1 mb-3">
                {room.tags.map((tag, i) => (
                  <Badge
                    key={i}
                    variant="outline"
                    className={`text-xs ${
                      theme === "dark"
                        ? "bg-zinc-800 text-zinc-400 border-zinc-700"
                        : "bg-zinc-100 text-zinc-600 border-zinc-200"
                    }`}
                  >
                    #{tag}
                  </Badge>
                ))}
              </div>

              <p className={`text-sm ${theme === "dark" ? "text-zinc-500" : "text-zinc-600"}`}>{room.description}</p>

              {/* Current track info */}
              <div className={`mt-4 pt-4 border-t ${theme === "dark" ? "border-zinc-800" : "border-zinc-200"}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Music size={14} className={theme === "dark" ? "text-amber-500" : "text-amber-600"} />
                    <span
                      className={`ml-2 text-xs font-medium ${theme === "dark" ? "text-zinc-300" : "text-zinc-700"}`}
                    >
                      Now Playing:
                    </span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handlePlayToggle(room.id)
                    }}
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                      theme === "dark"
                        ? "bg-zinc-800 hover:bg-amber-600 text-white"
                        : "bg-amber-100 hover:bg-amber-500 text-amber-800 hover:text-white"
                    }`}
                  >
                    {playingRoom === room.id ? <Pause size={16} /> : <Play size={16} />}
                  </button>
                </div>

                <div className="flex items-center mt-2">
                  <div className="w-10 h-10 rounded overflow-hidden mr-3 flex-shrink-0">
                    <img
                      src={room.currentTrack.albumArt || "/placeholder.svg"}
                      alt="Album art"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-sm font-medium truncate ${theme === "dark" ? "text-zinc-300" : "text-zinc-800"}`}
                    >
                      {room.currentTrack.title}
                    </p>
                    <p className={`text-xs truncate ${theme === "dark" ? "text-zinc-500" : "text-zinc-500"}`}>
                      {room.currentTrack.artist}
                    </p>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="mt-2">
                  <Progress
                    value={(room.currentTrack.progress / room.currentTrack.duration) * 100}
                    className={`h-1 ${theme === "dark" ? "bg-zinc-800" : "bg-zinc-200"}`}
                    indicatorClassName={theme === "dark" ? "bg-amber-600" : "bg-amber-500"}
                  />
                  <div className="flex justify-between mt-1">
                    <span className={`text-xs ${theme === "dark" ? "text-zinc-500" : "text-zinc-500"}`}>
                      {formatTime(room.currentTrack.progress)}
                    </span>
                    <span className={`text-xs ${theme === "dark" ? "text-zinc-500" : "text-zinc-500"}`}>
                      {formatTime(room.currentTrack.duration)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Greek pattern bottom */}
              <div className="mt-4 h-2 w-full overflow-hidden">
              </div>

              {/* Like button */}
              <button
                onClick={(e) => handleLikeRoom(room.id, e)}
                className={`absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100 ${
                  theme === "dark"
                    ? "bg-zinc-800 hover:bg-amber-600 text-white"
                    : "bg-white hover:bg-amber-500 text-amber-600 hover:text-white"
                }`}
              >
                <Heart size={16} />
              </button>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-10 text-center">
          <Button
            className={`${
              theme === "dark"
                ? "bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700"
                : "bg-white hover:bg-zinc-50 text-zinc-800 border border-zinc-200"
            }`}
            variant="outline"
          >
            Explore All Rooms
          </Button>
        </div>
      </div>
    </section>
  )
}

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`
}
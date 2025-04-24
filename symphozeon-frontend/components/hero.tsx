"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import Aurora from "./Aurora"

interface HeroProps {
  theme: "dark" | "light"
}

export default function Hero({ theme }: HeroProps) {
  const [scrollY, setScrollY] = useState(0)
  const [isHovering, setIsHovering] = useState(false)
  const [activeCard, setActiveCard] = useState(0)

  

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Auto-rotate through cards
  useEffect(() => {
    if (isHovering) return

    const interval = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % 3)
    }, 3000)

    return () => clearInterval(interval)
  }, [isHovering])

  const parallaxOffset = Math.min(scrollY * 0.2, 30)

  return (
    <section className="relative min-h-screen flex items-center pt-16">
      {/* Aurora Background with improved light mode colors */}
      <Aurora theme={theme} />

      {/* Background with Greek-inspired patterns */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Top meander pattern */}
        <div className="absolute top-0 left-0 right-0 h-16 opacity-10">
        </div>

        {/* Bottom meander pattern */}
        <div className="absolute bottom-0 left-0 right-0 h-16 opacity-10">
        </div>

        {/* Ambient glow - updated for better light mode visibility */}
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
        ></motion.div>

        {/* Animated particles - adjusted for light mode */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className={`absolute w-1 h-1 rounded-full ${
                theme === "dark" ? "bg-amber-500/30" : "bg-amber-400/40"
              }`}
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

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            className={`font-serif text-5xl md:text-7xl font-bold mb-6 tracking-wide py-2 ${
              theme === "dark" ? "text-white" : "text-zinc-900"
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Symphozeon
          </motion.h1>

          {/* Greek-inspired decorative element */}
          <motion.div
            className="w-40 h-4 mx-auto mb-6 relative overflow-hidden"
            initial={{ width: 0 }}
            animate={{ width: "10rem" }}
            transition={{ duration: 1, delay: 0.5 }}
          >
          </motion.div>

          <motion.p
            className={`text-xl md:text-2xl mb-8 font-serif italic ${
              theme === "dark" ? "text-zinc-300" : "text-zinc-700"
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
          >
            Boil the silence, join the sound.
          </motion.p>

          <motion.p
            className={`text-lg mb-8 ${
              theme === "dark" ? "text-zinc-400" : "text-zinc-600"
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.9 }}
          >
            Real-time collaborative music experiences
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
          >
            <Link href="#featured-rooms">
              <Button
                size="lg"
                className={`text-lg px-8 py-6 transition-all duration-300 ${
                  theme === "dark"
                    ? "bg-amber-600 hover:bg-amber-500 text-black hover:scale-105 shadow-lg shadow-amber-900/20"
                    : "bg-amber-500 hover:bg-amber-400 text-white hover:scale-105 shadow-lg shadow-amber-400/20"
                }`}
              >
                Join the Jam
              </Button>
            </Link>
            <Link href="#features">
              <Button
                variant="outline"
                size="lg"
                className={`text-lg px-8 py-6 transition-all duration-300 ${
                  theme === "dark"
                    ? "border-amber-600 text-zinc-200 hover:bg-zinc-800 hover:text-amber-400 hover:scale-105"
                    : "border-amber-500/70 bg-white text-amber-700 hover:border-amber-600 hover:bg-amber-50 hover:text-amber-800 hover:scale-105"
                }`}
              >
                Explore Rooms
              </Button>
            </Link>
          </motion.div>

          {/* Greek-inspired cards with improved light mode colors */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.3 }}
            style={{ transform: `translateY(-${parallaxOffset}px)` }}
          >
            {[
              { title: "Create", desc: "Start your musical journey with custom rooms tailored to your taste" },
              { title: "Connect", desc: "Join a vibrant community of music lovers from around the world" },
              { title: "Discover", desc: "Explore new artists, genres, and tracks recommended for you" },
            ].map((card, index) => (
              <motion.div
                key={index}
                className={`relative overflow-hidden rounded-lg transition-all duration-500 hover:scale-105 hover-lift group ${
                  theme === "dark"
                    ? "bg-zinc-900/70 border border-zinc-800 hover:border-amber-600/50 shadow-lg shadow-purple-900/10"
                    : "bg-white/90 border border-zinc-200 hover:border-amber-500/50 shadow-lg shadow-amber-300/10"
                } ${activeCard === index ? "ring-2 ring-amber-500" : ""}`}
                onMouseEnter={() => {
                  setIsHovering(true)
                  setActiveCard(index)
                }}
                onMouseLeave={() => setIsHovering(false)}
                whileHover={{ y: -5 }}
                animate={
                  activeCard === index
                    ? { scale: 1.03, transition: { duration: 0.3 } }
                    : { scale: 1, transition: { duration: 0.3 } }
                }
              >
                {/* Card ambient light - updated for light mode */}
                <motion.div
                  className={`absolute inset-0 opacity-0 group-hover:opacity-40 transition-opacity duration-500 blur-xl ${
                    theme === "dark"
                      ? "bg-gradient-to-br from-purple-600/30 to-amber-500/30"
                      : "bg-gradient-to-br from-purple-300/30 to-amber-300/30"
                  }`}
                  animate={
                    activeCard === index
                      ? { opacity: 0.4, transition: { duration: 0.3 } }
                      : { opacity: 0, transition: { duration: 0.3 } }
                  }
                />

                {/* Greek pattern top */}
                <div className="h-3 w-full overflow-hidden">
                  <div></div>
                </div>

                <div className="p-6">
                  <motion.h3
                    className={`text-xl font-serif font-bold mb-2 transition-colors duration-300 ${
                      theme === "dark"
                        ? "text-amber-500 group-hover:text-amber-400"
                        : "text-amber-600 group-hover:text-amber-500"
                    }`}
                    animate={
                      activeCard === index
                        ? { scale: 1.05, transition: { duration: 0.3 } }
                        : { scale: 1, transition: { duration: 0.3 } }
                    }
                  >
                    {card.title}
                  </motion.h3>
                  <p className={theme === "dark" ? "text-zinc-400" : "text-zinc-600"}>{card.desc}</p>
                </div>

                {/* Greek pattern bottom */}
                <div className="h-3 w-full overflow-hidden">
                  <div></div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "loop",
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={theme === "dark" ? "text-amber-500" : "text-amber-500"}
        >
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </motion.div>
    </section>
  )
}
"use client"

import { useRef, useState } from "react"
import { Music, Users, Compass } from "lucide-react"
import { motion } from "framer-motion"
import Orb from "./Orb"

export default function HowItWorks({ theme }) {
  const sectionRef = useRef(null)
  const [hoveredOrb, setHoveredOrb] = useState(null)

  const steps = [
    {
      number: "01",
      title: "Create or join a jam room",
      description:
        "Start your own music room with custom settings or join an existing one based on your favorite genres, artists, and musical vibes.",
      icon: <Music size={28} />,
      color: theme === "dark" ? "from-purple-600 to-amber-500" : "from-amber-400 to-amber-600",
      hue: 270,
    },
    {
      number: "02",
      title: "Listen, chat, and vibe in real time",
      description:
        "Experience music together with perfect synchronization across all devices. Chat with other listeners and react to tracks.",
      icon: <Users size={28} />,
      color: theme === "dark" ? "from-amber-500 to-purple-600" : "from-amber-500 to-amber-700",
      hue: 30,
    },
    {
      number: "03",
      title: "Discover music with the community",
      description:
        "Find new artists and tracks through community recommendations, curated playlists, and smart suggestions.",
      icon: <Compass size={28} />,
      color: theme === "dark" ? "from-purple-500 to-amber-600" : "from-amber-300 to-amber-500",
      hue: 200,
    },
  ]

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className={`py-20 ${theme === "dark" ? "bg-zinc-900/50" : "bg-amber-50/30"}`}
    >
      <div className="container mx-auto px-4">
        <motion.div
          className="max-w-3xl mx-auto text-center mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2
            className={`text-3xl md:text-4xl font-serif font-bold mb-4 ${theme === "dark" ? "text-white" : "text-zinc-900"}`}
          >
            How It Works
          </h2>
          <div className="w-24 h-1 mx-auto mb-6 bg-gradient-to-r from-purple-500 to-amber-500"></div>
          <p className={`${theme === "dark" ? "text-zinc-400" : "text-zinc-600"} max-w-2xl mx-auto`}>
            Join the Symphorem community in three simple steps. Our intuitive platform makes it easy to connect with
            fellow music lovers and discover new sounds together.
          </p>
        </motion.div>

        <div className="flex flex-col md:grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div 
              key={index}
              className="relative"
              onMouseEnter={() => setHoveredOrb(index)}
              onMouseLeave={() => setHoveredOrb(null)}
            >
              <div className="relative h-[400px] w-full rounded-lg overflow-hidden">
                <Orb
                  hue={step.hue}
                  hoverIntensity={0.5}
                  rotateOnHover={true}
                  forceHoverState={hoveredOrb === index}
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10">
                  <div className="text-sm font-bold font-mono px-3 py-1 rounded-full bg-amber-500 text-white shadow-md mb-4">
                    {step.number}
                  </div>

                  <div
                    className={`w-14 h-14 mx-auto mb-4 rounded-full flex items-center justify-center bg-gradient-to-br ${step.color} text-white`}
                  >
                    {step.icon}
                  </div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    className="text-center px-4"
                  >
                    <h3
                      className={`text-lg font-bold font-serif mb-3 ${theme === "dark" ? "text-white" : "text-zinc-900"}`}
                    >
                      {step.title}
                    </h3>
                    <p className={`text-sm leading-snug ${theme === "dark" ? "text-zinc-300" : "text-zinc-700"}`}>
                      {step.description}
                    </p>
                  </motion.div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
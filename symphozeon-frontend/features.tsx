"use client"
import { Users2, Rss, Share2, X } from "lucide-react"
import { motion, AnimatePresence, type PanInfo } from "framer-motion"

color: theme === "dark" ? "from-purple-600 to-amber-500" : "from-amber-400 to-amber-600",
},
{
  icon: (<Users2 size={40} className="feature-icon" />), title
  : "Artist fan forums",
      description:
        "Connect with fellow fans of your favorite artists in dedicated discussion spaces. Share concert experiences, rare tracks, and deep dive into artist discographies together.",
      details: [
        "Artist-specific discussion threads",
        "Concert and tour information sharing",
        "Collaborative artist timelines and history",
        "Fan art and cover song showcases",
      ],
      color: theme === "dark" ? "from-amber-500 to-purple-600" : "from-amber-500 to-amber-700",
}
,
{
  icon: (<Rss size={40} className="feature-icon" />), title
  : "Personalized music feed",
      description:
        "Get a customized stream of music content based on your listening habits, followed artists, and friends' activities. Never miss new releases from your favorites.",
      details: [
        "Daily personalized recommendations",
        "New release notifications for followed artists",
        "Friend activity feed with listening insights",
        "Trending tracks within your taste profile",
      ],
      color: theme === "dark" ? "from-purple-500 to-amber-600" : "from-amber-300 to-amber-500",
}
,
{
  icon: (<Share2 size={40} className="feature-icon" />), title
  : "Playlist sharing & collaboration",
      description:
        "Create, share and collaborate on playlists with friends or the community. Build the perfect soundtrack together for any mood, event or theme.",
      details: [
        "Real-time collaborative playlist editing",
        "Public, private or invite-only sharing options",
        "Playlist version history and restoration",
        "Themed playlist challenges and competitions",
      ],
      color: theme === "dark" ? "from-purple-600 to-amber-500" : "from-amber-400 to-amber-600",
}
,
  ])

  useEffect(() =>
{
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setAnimateIcons(true)
        }
      })
    },
    { threshold: 0.1 },
  )

  if (sectionRef.current) {
    observer.observe(sectionRef.current)
  }

  return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
}
, [])

const handleCardClick = (index: number) => {
  if (expandedFeature === index) {
    setExpandedFeature(null)
  } else {
    setExpandedFeature(index)
  }
}

const handleDragEnd = (info: PanInfo) => {
  // If dragged far enough in any direction
  if (Math.abs(info.offset.x) > 100 || Math.abs(info.offset.y) > 100) {
    // Move the first feature to the end of the array
    setFeatures((prevFeatures) => {
      const newFeatures = [...prevFeatures]
      const [first] = newFeatures.splice(0, 1)
      return [...newFeatures, first]
    })
  }
}

// Animation variants for Framer Motion
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const iconVariants = {
  initial: { scale: 1 },
  animate: {
    scale: [1, 1.2, 1],
    rotate: [0, 10, -10, 0],
    transition: {
      duration: 2,
      repeat: Number.POSITIVE_INFINITY,
      repeatType: "reverse" as const,
      ease: "easeInOut",
    },
  },
}

return (
    <section id="features" ref={sectionRef} className="py-20 relative">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-600/30 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-600/30 to-transparent"></div>

      {/* Ambient background */}
      <div
        className={`absolute inset-0 opacity-20 ${
          theme === "dark"
            ? "bg-[radial-gradient(ellipse_at_center,rgba(120,40,140,0.1),transparent_70%)]"
            : "bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.05),transparent_70%)]"
        }`}
      />

      <div className="container mx-auto px-4">
        <motion.div
          className="max-w-3xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2
            className={`text-3xl md:text-4xl font-serif font-bold mb-4 tracking-wide decorative-underline ${
              theme === "dark" ? "text-white" : "text-zinc-900"
            }`}
          >
            Core Features
          </h2>
          <div className="w-24 h-1 mx-auto mb-6 bg-gradient-to-r from-purple-500 to-amber-500"></div>
          <p className={`${theme === "dark" ? "text-zinc-400" : "text-zinc-600"} max-w-2xl mx-auto`}>
            Discover what makes Symphozeon the ultimate collaborative music platform. Our unique features create an
            immersive social experience centered around the joy of shared musical discovery.
          </p>
        </motion.div>

        {/* Card Stack */}
        <div className="relative h-[450px] flex justify-center items-center">
          <div className="relative w-full max-w-md mx-auto flex items-center justify-center">
            <AnimatePresence mode="popLayout">
              {features.slice(0, 3).map((feature, index) => (
                <motion.div
                  key={`${feature.title}-${index}`}
                  className={`absolute w-full max-w-md cursor-grab active:cursor-grabbing ${
                    expandedFeature === index ? "z-50" : ""
                  }`}
                  initial={{
                    scale: 1 - index * 0.05,
                    y: index * 4,
                    zIndex: 3 - index,
                    rotateZ: index % 2 === 0 ? -1 : 1,
                  }}
                  animate={{
                    scale: expandedFeature === index ? 1.05 : 1 - index * 0.05,
                    y: expandedFeature === index ? -10 : index * 4,
                    zIndex: expandedFeature === index ? 10 : 3 - index,
                    rotateZ: expandedFeature === index ? 0 : index % 2 === 0 ? -1 : 1,
                    transition: { duration: 0.3 },
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.8,
                    transition: { duration: 0.3 },
                  }}
                  drag
                  dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                  dragElastic={0.7}
                  onDragEnd={(_, info) => handleDragEnd(info)}
                  onClick={() => index === 0 && handleCardClick(index)}
                  whileTap={{ scale: 1.02 }}
                >
                  <div
                    className={`p-6 rounded-lg transition-all duration-300 h-full ${
                      expandedFeature === index ? "shadow-xl" : ""
                    } ${
                      theme === "dark"
                        ? "bg-zinc-900/90 border border-zinc-800 shadow-lg shadow-purple-900/10"
                        : "bg-white border border-zinc-200 shadow-lg shadow-amber-500/10"
                    }`}
                  >
                    {/* Greek pattern top */}
                    <div className="h-2 w-full overflow-hidden mb-4">
                      <div
                        className={`w-full h-full ${theme === "dark" ? "greek-wave-dark" : "greek-wave-light"}`}
                      ></div>
                    </div>

                    <div className="flex items-center mb-4">
                      <motion.div
                        className={`w-16 h-16 rounded-full flex items-center justify-center mr-4 bg-gradient-to-br ${feature.color} text-white`}
                        variants={iconVariants}
                        animate={animateIcons ? "animate" : "initial"}
                      >
                        {feature.icon}
                      </motion.div>

                      <h3
                        className={`text-xl font-serif font-bold transition-colors duration-300 ${
                          theme === "dark" ? "text-white" : "text-zinc-900"
                        }`}
                      >
                        {feature.title}
                      </h3>
                    </div>

                    <p className={`${theme === "dark" ? "text-zinc-400" : "text-zinc-600"} mb-4`}>
                      {feature.description}
                    </p>

                    {/* Feature details that appear when expanded */}
                    <AnimatePresence>
                      {expandedFeature === index && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div
                            className={`pt-4 mt-4 border-t ${theme === "dark" ? "border-zinc-700" : "border-zinc-200"}`}
                          >
                            <h4
                              className={`font-medium mb-2 ${theme === "dark" ? "text-amber-400" : "text-amber-600"}`}
                            >
                              Key Benefits:
                            </h4>
                            <ul className="space-y-2">
                              {feature.details.map((detail, i) => (
                                <li
                                  key={i}
                                  className={`flex items-start ${theme === "dark" ? "text-zinc-400" : "text-zinc-600"}`}
                                >
                                  <span className={`mr-2 ${theme === "dark" ? "text-amber-500" : "text-amber-600"}`}>
                                    •
                                  </span>
                                  <span>{detail}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Greek pattern bottom */}
                    <div className="h-2 w-full overflow-hidden mt-4">
                      <div
                        className={`w-full h-full ${theme === "dark" ? "greek-wave-dark" : "greek-wave-light"}`}
                      ></div>
                    </div>

                    {/* Close button for expanded card */}
                    {expandedFeature === index && (
                      <motion.button
                        className={`absolute top-2 right-2 p-1 rounded-full ${
                          theme === "dark"
                            ? "bg-zinc-800 text-zinc-400 hover:text-white"
                            : "bg-zinc-100 text-zinc-500 hover:text-zinc-900"
                        }`}
                        onClick={(e) => {
                          e.stopPropagation()
                          setExpandedFeature(null)
                        }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                      >
                        <X size={16} />
                      </motion.button>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Instructions for interaction */}
        <motion.div
          className="text-center mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <p className={`text-sm ${theme === "dark" ? "text-zinc-500" : "text-zinc-600"}`}>
            <span className="inline-block mr-2">👆</span> Tap a card to expand or{" "}
            <span className="inline-block mx-2">👋</span> swipe to browse features
          </p>
        </motion.div>
      </div>
    </section>
  )
}

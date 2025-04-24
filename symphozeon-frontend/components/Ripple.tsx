"use client"

import React from "react"
import { cn } from "@/lib/utils"

interface RippleProps {
  className?: string
  mainCircleSize?: number
  mainCircleOpacity?: number
  numCircles?: number
  theme?: "dark" | "light"
}

export const Ripple = React.memo(function Ripple({
  className,
  mainCircleSize = 150,
  mainCircleOpacity = 0.24,
  numCircles = 4,
  theme = "dark",
}: RippleProps) {
  const colors = theme === "dark" 
    ? {
        border: "hsl(37, 92%, 55%)", // amber-500
        bg: "hsla(37, 92%, 55%, 0.1)" // amber-500 with opacity
      } 
    : {
        border: "hsl(270, 100%, 70%)", // purple-400
        bg: "hsla(270, 100%, 70%, 0.1)" // purple-400 with opacity
      }

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 select-none [mask-image:radial-gradient(ellipse_at_center,white,transparent)]",
        className
      )}
    >
      {Array.from({ length: numCircles }, (_, i) => {
        const size = mainCircleSize + i * 100
        const opacity = mainCircleOpacity - i * 0.05
        const animationDelay = `${i * 0.5}s`

        return (
          <div
            key={i}
            className="absolute rounded-full border animate-ripple"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              opacity,
              animationDelay,
              borderColor: colors.border,
              backgroundColor: colors.bg,
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              borderWidth: "1px",
            }}
          />
        )
      })}
    </div>
  )
})

Ripple.displayName = "Ripple"
"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Music, ArrowRight, Eye, EyeOff, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import ThemeToggle from "@/components/theme-toggle"

export default function LoginPage() {
  const router = useRouter()
  const [theme, setTheme] = useState<"dark" | "light">("dark")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formState, setFormState] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })
  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
  })

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

  // Simulated login function
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    // Basic validation
    const errors = {
      email: !formState.email ? "Email is required" : !/\S+@\S+\.\S+/.test(formState.email) ? "Email is invalid" : "",
      password: !formState.password
        ? "Password is required"
        : formState.password.length < 6
          ? "Password must be at least 6 characters"
          : "",
    }

    setFormErrors(errors)

    if (errors.email || errors.password) {
      return
    }

    setIsLoading(true)

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      router.push("/dashboard")
    } catch (error) {
      console.error("Login failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))

    // Clear error when user types
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  return (
    <div
      className={`min-h-screen w-full flex items-center justify-center transition-colors duration-500 ${
        theme === "dark"
          ? "bg-zinc-950 text-white bg-[radial-gradient(ellipse_at_top,rgba(120,40,140,0.15),transparent_70%),radial-gradient(ellipse_at_bottom,rgba(120,40,140,0.1),transparent_70%)]"
          : "bg-[#fcfcf8] text-zinc-900 bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.1),transparent_70%),radial-gradient(ellipse_at_bottom,rgba(212,175,55,0.05),transparent_70%)]"
      }`}
    >
      {/* Background ambient elements */}
      <div className="absolute inset-0 overflow-hidden">
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
          {Array.from({ length: 20 }).map((_, i) => (
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

      {/* Theme toggle button */}
      <div className="absolute top-4 right-4 z-50">
        <ThemeToggle currentTheme={theme} setTheme={setTheme} />
      </div>

      <div className="container relative z-10 px-4 mx-auto py-8">
        <div className="max-w-md mx-auto">
          {/* Logo and title */}
          <div className="text-center mb-6">
            <Link href="/" className="inline-block group">
              <div className="flex items-center justify-center mb-4">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 ${
                    theme === "dark"
                      ? "bg-zinc-800 text-amber-500 border border-amber-600/50"
                      : "bg-white text-amber-600 border border-amber-500 shadow-md shadow-amber-200"
                  }`}
                >
                  <Music size={24} />
                </div>
              </div>
              <motion.h1
                className={`font-serif text-3xl font-bold mb-2 tracking-wide ${
                  theme === "dark" ? "title-effect-dark" : "title-effect"
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                Symphozeon
              </motion.h1>
            </Link>

            {/* Greek-inspired decorative element */}
          </div>

          {/* Login card */}
          <motion.div
            className={`p-8 rounded-lg relative overflow-hidden ${
              theme === "dark"
                ? "bg-zinc-900/70 border border-zinc-800 shadow-lg shadow-purple-900/10"
                : "bg-white/70 border border-zinc-200 shadow-lg shadow-amber-500/10"
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Greek pattern top */}

            <h2 className={`text-2xl font-serif font-bold mb-6 ${theme === "dark" ? "text-white" : "text-zinc-900"}`}>
              Welcome Back
            </h2>

            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className={`text-sm font-medium ${theme === "dark" ? "text-zinc-300" : "text-zinc-700"}`}
                >
                  Email
                </Label>
                <div className="relative">
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={formState.email}
                    onChange={handleInputChange}
                    className={`bg-opacity-70 transition-all duration-300 ${
                      theme === "dark"
                        ? "bg-zinc-800 border-zinc-700 text-white focus:border-amber-500 hover:border-amber-600/70 hover:shadow-[0_0_15px_rgba(217,119,6,0.15)]"
                        : "bg-white border-zinc-300 text-zinc-900 focus:border-amber-600 hover:border-amber-500/70 hover:shadow-[0_0_15px_rgba(217,119,6,0.1)]"
                    } ${formErrors.email ? "border-red-500" : ""}`}
                  />
                  {formErrors.email && (
                    <motion.p
                      className="text-red-500 text-xs mt-1"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {formErrors.email}
                    </motion.p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className={`text-sm font-medium ${theme === "dark" ? "text-zinc-300" : "text-zinc-700"}`}
                >
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formState.password}
                    onChange={handleInputChange}
                    className={`bg-opacity-70 transition-all duration-300 ${
                      theme === "dark"
                        ? "bg-zinc-800 border-zinc-700 text-white focus:border-amber-500 hover:border-amber-600/70 hover:shadow-[0_0_15px_rgba(217,119,6,0.15)]"
                        : "bg-white border-zinc-300 text-zinc-900 focus:border-amber-600 hover:border-amber-500/70 hover:shadow-[0_0_15px_rgba(217,119,6,0.1)]"
                    } ${formErrors.password ? "border-red-500" : ""}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={`absolute right-3 top-1/2 -translate-y-1/2 ${
                      theme === "dark" ? "text-zinc-400 hover:text-zinc-200" : "text-zinc-500 hover:text-zinc-700"
                    }`}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                  {formErrors.password && (
                    <motion.p
                      className="text-red-500 text-xs mt-1"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {formErrors.password}
                    </motion.p>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember-me"
                    checked={formState.rememberMe}
                    onCheckedChange={(checked) => setFormState((prev) => ({ ...prev, rememberMe: checked === true }))}
                    className={theme === "dark" ? "border-zinc-600" : "border-zinc-300"}
                  />
                  <Label
                    htmlFor="remember-me"
                    className={`text-sm ${theme === "dark" ? "text-zinc-400" : "text-zinc-600"}`}
                  >
                    Remember me
                  </Label>
                </div>
                <Link
                  href="/forgot-password"
                  className={`text-sm transition-colors duration-200 ${
                    theme === "dark" ? "text-amber-500 hover:text-amber-400" : "text-amber-600 hover:text-amber-700"
                  }`}
                >
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className={`w-full py-6 transition-all duration-300 ${
                  theme === "dark"
                    ? "bg-amber-600 hover:bg-amber-500 text-black hover:scale-[1.02] shadow-lg shadow-amber-900/20"
                    : "bg-amber-600 hover:bg-amber-500 text-white hover:scale-[1.02] shadow-lg shadow-amber-500/20"
                }`}
              >
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>

            <div
              className={`mt-6 pt-6 text-center border-t ${theme === "dark" ? "border-zinc-800" : "border-zinc-200"} pb-4`}
            >
              <p className={theme === "dark" ? "text-zinc-400" : "text-zinc-600"}>
                Don&apos;t have an account?{" "}
                <Link
                  href="/signup"
                  className={`font-medium transition-colors duration-200 ${
                    theme === "dark" ? "text-amber-500 hover:text-amber-400" : "text-amber-600 hover:text-amber-700"
                  }`}
                >
                  Sign up
                </Link>
              </p>
            </div>

            {/* Greek pattern bottom */}
          </motion.div>

          {/* Social proof */}
          <motion.div
            className="mt-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <p className={`text-sm ${theme === "dark" ? "text-zinc-500" : "text-zinc-600"}`}>
              Join thousands of music enthusiasts already on Symphozeon
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

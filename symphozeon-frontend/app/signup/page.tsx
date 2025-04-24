"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Music, ArrowRight, Eye, EyeOff, Loader2, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import ThemeToggle from "@/components/theme-toggle"

export default function SignupPage() {
  const router = useRouter()
  const [theme, setTheme] = useState<"dark" | "light">("dark")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
    musicInterests: [] as string[],
  })
  const [formErrors, setFormErrors] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: "",
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

  // Password strength indicators
  const passwordStrength = {
    hasMinLength: formState.password.length >= 8,
    hasUppercase: /[A-Z]/.test(formState.password),
    hasLowercase: /[a-z]/.test(formState.password),
    hasNumber: /[0-9]/.test(formState.password),
    hasSpecialChar: /[^A-Za-z0-9]/.test(formState.password),
  }

  const passwordStrengthScore = Object.values(passwordStrength).filter(Boolean).length

  // Music genre options
  const musicGenres = [
    "Rock",
    "Pop",
    "Hip Hop",
    "Jazz",
    "Classical",
    "Electronic",
    "R&B",
    "Country",
    "Metal",
    "Folk",
    "Indie",
    "Blues",
    "Reggae",
    "Punk",
    "Soul",
  ]

  // Simulated signup function
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()

    if (currentStep === 1) {
      // Basic validation for step 1
      const errors = {
        username: !formState.username
          ? "Username is required"
          : formState.username.length < 3
            ? "Username must be at least 3 characters"
            : "",
        email: !formState.email ? "Email is required" : !/\S+@\S+\.\S+/.test(formState.email) ? "Email is invalid" : "",
        password: !formState.password
          ? "Password is required"
          : passwordStrengthScore < 3
            ? "Password is not strong enough"
            : "",
        confirmPassword: !formState.confirmPassword
          ? "Please confirm your password"
          : formState.password !== formState.confirmPassword
            ? "Passwords do not match"
            : "",
        agreeTerms: !formState.agreeTerms ? "You must agree to the terms" : "",
      }

      setFormErrors(errors)

      if (Object.values(errors).some((error) => error)) {
        return
      }

      // Move to step 2
      setCurrentStep(2)
      return
    }

    // Step 2 submission
    setIsLoading(true)

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Store username in localStorage for demo purposes
      localStorage.setItem("userName", formState.username)

      // Redirect to login page after successful signup
      router.push("/login")
    } catch (error) {
      console.error("Signup failed:", error)
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

  const toggleMusicGenre = (genre: string) => {
    setFormState((prev) => {
      const currentInterests = [...prev.musicInterests]
      if (currentInterests.includes(genre)) {
        return { ...prev, musicInterests: currentInterests.filter((g) => g !== genre) }
      } else {
        return { ...prev, musicInterests: [...currentInterests, genre] }
      }
    })
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
          <div className="text-center mb-8">
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
            <motion.div
              className="w-32 h-3 mx-auto mb-6 relative overflow-hidden"
              initial={{ width: 0 }}
              animate={{ width: "8rem" }}
              transition={{ duration: 1, delay: 0.3 }}
            >
            </motion.div>
          </div>

          {/* Step indicator */}
          <div className="flex justify-center mb-6">
            <div className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  theme === "dark" ? "bg-amber-600 text-black" : "bg-amber-600 text-white"
                }`}
              >
                {currentStep > 1 ? <Check size={16} /> : "1"}
              </div>
              <div
                className={`w-10 h-1 ${
                  currentStep > 1
                    ? theme === "dark"
                      ? "bg-amber-600"
                      : "bg-amber-600"
                    : theme === "dark"
                      ? "bg-zinc-700"
                      : "bg-zinc-300"
                }`}
              ></div>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  currentStep === 2
                    ? theme === "dark"
                      ? "bg-amber-600 text-black"
                      : "bg-amber-600 text-white"
                    : theme === "dark"
                      ? "bg-zinc-800 text-zinc-400"
                      : "bg-zinc-200 text-zinc-600"
                }`}
              >
                2
              </div>
            </div>
          </div>

          {/* Signup card */}
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

            <h2 className={`text-2xl font-serif font-bold mb-6 ${theme === "dark" ? "text-white" : "text-zinc-900"}`}>
              {currentStep === 1 ? "Create Your Account" : "Your Musical Preferences"}
            </h2>

            <form onSubmit={handleSignup} className="space-y-5">
              {currentStep === 1 ? (
                <>
                  <div className="space-y-2">
                    <Label
                      htmlFor="username"
                      className={`text-sm font-medium ${theme === "dark" ? "text-zinc-300" : "text-zinc-700"}`}
                    >
                      Username
                    </Label>
                    <Input
                      id="username"
                      name="username"
                      type="text"
                      placeholder="Choose a username"
                      value={formState.username}
                      onChange={handleInputChange}
                      className={`bg-opacity-70 transition-all duration-300 ${
                        theme === "dark"
                          ? "bg-zinc-800 border-zinc-700 text-white focus:border-amber-500 hover:border-amber-600/70 hover:shadow-[0_0_15px_rgba(217,119,6,0.15)]"
                          : "bg-white border-zinc-300 text-zinc-900 focus:border-amber-600 hover:border-amber-500/70 hover:shadow-[0_0_15px_rgba(217,119,6,0.1)]"
                      } ${formErrors.username ? "border-red-500" : ""}`}
                    />
                    {formErrors.username && (
                      <motion.p
                        className="text-red-500 text-xs mt-1"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        {formErrors.username}
                      </motion.p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="email"
                      className={`text-sm font-medium ${theme === "dark" ? "text-zinc-300" : "text-zinc-700"}`}
                    >
                      Email
                    </Label>
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
                    </div>

                    {/* Password strength indicator */}
                    <div className="mt-2">
                      <div className="flex space-x-1 mb-1">
                        {[1, 2, 3, 4, 5].map((level) => (
                          <div
                            key={level}
                            className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                              passwordStrengthScore >= level
                                ? level <= 2
                                  ? "bg-red-500"
                                  : level <= 4
                                    ? "bg-amber-500"
                                    : "bg-green-500"
                                : theme === "dark"
                                  ? "bg-zinc-700"
                                  : "bg-zinc-300"
                            }`}
                          ></div>
                        ))}
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div
                          className={`flex items-center ${
                            passwordStrength.hasMinLength
                              ? theme === "dark"
                                ? "text-green-400"
                                : "text-green-600"
                              : theme === "dark"
                                ? "text-zinc-500"
                                : "text-zinc-400"
                          }`}
                        >
                          <Check size={12} className="mr-1" />
                          <span>At least 8 characters</span>
                        </div>
                        <div
                          className={`flex items-center ${
                            passwordStrength.hasUppercase
                              ? theme === "dark"
                                ? "text-green-400"
                                : "text-green-600"
                              : theme === "dark"
                                ? "text-zinc-500"
                                : "text-zinc-400"
                          }`}
                        >
                          <Check size={12} className="mr-1" />
                          <span>Uppercase letter</span>
                        </div>
                        <div
                          className={`flex items-center ${
                            passwordStrength.hasLowercase
                              ? theme === "dark"
                                ? "text-green-400"
                                : "text-green-600"
                              : theme === "dark"
                                ? "text-zinc-500"
                                : "text-zinc-400"
                          }`}
                        >
                          <Check size={12} className="mr-1" />
                          <span>Lowercase letter</span>
                        </div>
                        <div
                          className={`flex items-center ${
                            passwordStrength.hasNumber
                              ? theme === "dark"
                                ? "text-green-400"
                                : "text-green-600"
                              : theme === "dark"
                                ? "text-zinc-500"
                                : "text-zinc-400"
                          }`}
                        >
                          <Check size={12} className="mr-1" />
                          <span>Number</span>
                        </div>
                      </div>
                    </div>

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

                  <div className="space-y-2">
                    <Label
                      htmlFor="confirmPassword"
                      className={`text-sm font-medium ${theme === "dark" ? "text-zinc-300" : "text-zinc-700"}`}
                    >
                      Confirm Password
                    </Label>
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={formState.confirmPassword}
                      onChange={handleInputChange}
                      className={`bg-opacity-70 transition-all duration-300 ${
                        theme === "dark"
                          ? "bg-zinc-800 border-zinc-700 text-white focus:border-amber-500 hover:border-amber-600/70 hover:shadow-[0_0_15px_rgba(217,119,6,0.15)]"
                          : "bg-white border-zinc-300 text-zinc-900 focus:border-amber-600 hover:border-amber-500/70 hover:shadow-[0_0_15px_rgba(217,119,6,0.1)]"
                      } ${formErrors.confirmPassword ? "border-red-500" : ""}`}
                    />
                    {formErrors.confirmPassword && (
                      <motion.p
                        className="text-red-500 text-xs mt-1"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        {formErrors.confirmPassword}
                      </motion.p>
                    )}
                  </div>

                  <div className="flex items-start space-x-2 pt-2">
                    <Checkbox
                      id="agree-terms"
                      checked={formState.agreeTerms}
                      onCheckedChange={(checked) => {
                        setFormState((prev) => ({ ...prev, agreeTerms: checked === true }))
                        if (formErrors.agreeTerms) {
                          setFormErrors((prev) => ({ ...prev, agreeTerms: "" }))
                        }
                      }}
                      className={`mt-1 ${theme === "dark" ? "border-zinc-600" : "border-zinc-300"} ${
                        formErrors.agreeTerms ? "border-red-500" : ""
                      }`}
                    />
                    <div>
                      <Label
                        htmlFor="agree-terms"
                        className={`text-sm ${theme === "dark" ? "text-zinc-300" : "text-zinc-700"}`}
                      >
                        I agree to the{" "}
                        <Link
                          href="/terms"
                          className={`transition-colors duration-200 ${
                            theme === "dark"
                              ? "text-amber-500 hover:text-amber-400"
                              : "text-amber-600 hover:text-amber-700"
                          }`}
                        >
                          Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link
                          href="/privacy"
                          className={`transition-colors duration-200 ${
                            theme === "dark"
                              ? "text-amber-500 hover:text-amber-400"
                              : "text-amber-600 hover:text-amber-700"
                          }`}
                        >
                          Privacy Policy
                        </Link>
                      </Label>
                      {formErrors.agreeTerms && (
                        <motion.p
                          className="text-red-500 text-xs mt-1"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          {formErrors.agreeTerms}
                        </motion.p>
                      )}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="space-y-3">
                    <Label className={`text-sm font-medium ${theme === "dark" ? "text-zinc-300" : "text-zinc-700"}`}>
                      Select your favorite music genres
                    </Label>
                    <p className={`text-xs ${theme === "dark" ? "text-zinc-400" : "text-zinc-600"}`}>
                      This helps us personalize your experience and recommend music you'll love.
                    </p>
                    <div className="grid grid-cols-3 gap-2 mt-2">
                      {musicGenres.map((genre) => (
                        <motion.div
                          key={genre}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => toggleMusicGenre(genre)}
                          className={`px-3 py-2 rounded-md text-sm text-center cursor-pointer transition-colors duration-200 ${
                            formState.musicInterests.includes(genre)
                              ? theme === "dark"
                                ? "bg-amber-600 text-black"
                                : "bg-amber-600 text-white"
                              : theme === "dark"
                                ? "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                                : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
                          }`}
                        >
                          {genre}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </>
              )}

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
                ) : currentStep === 1 ? (
                  <>
                    Continue
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                ) : (
                  <>
                    Complete Sign Up
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>

              {currentStep === 2 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setCurrentStep(1)}
                  className={`w-full mt-2 ${
                    theme === "dark"
                      ? "border-zinc-700 text-zinc-300 hover:bg-zinc-800"
                      : "border-zinc-300 text-zinc-700 hover:bg-zinc-100"
                  }`}
                >
                  Back
                </Button>
              )}
            </form>

            <div
              className={`mt-6 pt-6 text-center border-t ${theme === "dark" ? "border-zinc-800" : "border-zinc-200"} pb-4`}
            >
              <p className={theme === "dark" ? "text-zinc-400" : "text-zinc-600"}>
                Already have an account?{" "}
                <Link
                  href="/login"
                  className={`font-medium transition-colors duration-200 ${
                    theme === "dark" ? "text-amber-500 hover:text-amber-400" : "text-amber-600 hover:text-amber-700"
                  }`}
                >
                  Sign in
                </Link>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

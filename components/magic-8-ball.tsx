"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { motion, AnimatePresence } from "framer-motion"

export default function Magic8Ball() {
  const [question, setQuestion] = useState("")
  const [answer, setAnswer] = useState("")
  const [isAnimating, setIsAnimating] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)

  const possibleAnswers = ["Yes", "No", "Maybe"]

  const animateAndAnswer = () => {
    if (question.trim() === "") return

    setIsAnimating(true)
    setAnswer("")

    setTimeout(() => {
      setIsAnimating(false)
      setAnswer(possibleAnswers[Math.floor(Math.random() * possibleAnswers.length)])
    }, 3000) // Increased animation time to 3 seconds
  }

  useEffect(() => {
    document.body.className = isDarkMode ? "dark" : "light"
  }, [isDarkMode])

  return (
    <div className={`min-h-[calc(100vh-8rem)] px-4 sm:px-6 flex items-center justify-center ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
      <div className="w-full max-w-md p-4 sm:p-8 rounded-xl shadow-lg bg-white dark:bg-gray-800 transition-colors duration-300">
        <div className="flex justify-between items-center mb-4 sm:mb-6">
          <h1 className="text-xl sm:text-2xl font-bold">Executive 8 Ball</h1>
          <div className="flex items-center space-x-2">
            <Label htmlFor="dark-mode" className="sr-only">Dark Mode</Label>
            <Switch
              id="dark-mode"
              checked={isDarkMode}
              onCheckedChange={setIsDarkMode}
            />
            <span className="text-sm font-medium">
              {isDarkMode ? '🌙' : '☀️'}
            </span>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="question" className="text-sm font-medium">Your Question:</Label>
            <Input
              id="question"
              type="text"
              placeholder="Ask a yes/no/maybe question..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="mt-1"
            />
          </div>

          <Button onClick={animateAndAnswer} className="w-full" disabled={isAnimating}>
            {isAnimating ? "Divining..." : "Shake the 8 Ball"}
          </Button>

          <div className="relative h-48 sm:h-64 flex items-center justify-center overflow-hidden">
            <motion.div
              className={`w-36 h-36 sm:w-48 sm:h-48 rounded-full bg-black flex items-center justify-center ${isAnimating ? 'animate-float' : ''}`}
              animate={isAnimating ? {
                rotate: [0, 360, 720, 1080],
                scale: [1, 1.1, 0.9, 1],
              } : {}}
              transition={{
                duration: 3,
                ease: "easeInOut",
                times: [0, 0.2, 0.5, 0.8, 1],
              }}
            >
              <AnimatePresence>
                {answer && !isAnimating && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-blue-500 flex items-center justify-center"
                  >
                    <span className="text-white text-base sm:text-xl font-bold">{answer}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

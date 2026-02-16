"use client"

import type React from "react"
import { useState } from "react"
import { Terminal, ChevronRight } from "lucide-react"
import prompts from "@/data/prompts.json"

export default function HomePage() {
  const [eventName, setEventName] = useState("")
  const [fullName, setFullName] = useState("")
  const [eventNameError, setEventNameError] = useState("")
  const [fullNameError, setFullNameError] = useState("")

  // Check if input contains only Latin characters, numbers, spaces, and hyphens
  const isValidLatinInput = (input: string): boolean => {
    // Allow Latin letters (a-z, A-Z), numbers, spaces, and hyphens only
    const latinPattern = /^[a-zA-Z0-9\s-]*$/
    return latinPattern.test(input)
  }

  // Sanitize input: trim, lowercase, replace spaces with hyphens
  const sanitizeInput = (input: string): string => {
    return input
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '') // Remove all characters except letters, numbers, spaces, and hyphens
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
  }

  const handleEventNameChange = (value: string) => {
    setEventName(value)
    if (value && !isValidLatinInput(value)) {
      setEventNameError("Please use only Latin characters (a-z, A-Z), numbers, spaces, and hyphens (-)")
    } else {
      setEventNameError("")
    }
  }

  const handleFullNameChange = (value: string) => {
    setFullName(value)
    if (value && !isValidLatinInput(value)) {
      setFullNameError("Please use only Latin characters (a-z, A-Z), numbers, spaces, and hyphens (-)")
    } else {
      setFullNameError("")
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Final validation before submit
    if (!isValidLatinInput(eventName) || !isValidLatinInput(fullName)) {
      return
    }

    const sanitizedEventName = sanitizeInput(eventName)
    const sanitizedFullName = sanitizeInput(fullName)

    sessionStorage.setItem("eventName", sanitizedEventName)
    sessionStorage.setItem("fullName", sanitizedFullName)

    window.location.href = "/prompt/1"
  }

  const isFormValid = eventName.trim() && fullName.trim() && !eventNameError && !fullNameError

  return (
    <div className="min-h-screen bg-black flex flex-col font-mono relative overflow-hidden">
      {/* CRT scanline effect */}
      <div className="pointer-events-none fixed inset-0 z-50 bg-[linear-gradient(transparent_50%,rgba(0,255,0,0.02)_50%)] bg-[length:100%_4px] animate-[scan_8s_linear_infinite]" />

      {/* Terminal header with ASCII art */}
      <header className="border-b border-green-900/30 bg-black/95 backdrop-blur">
        <div className="container mx-auto px-6 py-3">
          <div className="flex items-center gap-3 text-green-400">
            <Terminal className="h-4 w-4" />
            <div className="flex items-center gap-1 text-xs">
              <span>root@{prompts.eventTitle.toLowerCase().replace(/\s+/g, "-")}</span>
              <span className="text-green-600">:</span>
              <span className="text-blue-400">~</span>
              <span className="text-green-600">$</span>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-6 py-8 flex items-center justify-center">
        <div className="w-full max-w-2xl">
          {/* ASCII art banner */}
          <div className="mb-6 text-green-500 text-sm leading-tight opacity-70 whitespace-pre font-mono">
            {`╔═══════════════════════════════════════════════════════════════╗
║  EVENT REGISTRATION SYSTEM v2.1.0                             ║
║  ${prompts.eventTitle.padEnd(59)}║
╚═══════════════════════════════════════════════════════════════╝`}
          </div>

          {/* Terminal window */}
          <div className="bg-black border-2 border-green-900/50 rounded shadow-[0_0_30px_rgba(0,255,0,0.15)]">
            {/* Window chrome */}
            <div className="flex items-center gap-2 px-3 py-2 border-b border-green-900/30 bg-green-950/20">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-[0_0_5px_rgba(239,68,68,0.5)]" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500 shadow-[0_0_5px_rgba(234,179,8,0.5)]" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-[0_0_5px_rgba(34,197,94,0.5)]" />
              </div>
              <div className="flex-1 text-center text-sm text-green-600">/usr/local/bin/event-registration.sh</div>
            </div>

            {/* Terminal content */}
            <div className="p-6 space-y-4">
              {/* Boot sequence */}
              <div className="space-y-1 text-base text-green-500/70 font-mono">
                <div className="flex gap-2">
                  <span className="text-green-400">{">"}</span>
                  <span>Loading event registration module...</span>
                  <span className="text-green-400">[OK]</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-green-400">{">"}</span>
                  <span>Initializing parameter collection...</span>
                  <span className="text-green-400">[OK]</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-green-400">{">"}</span>
                  <span>Awaiting user input...</span>
                </div>
              </div>

              <div className="border-t border-green-900/30 pt-4" />

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Event name input */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-base">
                    <span className="text-green-400">$</span>
                    <span className="text-green-500">export</span>
                    <span className="text-blue-400">EVENT_NAME</span>
                    <span className="text-green-600">=</span>
                  </div>
                  <div className="flex items-center gap-2 bg-green-950/20 border border-green-900/50 rounded px-3 py-3 focus-within:border-green-500/50 focus-within:shadow-[0_0_10px_rgba(34,197,94,0.2)] transition-all">
                    <span className="text-green-600 text-lg">{">"}</span>
                    <input
                      id="eventName"
                      type="text"
                      placeholder="AI Workshop 2025"
                      value={eventName}
                      onChange={(e) => handleEventNameChange(e.target.value)}
                      className="flex-1 bg-transparent text-green-400 text-lg placeholder:text-green-900 focus:outline-none"
                      required
                    />
                    <span className="w-1.5 h-5 bg-green-400 animate-pulse shadow-[0_0_5px_rgba(34,197,94,0.8)]" />
                  </div>
                  {eventNameError && (
                    <div className="flex items-center gap-2 text-xs text-red-400">
                      <span className="text-red-500">✗</span>
                      <span>{eventNameError}</span>
                    </div>
                  )}
                </div>

                {/* Full name input */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-base">
                    <span className="text-green-400">$</span>
                    <span className="text-green-500">export</span>
                    <span className="text-blue-400">FULL_NAME</span>
                    <span className="text-green-600">=</span>
                  </div>
                  <div className="flex items-center gap-2 bg-green-950/20 border border-green-900/50 rounded px-3 py-3 focus-within:border-green-500/50 focus-within:shadow-[0_0_10px_rgba(34,197,94,0.2)] transition-all">
                    <span className="text-green-600 text-lg">{">"}</span>
                    <input
                      id="fullName"
                      type="text"
                      placeholder="John Doe"
                      value={fullName}
                      onChange={(e) => handleFullNameChange(e.target.value)}
                      className="flex-1 bg-transparent text-green-400 text-lg placeholder:text-green-900 focus:outline-none"
                      required
                    />
                    <span className="w-1.5 h-5 bg-green-400 animate-pulse shadow-[0_0_5px_rgba(34,197,94,0.8)]" />
                  </div>
                  {fullNameError && (
                    <div className="flex items-center gap-2 text-xs text-red-400">
                      <span className="text-red-500">✗</span>
                      <span>{fullNameError}</span>
                    </div>
                  )}
                </div>

                <div className="border-t border-green-900/30 pt-4" />

                {/* Execute button */}
                <button
                  type="submit"
                  disabled={!isFormValid}
                  className="w-full bg-green-950/30 border border-green-900/50 text-green-400 text-lg font-medium rounded px-4 py-4 hover:bg-green-950/50 hover:border-green-500/50 hover:shadow-[0_0_15px_rgba(34,197,94,0.2)] disabled:opacity-30 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 group"
                >
                  <span className="text-green-600">$</span>
                  <span>./generate-prompts.sh</span>
                  <span className="text-green-600">--execute</span>
                  <ChevronRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>

              {/* Status bar */}
              <div className="pt-3 border-t border-green-900/30">
                <div className="flex items-center justify-between text-[10px]">
                  <div className="flex items-center gap-2 text-green-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse shadow-[0_0_5px_rgba(34,197,94,0.8)]" />
                    <span>READY</span>
                  </div>
                  <div className="text-green-800">{new Date().toISOString().replace("T", " ").slice(0, 19)}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer info */}
          <div className="mt-4 text-sm text-green-800 text-center font-mono">
            Press CTRL+C to abort | Type 'help' for assistance
          </div>
        </div>
      </main>
    </div>
  )
}


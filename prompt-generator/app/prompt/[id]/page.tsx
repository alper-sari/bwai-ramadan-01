"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Terminal, Copy, Check, ChevronLeft, ChevronRight } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import prompts from "@/data/prompts.json"

export default function PromptPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [copied, setCopied] = useState(false)
  const [promptText, setPromptText] = useState("")
  const [eventName, setEventName] = useState("")
  const [fullName, setFullName] = useState("")

  const promptId = Number.parseInt(params.id as string)
  const totalPrompts = prompts.prompts.length

  useEffect(() => {
    const storedEventName = sessionStorage.getItem("eventName")
    const storedFullName = sessionStorage.getItem("fullName")

    if (!storedEventName || !storedFullName) {
      router.push("/")
      return
    }

    setEventName(storedEventName)
    setFullName(storedFullName)

    const template = prompts.prompts[promptId - 1] || prompts.prompts[0]
    const processedPrompt = template.replace(/{event_name}/g, storedEventName).replace(/{full_name}/g, storedFullName)

    setPromptText(processedPrompt)
  }, [promptId, router])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(promptText)
      setCopied(true)
      toast({
        title: "✓ Copied to clipboard",
        description: "Prompt copied successfully",
        className: "bg-black border-green-900/50 text-green-400 font-mono",
      })
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      toast({
        title: "✗ Copy failed",
        description: "Failed to copy prompt",
        variant: "destructive",
      })
    }
  }

  const handlePrevious = () => {
    if (promptId > 1) {
      router.push(`/prompt/${promptId - 1}`)
    } else {
      router.push("/")
    }
  }

  const handleNext = () => {
    if (promptId < totalPrompts) {
      router.push(`/prompt/${promptId + 1}`)
    }
  }

  if (!eventName) {
    return null
  }

  return (
    <div className="min-h-screen bg-black flex flex-col font-mono relative overflow-hidden">
      {/* CRT scanline effect */}
      <div className="pointer-events-none fixed inset-0 z-50 bg-[linear-gradient(transparent_50%,rgba(0,255,0,0.02)_50%)] bg-[length:100%_4px] animate-[scan_8s_linear_infinite]" />

      {/* Terminal header */}
      <header className="border-b border-green-900/30 bg-black/95 backdrop-blur">
        <div className="container mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-green-400">
              <Terminal className="h-4 w-4" />
              <div className="flex items-center gap-1 text-xs">
                <span>root@{prompts.eventTitle.toLowerCase().replace(/\s+/g, "-")}</span>
                <span className="text-green-600">:</span>
                <span className="text-blue-400">~/prompts</span>
                <span className="text-green-600">$</span>
              </div>
            </div>
            <div className="text-xs text-green-600">
              <span className="text-green-400">[</span>
              <span className="text-green-500">{promptId}</span>
              <span className="text-green-700">/</span>
              <span className="text-green-500">{totalPrompts}</span>
              <span className="text-green-400">]</span>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-6 py-8 flex items-center justify-center">
        <div className="w-full max-w-4xl">
          {/* Terminal window */}
          <div className="bg-black border-2 border-green-900/50 rounded shadow-[0_0_30px_rgba(0,255,0,0.15)]">
            {/* Window chrome */}
            <div className="flex items-center gap-2 px-3 py-2 border-b border-green-900/30 bg-green-950/20">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-[0_0_5px_rgba(239,68,68,0.5)]" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500 shadow-[0_0_5px_rgba(234,179,8,0.5)]" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-[0_0_5px_rgba(34,197,94,0.5)]" />
              </div>
              <div className="flex-1 text-center text-sm text-green-600">
                /var/prompts/prompt-{String(promptId).padStart(2, "0")}.txt
              </div>
            </div>

            {/* Terminal content */}
            <div className="p-6 space-y-4">
              {/* Command header */}
              <div className="space-y-1 text-base">
                <div className="flex items-center gap-2 text-green-500">
                  <span className="text-green-400">$</span>
                  <span>cat prompt-{String(promptId).padStart(2, "0")}.txt</span>
                </div>
                <div className="flex items-center gap-2 text-green-700 text-sm">
                  <span className="text-green-600">{">"}</span>
                  <span>Reading file... {promptText.length} bytes</span>
                </div>
              </div>

              <div className="border-t border-green-900/30" />

              {/* Prompt display with line numbers */}
              <div className="relative">
                <div className="bg-green-950/10 border border-green-900/30 rounded p-4 min-h-[300px] max-h-[500px] overflow-y-auto">
                  <div className="text-green-400 text-base leading-relaxed whitespace-pre-wrap break-words">
                    {promptText.split("\n").map((line, i) => (
                      <div key={i} className="flex gap-3 hover:bg-green-950/20 px-1 -mx-1">
                        <span className="text-green-700 select-none w-8 text-right flex-shrink-0">
                          {String(i + 1).padStart(3, "0")}
                        </span>
                        <span className="text-green-500">{line || " "}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="border-t border-green-900/30" />

              {/* Copy button */}
              <button
                onClick={handleCopy}
                className="w-full bg-green-950/30 border border-green-900/50 text-green-400 text-lg font-medium rounded px-4 py-4 hover:bg-green-950/50 hover:border-green-500/50 hover:shadow-[0_0_15px_rgba(34,197,94,0.2)] transition-all flex items-center justify-center gap-2"
              >
                <span className="text-green-600">$</span>
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5" />
                    <span>pbcopy --success</span>
                    <span className="text-green-600">[OK]</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    <span>
                      pbcopy {"<"} prompt-{String(promptId).padStart(2, "0")}.txt
                    </span>
                  </>
                )}
              </button>

              {/* Navigation */}
              <div className="flex gap-3">
                <button
                  onClick={handlePrevious}
                  className="flex-1 bg-green-950/20 border border-green-900/50 text-green-500 text-lg rounded px-4 py-3 hover:bg-green-950/40 hover:border-green-500/50 transition-all flex items-center justify-center gap-2"
                >
                  <ChevronLeft className="h-3.5 w-3.5" />
                  <span>{promptId === 1 ? "cd .." : `prompt-${String(promptId - 1).padStart(2, "0")}`}</span>
                </button>
                {promptId < totalPrompts && (
                  <button
                    onClick={handleNext}
                    className="flex-1 bg-green-950/20 border border-green-900/50 text-green-500 text-lg rounded px-4 py-3 hover:bg-green-950/40 hover:border-green-500/50 transition-all flex items-center justify-center gap-2"
                  >
                    <span>prompt-{String(promptId + 1).padStart(2, "0")}</span>
                    <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>

              {/* Environment variables display */}
              <div className="pt-3 border-t border-green-900/30">
                <div className="text-sm text-green-700 space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-green-600">$</span>
                    <span className="text-green-500">echo</span>
                    <span className="text-blue-400">$FULL_NAME</span>
                    <span className="text-green-600">=</span>
                    <span className="text-green-400">{fullName}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-600">$</span>
                    <span className="text-green-500">echo</span>
                    <span className="text-blue-400">$EVENT_NAME</span>
                    <span className="text-green-600">=</span>
                    <span className="text-green-400">{eventName}</span>
                  </div>
                </div>
              </div>

              {/* Status bar */}
              <div className="pt-2 border-t border-green-900/30">
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
        </div>
      </main>
    </div>
  )
}

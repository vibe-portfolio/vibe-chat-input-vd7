"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Plus, ArrowUp, Settings2, Mic, X, Check } from "lucide-react"

export default function ChatInput() {
  const [input, setInput] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const [showPlusMenu, setShowPlusMenu] = useState(false)
  const [showSettingsMenu, setShowSettingsMenu] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      console.log("Submitted:", input)
      setInput("")
    }
  }

  const handleMicClick = () => {
    setIsRecording(true)
    setTimeout(() => {
      setIsRecording(false)
      setInput("When speech to text feature ?")
    }, 5000)
  }

  const handleCancelRecording = () => {
    setIsRecording(false)
  }

  const handleConfirmRecording = () => {
    setIsRecording(false)
    setInput("When speech to text feature ?")
  }

  const handleContainerClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget || (e.target as HTMLElement).tagName === "DIV") {
      textareaRef.current?.focus()
    }
  }

  const WaveAnimation = () => {
    const [animationKey, setAnimationKey] = useState(0)

    useEffect(() => {
      const interval = setInterval(() => {
        setAnimationKey((prev) => prev + 1)
      }, 100)
      return () => clearInterval(interval)
    }, [])

    const bars = Array.from({ length: 50 }, (_, i) => {
      const height = Math.random() * 20 + 4
      const delay = Math.random() * 2
      return (
        <div
          key={`${i}-${animationKey}`}
          className="bg-gray-400 rounded-sm animate-pulse"
          style={{
            width: "2px",
            height: `${height}px`,
            animationDelay: `${delay}s`,
            animationDuration: "1s",
          }}
        />
      )
    })

    return (
      <div className="flex items-center w-full gap-1">
        <div className="flex-1 border-t-2 border-dotted border-gray-500"></div>
        <div className="flex items-center gap-0.5 justify-center px-8">{bars}</div>
        <div className="flex-1 border-t-2 border-dotted border-gray-500"></div>
      </div>
    )
  }

  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="relative">
        <div
          onClick={handleContainerClick}
          className="border border-white/10 backdrop-blur-xl relative transition-all duration-300 ease-out overflow-hidden rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,255,255,0.1)_inset,0_4px_16px_rgba(255,255,255,0.04)_inset] hover:shadow-[0_16px_64px_rgba(0,0,0,1),0_0_0_1px_rgba(255,255,255,0.15)_inset,0_4px_24px_rgba(255,255,255,0.06)_inset] hover:border-white/15 hover:-translate-y-0.5 cursor-text"
          style={{
            backgroundColor: "rgba(20, 20, 21, 0.4)",
          }}
        >
          {isRecording ? (
            <div className="flex items-center justify-between h-12 animate-in fade-in-0 slide-in-from-top-2 duration-500 w-full p-4">
              <WaveAnimation />
              <div className="flex items-center gap-2 ml-4">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handleCancelRecording}
                  className="h-9 w-9 p-0 rounded-lg text-white hover:text-white border border-white/10 backdrop-blur-md shadow-[0_4px_16px_rgba(0,0,0,0.7),0_0_0_1px_rgba(255,255,255,0.08)_inset] hover:shadow-[0_8px_32px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,255,255,0.15)_inset] transition-all duration-200 hover:scale-110 active:scale-95 hover:-translate-y-0.5"
                  style={{
                    backgroundColor: "rgba(39, 39, 42, 0.5)",
                  }}
                >
                  <X className="h-5 w-5" />
                </Button>
                <Button
                  type="button"
                  size="sm"
                  onClick={handleConfirmRecording}
                  className="h-10 w-10 p-0 rounded-full border border-cyan-400/20 backdrop-blur-md shadow-[0_0_24px_rgba(6,182,212,0.6),0_4px_16px_rgba(0,0,0,0.8),0_0_0_1px_rgba(6,182,212,0.3)_inset] hover:shadow-[0_0_32px_rgba(6,182,212,0.8),0_8px_24px_rgba(0,0,0,0.9),0_0_0_1px_rgba(6,182,212,0.4)_inset] transition-all duration-200 hover:scale-110 active:scale-95 hover:-translate-y-0.5"
                  style={{
                    backgroundColor: "rgba(6, 182, 212, 0.9)",
                    color: "#ffffff",
                  }}
                >
                  <Check className="h-5 w-5" />
                </Button>
              </div>
            </div>
          ) : (
            <div className="animate-in fade-in-0 slide-in-from-bottom-2 duration-500 p-4">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="chillin"
                className="w-full bg-transparent text-gray-100 placeholder-gray-500 resize-none border-none outline-none text-base leading-relaxed min-h-[24px] max-h-32 transition-all duration-200"
                rows={1}
                onInput={(e) => {
                  const target = e.target as HTMLTextAreaElement
                  target.style.height = "auto"
                  target.style.height = target.scrollHeight + "px"
                }}
              />

              <div className="flex items-center justify-between mt-8">
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowPlusMenu(!showPlusMenu)}
                      className="h-9 w-9 p-0 rounded-lg text-white hover:text-white border border-white/10 backdrop-blur-md shadow-[0_4px_16px_rgba(0,0,0,0.7),0_0_0_1px_rgba(255,255,255,0.08)_inset] hover:shadow-[0_8px_32px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,255,255,0.15)_inset] transition-all duration-200 hover:scale-110 active:scale-95 hover:-translate-y-0.5"
                      style={{
                        backgroundColor: "rgba(39, 39, 42, 0.5)",
                      }}
                    >
                      <Plus className="h-5 w-5" />
                    </Button>
                    {showPlusMenu && (
                      <div
                        className="absolute bottom-full mb-2 left-0 border border-white/10 backdrop-blur-xl rounded-lg shadow-[0_8px_32px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,255,255,0.1)_inset] p-2 min-w-[160px] animate-in fade-in-0 slide-in-from-bottom-2 duration-200"
                        style={{ backgroundColor: "rgba(20, 20, 21, 0.95)" }}
                      >
                        <button className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded transition-colors">
                          Upload file
                        </button>
                        <button className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded transition-colors">
                          Add image
                        </button>
                        <button className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded transition-colors">
                          Insert link
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="relative">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowSettingsMenu(!showSettingsMenu)}
                      className="h-9 w-9 p-0 rounded-lg text-white hover:text-white border border-white/10 backdrop-blur-md shadow-[0_4px_16px_rgba(0,0,0,0.7),0_0_0_1px_rgba(255,255,255,0.08)_inset] hover:shadow-[0_8px_32px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,255,255,0.15)_inset] transition-all duration-200 hover:scale-110 active:scale-95 hover:-translate-y-0.5"
                      style={{
                        backgroundColor: "rgba(39, 39, 42, 0.5)",
                      }}
                    >
                      <Settings2 className="h-5 w-5" />
                    </Button>
                    {showSettingsMenu && (
                      <div
                        className="absolute bottom-full mb-2 left-0 border border-white/10 backdrop-blur-xl rounded-lg shadow-[0_8px_32px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,255,255,0.1)_inset] p-2 min-w-[160px] animate-in fade-in-0 slide-in-from-bottom-2 duration-200"
                        style={{ backgroundColor: "rgba(20, 20, 21, 0.95)" }}
                      >
                        <button className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded transition-colors">
                          Language
                        </button>
                        <button className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded transition-colors">
                          Voice settings
                        </button>
                        <button className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded transition-colors">
                          Preferences
                        </button>
                      </div>
                    )}
                  </div>

                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={handleMicClick}
                    className="h-9 w-9 p-0 rounded-lg text-white hover:text-white border border-white/10 backdrop-blur-md shadow-[0_4px_16px_rgba(0,0,0,0.7),0_0_0_1px_rgba(255,255,255,0.08)_inset] hover:shadow-[0_8px_32px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,255,255,0.15)_inset] transition-all duration-200 hover:scale-110 active:scale-95 hover:-translate-y-0.5 active:bg-red-600/30 active:border-red-400/40 active:text-red-300"
                    style={{
                      backgroundColor: "rgba(39, 39, 42, 0.5)",
                    }}
                  >
                    <Mic className="h-5 w-5 transition-transform duration-200" />
                  </Button>

                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    className="h-9 px-4 rounded-lg text-sm font-medium border border-cyan-400/20 backdrop-blur-md shadow-[0_0_16px_rgba(6,182,212,0.4),0_4px_16px_rgba(0,0,0,0.7),0_0_0_1px_rgba(6,182,212,0.2)_inset] hover:shadow-[0_0_24px_rgba(6,182,212,0.6),0_8px_24px_rgba(0,0,0,0.9),0_0_0_1px_rgba(6,182,212,0.3)_inset] transition-all duration-200 hover:scale-105 active:scale-95 hover:-translate-y-0.5"
                    style={{
                      backgroundColor: "rgba(6, 182, 212, 0.2)",
                      color: "#06B6D4",
                    }}
                  >
                    Agent
                  </Button>
                </div>

                <Button
                  type="submit"
                  size="sm"
                  disabled={!input.trim()}
                  className="h-10 w-10 p-0 rounded-full text-white border border-cyan-400/20 backdrop-blur-md shadow-[0_0_24px_rgba(6,182,212,0.6),0_4px_16px_rgba(0,0,0,0.8),0_0_0_1px_rgba(6,182,212,0.3)_inset] hover:shadow-[0_0_32px_rgba(6,182,212,0.8),0_8px_24px_rgba(0,0,0,0.9),0_0_0_1px_rgba(6,182,212,0.4)_inset] disabled:shadow-[0_2px_8px_rgba(0,0,0,0.4)] disabled:border-white/10 transition-all duration-200 hover:scale-110 active:scale-95 disabled:hover:scale-100 disabled:opacity-40 disabled:cursor-not-allowed hover:-translate-y-0.5 disabled:hover:translate-y-0"
                  style={{
                    backgroundColor: input.trim() ? "rgba(6, 182, 212, 0.9)" : "rgba(39, 39, 42, 0.4)",
                  }}
                >
                  <ArrowUp className="h-5 w-5" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </form>
    </div>
  )
}

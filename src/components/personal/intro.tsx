"use client" // Correct for TSX

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useEffect, useState } from "react"

interface IntroProps {
  className?: string
}

export default function Intro({ className = "" }: IntroProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" disabled>
        <p className="h-[1.2rem] w-[1.2rem]"> pt </p>
      </Button>
    )
  }

  return (
    <Card className={`p-6 shadow-none border-none h-min select-none bg-transparent h-0 ${className}`}>
        <div className="py-3 flex flex-col justify-between gap-4">
            <span>
              <p>I am a brazilian fullstack developer that loves terminals, eletronics, education and cycling.</p>
              <p>📍 Based on Curitiba, PR (Brazil)</p>
              <p>📘 Reading "The Go Programming Language" - Alan A.A. Donovan, Brian W. Kernighan</p>
              <p>✏️ Studying Golang - Improving my knowledge!</p>
              <p>📜 Download my resume here</p>
              <p>🚲 44:16 Fixed gear</p>
              <p>🫂 Check my projects, try running them, create some requests, it will be great to hear some tips on how to improve how I show my skills in this space of the internet!</p>
              <p>✉️ Feel free to reach me out directly via Linkedin or email</p>
            </span>
            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                <Card className="w-full h-24"></Card>
                <Card className="w-full h-24"></Card>
              </div>
              <div className="flex gap-2">
                <Card className="w-full h-24"></Card>
                <Card className="w-full h-24"></Card>
              </div>
            </div>
        </div>
    </Card>
  )
}
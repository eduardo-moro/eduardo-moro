"use client" // Correct for TSX

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useEffect, useState } from "react"
import Repo from "./repo"

interface IntroProps {
  className?: string
}

export default function Blog({ className = "" }: IntroProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <></>
    )
  }

  return (
    <div className={`px-6 select-none font-sans opacity-75 ${className}  h-screen`}>
        <div className="flex flex-col justify-between gap-4 sticky end-0">
            teste
        </div>
    </div>
  )
}
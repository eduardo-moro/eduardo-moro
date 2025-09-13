"use client" // Correct for TSX

import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export default function ToggleLang() {
  const { setTheme, resolvedTheme } = useTheme()
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

  // TODO: set language change
  const toggleTheme = () => {
    setTheme(resolvedTheme === 'light' ? 'dark' : 'light')
  }

  return (
    <Button variant="ghost" size="icon" onClick={toggleTheme}>
      <p className="h-[1.2rem] w-[1.2rem] scale-100 transition-all dark:scale-0"> pt</p>
      <p className="absolute h-[1.2rem] w-[1.2rem] scale-0 transition-all dark:scale-100"> en </p>
      <span className="sr-only">Toggle language</span>
    </Button>
  )
}
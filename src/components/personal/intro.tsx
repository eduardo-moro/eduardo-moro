"use client" // Correct for TSX

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useEffect, useState } from "react"

export default function Intro() {
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
    <Card className="p-6 shadow-none border-none h-min select-none bg-transparent">
        <div className="py-3 flex flex-col justify-between">
            <span>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque, delectus! Ea quaerat cum nisi, accusantium est voluptatibus nostrum tempore reiciendis illo incidunt optio voluptate laboriosam in magni aspernatur aliquid repellat. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque, delectus! Ea quaerat cum nisi, accusantium est voluptatibus nostrum tempore reiciendis illo incidunt optio voluptate laboriosam in magni aspernatur aliquid repellat.
            </span>
        </div>
    </Card>
  )
}
"use client" // Correct for TSX

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { useEffect, useState } from "react"

export default function ProfileCard() {
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
    <Card className="relative flex shadow-none border-none h-min select-none mb-12 px-4 flex-col sm:flex-row rounded-none bg-color-none bg-[radial-gradient(var(--background)_20%,transparent_100%)]">
        <a href="https://github.com/eduardo-moro" target="_blank" draggable="false" className="sm:w-20 w-full flex justify-center">
            <Avatar className="sm:h-20 sm:w-20 h-32 w-32">
                <AvatarImage src={"https://github.com/eduardo-moro.png"} alt="eduardo moro" draggable="false"/>
                <AvatarFallback>EM</AvatarFallback>
            </Avatar>
        </a>
        <div className="flex flex-col justify-between">
            <span>
                <h1 className="sm:text-left text-center text-xl">Eduardo Moro</h1>
                <h2 className="sm:text-left text-center">Desenvolvedor backend, ciclista e hobbista de IoT</h2>
            </span>
            <a
                className="text-gray-500 sm:text-left text-center"
                target="_blank" 
                href="https://www.tabnews.com.br/eduardomoro/pitch-o-ultimo-cacareco-de-mesa-que-voce-vai-comprar-como-desenvolvedor"
            >
                <p className="text-sm">
                    {"Leia minha ultima ultima publicação: "}
                    <span className="italic">"O ultimo cacareco de mesa que você vai precisar como dev"</span>
                </p>
            </a>
        </div>
    </Card>
  )
}
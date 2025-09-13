"use client" // Correct for TSX

import { Button } from "@/components/ui/button"
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
    <div className={`select-none font-sans opacity-75 pt-2 ${className}`}>
        <div className="flex flex-col justify-between gap-4 ">
            <span>
              <p>📍 Curitiba, PR (Brazil)</p>
              <p>📘 Lendo "A linguagem de programação Go" - Alan A.A. Donovan, Brian W. Kernighan</p>
              <p>✏️ Estudando Golang - Melhorando meu conhecimento da linguagem!</p>
              <p>📜 Baixe meu curriculo aqui</p>
              <p>🚲 44:16 Fixed gear</p>
              <p>🫂 Confira meus projetos, tente rodá-los, crie alguns requests, vai ser incrivel receber algumas dicas de como melhorar como eu mostro minhas habilidades por aqui!</p>
              <p>✉️ Sinta-se à vontade para entrar em contato comigo pelo Linkedin ou email</p>
            </span>
        </div>
    </div>
  )
}
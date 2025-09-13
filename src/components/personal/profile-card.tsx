"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { useEffect, useState } from "react"

interface ProfileCardProps {
  className?: string
}

export default function ProfileCard({ className = "" }: ProfileCardProps) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return (
      <Button 
        variant="ghost" 
        size="icon" 
        disabled 
        aria-label="Carregando perfil"
        className={className}
      >
        <div className="h-5 w-5 animate-pulse bg-muted rounded" />
      </Button>
    )
  }

  return (
    <div 
      className={`flex shadow-none border-none h-min select-none py-3 flex-col sm:flex-row rounded-lg bg-[radial-gradient(ellipse_at_center,var(--background)_0%,transparent_100%)] font-mono ${className}`}
      role="region"
      aria-label="Perfil do usuário"
    >
      <a 
        href="https://github.com/eduardo-moro" 
        target="_blank" 
        rel="noopener noreferrer"
        draggable="false" 
        className="sm:w-20 w-full flex justify-center sm:mb-0 mb-4"
        aria-label="GitHub do Eduardo Moro"
      >
        <Avatar className="sm:h-16 sm:w-16 h-20 w-20 mt-2">
          <AvatarImage 
            src="https://github.com/eduardo-moro.png" 
            alt="Foto de perfil do Eduardo Moro" 
            width={64}
            height={64}
          />
          <AvatarFallback>EM</AvatarFallback>
        </Avatar>
      </a>
      
      <div className="flex flex-col justify-between gap-2 sm:ml-4 sm:text-left text-center pt-0">
        <div>
          <h1 className="text-lg font-semibold">Eduardo Moro</h1>
          <h2 className="text-sm text-muted-foreground">
            Desenvolvedor backend, ciclista e hobbista de IoT
          </h2>
        </div>
        
        <a
          className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.tabnews.com.br/eduardomoro/pitch-o-ultimo-cacareco-de-mesa-que-voce-vai-comprar-como-desenvolvedor"
          aria-label="Leia a última publicação do Eduardo Moro"
        >
          <p>
            {"Última publicação: "}
            <span className="italic underline">"O último cacareco de mesa que você vai precisar como dev"</span>
          </p>
        </a>
      </div>
    </div>
  )
}
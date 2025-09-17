"use client"
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
    <div className={`select-none font-sans pt-2 text-slate-800 dark:text-slate-300 ${className}`}>
        <div className="flex flex-col justify-between gap-4 ">
            <span>
              <p>{'Olá! Sou o Eduardo: um programador apaixonado por terminais, exploração e criação de ferramentas de rede e por fazer a comunicação eficiente entre serviços, mantendo a preocupação com a segurança.'}</p>
              <p className="h-4"/>
              <p>{'Sou ciclista, fixeiro [ 44:16 ] -- me pergunte sobre o pedal de quarta!'}</p>
              <p className="h-4"/>
              <p>{'Adoro trabalhar com baixo nível, IoT, mas não ache que encho minha casa de dispositivos inseguros pra todo lado, eu gosto de fazer minhas automações do zero e saber de  cada linha de código.'}</p>
              <p className="h-4"/>
              <p>{'Estou na área da tecnologia desde 2019, atuo com Go, C#, C++, typescript e diversas outras ferramentas que você pode conferir no meu curriculo.'}</p>
              <p className="h-4"/>
              <p>{'Faço parte da equipe da '}<a href="https://yes.technology" target="_blank">yes</a>{', contribuindo para o equilibrio entre o desenvolvimento da industria e do meio ambiente através da economia circular.'}</p>
              <p className="duration-150 text-background hover:text-slate-800 dark:hover:text-slate-300">{'Shh, secretamente, eu gosto de fazer pães, salgados e doces, passo um bom tempo na cozinha.'}</p>
            </span>
        </div>
    </div>
  )
}
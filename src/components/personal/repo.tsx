"use client"

import { useEffect, useState } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardAction } from "@/components/ui/card"
import { Button } from "@/components/ui/button"


type Project = {
  name?: string,
  description?: string,
  stars?: number,
  language?: string,
  link?: string,
  forks?: number
}

interface IntroProps {
  className?: string,
  project?: Project,
}

export default function Repo({ className = "", project }: IntroProps) {
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
    <Card className={`w-full min-h-24 h-36 ${className}`}>
      <CardHeader>
        <CardTitle className="text-md">{project?.name??"Projeto"}</CardTitle>
        <CardDescription>
          {(project?.stars??0) + " stars"}
          {" - "}
          {(project?.forks??0) + " forks"}
        </CardDescription>
        <CardAction>
          <Button variant="link">Github</Button>
        </CardAction>
      </CardHeader>
      <CardContent className="text-xs">
        {project?.description??"Descrição do projeto bem longa pra gente ver como ficaria com uma descrição vinda do github"}
      </CardContent>
    </Card>
  )
}
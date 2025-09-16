"use client"

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { useEffect, useState } from "react"
import { getTabNewsPublications, TabNewsPublication } from "@/lib/tabnews-api"
import { Github, Linkedin, Mail, Download, Folder, Calendar } from 'lucide-react';
import { Skeleton } from "../ui/skeleton"

interface ProfileCardProps {
  className?: string
}

export default function ProfileCard({ className = "" }: ProfileCardProps) {
  const [isMounted, setIsMounted] = useState(false)
  const [latestPublication, setLatestPublication] = useState<TabNewsPublication | null>(null)

  useEffect(() => {
    setIsMounted(true)
    async function fetchLatestPublication() {
      const publications = await getTabNewsPublications("eduardomoro", 1, 1, "new")
      if (publications.length > 0) {
        setLatestPublication(publications[0])
      }
    }
    fetchLatestPublication()
  }, [])

  if (!isMounted) {
    return (
      <div
        className={`flex shadow-none border-none h-min select-none py-3 flex-col sm:flex-row rounded-lg bg-[radial-gradient(ellipse_at_center,var(--background)_0%,transparent_100%)] font-mono ${className}`}
        role="region"
        aria-label="Perfil do usuário"
      >
        <div
          className="sm:w-20 w-full flex justify-center sm:mb-0 mb-4 pt-3"
        >
          <Skeleton className="sm:h-20 sm:w-20 h-22 w-22 rounded-full" />
        </div>

        <div className="flex flex-col justify-between gap-2 sm:ml-4 sm:text-left text-center pt-0">
          <div>
            <Skeleton className="h-6 w-48 mb-1" />
            <Skeleton className="h-4 w-64" />
          </div>

          <Skeleton className="h-4 w-56" />

          <div className="flex text-sm text-muted-foreground mt-1 w-full justify-center sm:justify-start gap-4">
            <Skeleton className="h-6 w-6 rounded-full" />
            <Skeleton className="h-6 w-6 rounded-full" />
            <Skeleton className="h-6 w-6 rounded-full" />
            <Skeleton className="h-6 w-6 rounded-full" />
            <Skeleton className="h-6 w-6 rounded-full" />
            <Skeleton className="h-6 w-6 rounded-full" />
          </div>
        </div>
      </div>
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
        className="sm:w-20 w-full flex justify-center sm:mb-0 mb-4 pt-3"
        aria-label="GitHub do Eduardo Moro"
      >
        <Avatar className="sm:h-20 sm:w-20 h-22 w-22 mt-0">
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
          <h1 className="text-lg font-semibold">{'Eduardo Moro'}</h1>
          <h2 className="text-sm text-muted-foreground">
            {'Desenvolvedor backend, ciclista e hobbista de IoT'}
          </h2>
        </div>

        {latestPublication && (
          <p className="text-xs text-muted-foreground transition-colors flex justify-center sm:justify-start">
            {"Última publicação: "}
            <a
              rel="noopener noreferrer"
              href="#lastPost"
              aria-label={`Leia a última publicação: ${latestPublication.title}`}
            >
                <span className="italic underline">{`"${latestPublication.title}"`}</span>
            </a>
          </p>
        )}

        <div className="flex text-sm text-muted-foreground mt-1 w-full justify-center sm:justify-start gap-4">
          <a href="https://github.com/eduardo-moro"                    target="_blank"><Github   className="h-6 w-6 sm:h-4 sm:w-4"/></a>
          <a href="https://www.tabnews.com.br/eduardomoro/conteudos/1" target="_blank"><Folder   className="h-6 w-6 sm:h-4 sm:w-4" /></a>
          <a href="https://calendly.com/dev-eduardomoro"               target="_blank"><Calendar className="h-6 w-6 sm:h-4 sm:w-4" /></a>
          <a href="https://linkedin.com/in/eduardomoro"                target="_blank"><Linkedin className="h-6 w-6 sm:h-4 sm:w-4" /></a>
          <a href="mailto:dev.eduardomoro@gmail.com"                   target="_blank"><Mail     className="h-6 w-6 sm:h-4 sm:w-4" /></a>
          <a href="/Eduardo Moro — Analista de sistemas Go.pdf"        target="_blank"><Download className="h-6 w-6 sm:h-4 sm:w-4" /></a>
        </div>
      </div>
    </div>
  )
}

"use client"

import { Card, CardHeader, CardTitle, CardDescription, CardAction } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { getTabNewsPublications, TabNewsPublication } from "@/lib/tabnews-api"
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline"

interface PublicationsProps {
  className?: string
}

const PUBLICATIONS_PER_PAGE = 4;

export default function Publications({ className = "" }: PublicationsProps) {
  const [publications, setPublications] = useState<TabNewsPublication[]>([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [hasMore, setHasMore] = useState(true)

  useEffect(() => {
    async function fetchPublications() {
      setLoading(true)
      const fetchedPublications = await getTabNewsPublications("eduardomoro", page, PUBLICATIONS_PER_PAGE, "new")
      setPublications(fetchedPublications)
      setHasMore(fetchedPublications.length === PUBLICATIONS_PER_PAGE)
      setLoading(false)
    }
    fetchPublications()
  }, [page])

  const handlePreviousPage = () => {
    setPage((prev) => Math.max(1, prev - 1))
  }

  const handleNextPage = () => {
    setPage((prev) => prev + 1)
  }

  if (loading) {
    return (
      <div className={`grid grid-cols-1 md:grid-cols-2 gap-2 h-[100dvh] ${className}`}>
        {[...Array(PUBLICATIONS_PER_PAGE)].map((_, i) => (
          <Card key={i} className="w-full min-h-24 h-36 animate-pulse bg-muted" />
        ))}
      </div>
    )
  }

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {publications.map((publication) => (
          <Card key={publication.id} className="w-full min-h-24 h-36">
            <CardHeader>
              <CardTitle className="text-md">{publication.title}</CardTitle>
              <CardDescription>
                {publication.tabcoins} tabcoins
                {" - "}
                {publication.children_deep_count} comentários
              </CardDescription>
              <CardAction>
                <a href={`https://www.tabnews.com.br/${publication.owner_username}/${publication.slug}`} target="_blank" rel="noopener noreferrer">
                  <Button variant="link">Ver publicação</Button>
                </a>
              </CardAction>
            </CardHeader>
          </Card>
        ))}
      </div>
      <div className="flex justify-between mt-4">
        <Button onClick={handlePreviousPage} disabled={page === 1}>
          <ArrowLeftIcon className="h-4 w-4 mr-2" /> Anterior
        </Button>
        <Button onClick={handleNextPage} disabled={!hasMore}>
          Próxima <ArrowRightIcon className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  )
}

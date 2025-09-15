
                "use client"
import { useEffect, useState, useRef } from "react"
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import { getTabNewsPublications, getTabNewsPublicationBySlug, TabNewsPublication } from "@/lib/tabnews-api"
import { Button } from "@/components/ui/button"
import ImageModal from "@/components/ui/image-modal"
import { CurrencyDollarIcon, ChatBubbleOvalLeftIcon } from "@heroicons/react/24/outline"
import MarkdownImage from "./markdown-image"

interface BlogProps {
  className?: string
}

export default function Blog({ className = "" }: BlogProps) {
  const [mounted, setMounted] = useState(false)
  const [allPublications, setAllPublications] = useState<TabNewsPublication[]>([])
  const [currentPublicationIndex, setCurrentPublicationIndex] = useState(0)
  const [currentBlogContent, setCurrentBlogContent] = useState<TabNewsPublication | null>(null)
  const blogContentRef = useRef<HTMLDivElement>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImageSrc, setModalImageSrc] = useState("");
  const [modalImageAlt, setModalImageAlt] = useState("");

  useEffect(() => {
    setMounted(true)
    async function fetchPublicationsAndContent() {
      try {
        const publications = await getTabNewsPublications("eduardomoro", 1, 10, "new") // Fetch more publications
        setAllPublications(publications)

        if (publications.length > 0) {
          const initialPublication = publications[currentPublicationIndex]
          const fullContent = await getTabNewsPublicationBySlug(initialPublication.owner_username, initialPublication.slug)
          setCurrentBlogContent(fullContent)
        } else {
          console.log("No publications found for eduardomoro.")
        }
      } catch (error) {
        console.error("Error in fetchPublicationsAndContent:", error)
      }
    }
    fetchPublicationsAndContent()
  }, [currentPublicationIndex])

  const handlePrevious = () => {
    setCurrentPublicationIndex((prevIndex) => Math.max(0, prevIndex - 1))
  }

  const handleNext = () => {
    setCurrentPublicationIndex((prevIndex) =>
      Math.min(allPublications.length - 1, prevIndex + 1)
    )
  }

  const handleImageClick = (src: string, alt: string) => {
    setModalImageSrc(src);
    setModalImageAlt(alt);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalImageSrc("");
    setModalImageAlt("");
  };

  const components = {
    img: (props: React.ImgHTMLAttributes<HTMLImageElement>) => <MarkdownImage handleImageClick={handleImageClick} {...props} />,
  };

  if (!mounted) {
    return (
      <></>
    )
  }

  return (
    <div className={`select-none font-sans ${className} h-screen`}>
        <div className="flex flex-col h-screen pt-12">
          {currentBlogContent ? (
            <>
              <div className="flex justify-center mb-4">
                <Button variant="link" onClick={handlePrevious} disabled={currentPublicationIndex === 0}>
                  Anterior
                </Button>
                <Button variant="link" onClick={handleNext} disabled={currentPublicationIndex >= allPublications.length - 1 || allPublications.length === 0}>
                  Próxima
                </Button>
              </div>
              <h3 className="text-xl text-slate-400" id="lastPost">
                <span>broker://Tabnews/</span>
                <a href={`https://www.tabnews.com.br/${currentBlogContent.owner_username}`} target="_blank" rel="noopener noreferrer"><span className="text-[var(--foreground)]">{`${currentBlogContent.owner_username}/`}</span></a><br/>
                <a href={`https://www.tabnews.com.br/${currentBlogContent.owner_username}/${currentBlogContent.slug}`} target="_blank" rel="noopener noreferrer"><span className="text-[var(--foreground)]">{currentBlogContent.title}</span></a>
              </h3>
              <div className="flex items-center text-sm text-muted-foreground mt-2">
                <CurrencyDollarIcon className="h-4 w-4 mr-1" /> {currentBlogContent.tabcoins}
                <ChatBubbleOvalLeftIcon className="h-4 w-4 ml-4 mr-1" /> {currentBlogContent.children_deep_count}
              </div>
              <div ref={blogContentRef} className="max-h-[80dvh] overflow-y-scroll mt-2 prose prose-invert">
                <ReactMarkdown components={components} rehypePlugins={[rehypeRaw]}>{currentBlogContent.body}</ReactMarkdown>
                <p className="text-center text-lg py-12">fim da publicação</p>
              </div>
            </>
          ) : (
            <div className="text-center text-muted-foreground">Nenhuma publicação encontrada.</div>
          )}
        </div>
        {isModalOpen && (
          <ImageModal src={modalImageSrc} alt={modalImageAlt} onClose={handleCloseModal} />
        )}
    </div>
  )
}
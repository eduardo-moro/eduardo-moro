import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardAction } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const truncateDescription = (description: string | undefined, maxLength: number) => {
  if (!description) return "";
  if (description.length <= maxLength) return description;
  return description.substring(0, maxLength) + "...";
};

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
          <a href={project?.link ?? "#"} target="_blank" rel="noopener noreferrer">
            <Button variant="link">Github</Button>
          </a>
        </CardAction>
      </CardHeader>
      <CardContent className="text-xs font-sans pt-0">
        {truncateDescription(project?.description, 100)??"Descrição do projeto"}
      </CardContent>
    </Card>
  )
}
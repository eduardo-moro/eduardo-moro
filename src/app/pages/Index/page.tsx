import ProfileCard from "@/components/personal/profile-card"
import Intro from "@/components/personal/intro"
import { DotBackground } from "@/components/ui/dots"
import Blog from "@/components/personal/blog"
import Repo from "@/components/personal/repo"


export default function Index() {
  return (
    <div className="w-full flex flex-col items-center px-6 snap-mandatory h-[100dvh] snap-y overflow-y-scroll absolute ">
      <div className="h-screen w-full snap-center sm:max-w-[80%] max-w-[800px]">
        <DotBackground>
          <ProfileCard  className="w-full lg:max-w-[800px] sticky top-[34%] sm:top-[42%]" />
        </DotBackground>
      </div>

      <div className="h-screen w-full snap-center sm:max-w-[80%] max-w-[800px]  max-h-screen pb-20 pt-2 scroll-mt-[18em] sm:scroll-mt-[-12em]">
        <Intro />
      </div>

      <div className="h-screen w-full snap-center sm:max-w-[80%] max-w-[800px]  max-h-screen sm:snap-align-none">
        <div className=" flex flex-col gap-2 content-center">
          <div className="flex gap-2 flex-col md:flex-row">
              <Repo project={{name: "Geekmagic fake-os", description: "firmware para dispositivo alike geek magic", stars: 12}}/>
              <Repo />
            </div>
            <div className="flex gap-2 flex-col md:flex-row">
              <Repo />
              <Repo />
          </div>
        </div>
      </div>
      
      <div className="w-full snap-end sm:max-w-[80%] max-w-[800px] mt-[18dvh]">
        <Blog />
      </div>
      
      <div className="w-full snap-end sm:max-w-[80%] max-w-[800px] mt-[18dvh]">
        <Blog />
      </div>
    </div>
  )
}
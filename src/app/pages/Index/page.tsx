"use client"

import ProfileCard from "@/components/personal/profile-card"
import Intro from "@/components/personal/intro"
import { DotBackground } from "@/components/ui/dots"


export default function Index() {

  return (
    <div className="w-full flex flex-col justify-center items-center">
        <div className="w-full flex h-[100dvh] justify-center items-start flex-col max-w-[80%] lg:max-w-[800px]">
            <DotBackground>
                <ProfileCard />
            </DotBackground>
        </div>

        <div className="max-w-[80%] lg:max-w-[800px]">
            <Intro/>
        </div>
    </div>
  )
}
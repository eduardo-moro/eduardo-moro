"use client"

import ProfileCard from "@/components/personal/profile-card"
import Intro from "@/components/personal/intro"
import { DotBackground } from "@/components/ui/dots"

export default function Index() {
  return (
    <div className="w-full flex flex-col items-center min-h-[170dvh]">
      <div className="w-full max-w-[60%] lg:max-w-[800px] snap-mandatory">
        <DotBackground>
          <ProfileCard  className="sticky top-[44%] scale-[1.2]" />
        </DotBackground>

        <Intro className="relative snap-center"/>
      </div>
    </div>
  )
}
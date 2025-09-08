"use client"

import ProfileCard from "@/components/personal/profile-card"
import Intro from "@/components/personal/intro"


export default function Index() {

  return (
    <div className="w-full flex flex-col justify-center items-center max-w-[80%] lg:max-w-[800px]">
        <div className="w-full flex h-[100dvh] justify-center items-start flex-col">
            <ProfileCard />
        </div>

        <Intro />
    </div>
  )
}
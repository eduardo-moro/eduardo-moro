"use client";

import ProfileCard from "@/components/personal/profile-card";
import Intro from "@/components/personal/intro";
import { DotBackground } from "@/components/ui/dots";
import Blog from "@/components/personal/blog";
import Repo from "@/components/personal/repo";
import Publications from "@/components/personal/publications";
import { useFavicon } from "@/contexts/FaviconContext";
import { useEffect, useRef, useState } from "react";
import { getGitHubPinnedRepos, GitHubRepo } from "@/lib/github-api";
import Footer from "@/components/shared/footer";

export default function Index() {
  const { setIcoRef: setIcoRef } = useFavicon();
  const blogRef = useRef<HTMLDivElement>(null);
  const [pinnedRepos, setPinnedRepos] = useState<GitHubRepo[]>([]);

  useEffect(() => {
    async function fetchPinnedRepos() {
      const repos = await getGitHubPinnedRepos("eduardo-moro");
      console.log("Fetched pinned repos:", repos);
      setPinnedRepos(repos);
    }
    fetchPinnedRepos();

    if (blogRef.current) {
      setIcoRef(blogRef.current);
    }
  }, [setIcoRef, blogRef]);

  return (
    <div className="w-full flex flex-col items-center px-6 snap-mandatory h-[100dvh] snap-y overflow-y-scroll absolute scroll-smooth">
      <div className="h-screen w-full snap-center xs:max-w-[80%] max-w-[800px]">
        <DotBackground>
          <ProfileCard className="w-full max-w-[800px] sticky top-[34%] sm:top-[42%]" />
        </DotBackground>
      </div>

      <div className="h-screen w-full snap-center xs:max-w-[80%] max-w-[800px]  max-h-screen pb-20 pt-2 scroll-mt-[18em] sm:scroll-mt-[-12em]">
        <Intro />
      </div>

      <div className="h-screen w-full snap-center xs:max-w-[80%] max-w-[800px]  max-h-screen sm:snap-align-none">
        <div className=" flex flex-col gap-2 content-center">
          <div className="flex gap-2 flex-col md:flex-row">
            {pinnedRepos.slice(0, 2).map((repo) => (
              <Repo key={repo.name} project={{name: repo.name, description: repo.description, stars: repo.stargazerCount, link: repo.url, forks: repo.forkCount}}/>
            ))}
          </div>
          <div className="flex gap-2 flex-col md:flex-row">
            {pinnedRepos.slice(2, 4).map((repo) => (
              <Repo key={repo.name} project={{name: repo.name, description: repo.description, stars: repo.stargazerCount, link: repo.url, forks: repo.forkCount}}/>
            ))}
          </div>
        </div>
      </div>
      
      <div ref={blogRef} className="w-full snap-end xs:max-w-[80%] max-w-[800px] mt-[18dvh]">
        <Blog />
      </div>

      {/*<div className="w-full snap-end xs:max-w-[80%] max-w-[800px]">
        <Publications className=" h-screen" />
      </div>*/}
      <Footer />
    </div>
  );
}
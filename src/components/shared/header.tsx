"use client"

import ToggleTheme from "@/components/theme/theme-toggle"
import ToggleLang from "@/components/shared/lang-toggle"

export default function Header() {

  return (
    <div className="flex justify-between p-2 fixed w-full">
      <ToggleTheme/>
      <ToggleLang/>
    </div>
  )
}
"use client"
import PublicNavigation from "./PublicNavigation"
import PrivateNavigation from "./PrivateNavigation"
import { AuthContext } from "@/app/_providers/AuthContext"
import { useContext } from "react"
import { usePathname } from "next/navigation"

export default function Navigation() {
  const pathname = usePathname()
  const { isAuthorized } = useContext(AuthContext)
  if (isAuthorized === true)
    return (
      <PrivateNavigation showHamburgerAlways={pathname !== "/"} />
    )
  return <PublicNavigation />
}

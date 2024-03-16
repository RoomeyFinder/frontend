"use client"
import PublicNavigation from "./PublicNavigation"
import PrivateNavigation from "./PrivateNavigation"
import { AuthContext } from "@/app/_providers/AuthContext"
import { useContext } from "react"

export default function Navigation() {
  const { isAuthorized } = useContext(AuthContext)
  if (isAuthorized === true) return <PrivateNavigation />
  return <PublicNavigation />
}

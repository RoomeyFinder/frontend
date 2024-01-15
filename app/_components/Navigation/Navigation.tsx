"use client"
import PublicNavigation from "./PublicNavigation"
import PrivateNavigation from "./PrivateNavigation"

export default function Navigation({ isAuthenticated }: {
  isAuthenticated: boolean
}) {
  if (isAuthenticated) return <PrivateNavigation />
  return <PublicNavigation />
}

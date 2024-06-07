"use client"
import PublicNavigation from "./PublicNavigation"
import PrivateNavigation from "./PrivateNavigation"
import { useAppSelector } from "@/app/_redux"

export default function Navigation() {
  const { user } = useAppSelector((store) => store.auth)
  if (user) return <PrivateNavigation />
  return <PublicNavigation />
}

"use client"
import PublicNavigation from "./PublicNavigation"
import PrivateNavigation from "./PrivateNavigation"
import { useAppSelector } from "@/app/_redux"

export default function Navigation() {
  const { user, loading } = useAppSelector((store) => store.auth)
  if(loading) return <></>
  if (user) return <PrivateNavigation />
  return <PublicNavigation />
}

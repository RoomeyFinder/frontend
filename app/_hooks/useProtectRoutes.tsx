"use client"
import { usePathname, useRouter } from "next/navigation"
import { useCallback, useEffect } from "react"
import { useAppSelector } from "../_redux"
import STORAGE_KEYS from "../STORAGE_KEYS"
import localforage from "localforage"

export default function useProtectRoutes() {
  const router = useRouter()
  const pathname = usePathname()
  const { loading, user } = useAppSelector((store) => store.auth)

  const redirectWhenNotAuthorized = useCallback(() => {
    const currentUrl = window.location.pathname
    if (!loading && !user && pathname.toLowerCase().includes("nexus"))
      if (pathname.toLowerCase().includes("nexus"))
        router.push(`/login?next=${currentUrl + window.location.search}`)
  }, [pathname, router, user, loading])

  useEffect(() => {
    redirectWhenNotAuthorized()
  }, [redirectWhenNotAuthorized])
}

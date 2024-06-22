"use client"
import { usePathname, useRouter } from "next/navigation"
import { useCallback, useEffect } from "react"
import { useAppSelector } from "../_redux"

export default function useProtectRoutes() {
  const router = useRouter()
  const pathname = usePathname()
  const { loading, user } = useAppSelector((store) => store.auth)

  const redirectWhenNotAuthorized = useCallback(() => {
    if (!loading)
      if (
        !user &&
        (pathname.toLowerCase().startsWith("/nexus") ||
          pathname.toLowerCase().startsWith("/messenger"))
      ) {
        const currentUrl = window.location.pathname
        router.push(`/login?next=${currentUrl + window.location.search}`)
      }
  }, [pathname, router, user, loading])

  useEffect(() => {
    redirectWhenNotAuthorized()
  }, [redirectWhenNotAuthorized])
}

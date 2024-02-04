"use client"
import localforage from "localforage"
import { usePathname, useRouter } from "next/navigation"
import { useCallback, useEffect, useState } from "react"

const privatePaths = [
  "/profile",
  "/my-ads",
  "/chats",
  "/favorites",
  "/interests",
  "/notifications",
  "/",
]
const authPaths = ["/login", "/signup"]

export default function useCheckAuthentication() {
  const [token, setToken] = useState<string | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  const redirect = useCallback(() => {
    if (!authPaths.includes(pathname) && pathname !== "/") router.push("/")
  }, [pathname, router])

  const revokeAuth = useCallback(() => {
    setIsAuthenticated(false)
    setToken(null)
  }, [])

  const getTokenFromStorage = useCallback(async () => {
    const tokenInStorage = sessionStorage.getItem("rftoken")
    if (!tokenInStorage) {
      return await localforage
        .getItem("rftoken")
    } else {
      return tokenInStorage
    }
  }, [])

  const checkAuth = useCallback(async () => {
    const tokenInStorage = await getTokenFromStorage()
    if (typeof tokenInStorage === "string") {
      setToken(tokenInStorage as string)
      setIsAuthenticated(true)
    } else {
      revokeAuth()
      if (
        (privatePaths.some((it) =>
          pathname.toLowerCase().startsWith(it.toLowerCase())
        ) ||
          authPaths.includes(pathname.toLowerCase()))
      ) {
        redirect()
      }
    }
  }, [getTokenFromStorage, pathname, redirect, revokeAuth])

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  return {
    isAuthenticated,
    token,
  }
}

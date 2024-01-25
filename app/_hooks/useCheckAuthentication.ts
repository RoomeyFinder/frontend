"use client"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"


const privatePaths = [
  "/profile",
  "/my-ads",
  "/chats",
  "/favorites",
  "/interests",
  "/notifications",
  "/",
]
const authPaths = [
  "/login",
  "/signup"
]

export default function useCheckAuthentication(){
  const [token, setToken] = useState<string | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  useEffect(() => {
    if((privatePaths.includes(pathname.toLowerCase()) || authPaths.includes(pathname.toLowerCase())) && token === null) {
      let tokenInStorage = localStorage.getItem("rftoken")
      if (!tokenInStorage) tokenInStorage = sessionStorage.getItem("rftoken")
      if (tokenInStorage) {
        setToken(tokenInStorage)
        setIsAuthenticated(true)
      }else{
        if(!authPaths.includes(pathname) && pathname !== "/") router.push("/")
      }
    }
  }, [token, pathname, router])

  return {
    isAuthenticated, 
    token,
  }
}
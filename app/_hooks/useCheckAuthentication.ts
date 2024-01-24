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
  "/"
]
export default function useCheckAuthentication(){
  const [token, setToken] = useState<string | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  useEffect(() => {
    if(privatePaths.includes(pathname.toLowerCase()) && token === null) {
      let tokenInStorage = localStorage.getItem("rftoken")
      if (!tokenInStorage) tokenInStorage = sessionStorage.getItem("rftoken")
      if (tokenInStorage) {
        setToken(tokenInStorage)
        setIsAuthenticated(true)
      }else{
        pathname !== "/" && router.push("/")
      }
    }
  }, [token, pathname, router])

  return {
    isAuthenticated, 
    token,
  }
}
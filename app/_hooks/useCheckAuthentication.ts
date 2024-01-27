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
const authPaths = [
  "/login",
  "/signup"
]

export default function useCheckAuthentication(){
  const [token, setToken] = useState<string | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  const redirect = useCallback(() => {
    if (!authPaths.includes(pathname) && pathname !== "/") router.push("/")
  }, [pathname, router])

  useEffect(() => {
    if((privatePaths.includes(pathname.toLowerCase()) || authPaths.includes(pathname.toLowerCase())) && token === null) {
      let tokenInStorage = sessionStorage.getItem("rftoken")
      if(!tokenInStorage){
        localforage.getItem("rftoken").then((val) => {
          tokenInStorage = val as string
          if(val){
            setToken(val as string)
            setIsAuthenticated(true)
          }else{
            redirect()
          }
        }).catch(() => {
          redirect()
        })
      }else {
        setToken(tokenInStorage)
        setIsAuthenticated(true)
      }
    }
  }, [token, pathname, redirect])

  return {
    isAuthenticated, 
    token,
  }
}
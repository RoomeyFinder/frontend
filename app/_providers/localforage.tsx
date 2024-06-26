"use client"
import localforage from "localforage"
import { ReactNode, useEffect } from "react"

export default function LocalForageProvider({ children }: {
  children: ReactNode | ReactNode
}){
  useEffect(() => {
    localforage.ready(() =>
      localforage.config({
        driver: localforage.INDEXEDDB, // Force WebSQL; same as using setDriver()
        name: "RoomeyFinder",
        version: Number(process.env.NEXT_PUBLIC_APP_VERSION) || 1,
        description: "RoomeyFinder Offline Store",
        storeName: "app",
      })
    )
  }, [])
  return (
    <>
      {children}
    </>
  )
}
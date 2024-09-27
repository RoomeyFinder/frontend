"use client"
import { ReactNode, useEffect } from "react"
import { useAppSelector } from "../../_redux"
import { useRouter } from "next/navigation"

export default function NexusLayout({
  children,
}: {
  children: ReactNode | ReactNode[]
}) {
  const { user, loading } = useAppSelector((store) => store.auth)
  const router = useRouter()
  useEffect(() => {
    if (!loading && !user) router.push("/")
  }, [user, loading, router])
  return <>{children}</>
}

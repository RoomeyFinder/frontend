"use client"
import { Box } from "@chakra-ui/react"
import { ReactNode, useCallback } from "react"
import { useRouter } from "next/navigation"
import { useAppSelector } from "../_redux"

export default function PublishAdClicker({
  children,
}: {
  children: ReactNode | ReactNode[]
}) {
  const router = useRouter()
  const { user } = useAppSelector((store) => store.auth)

  const handlePublishAd = useCallback(() => {
    if (user) router.push("/ads?new=true")
    else router.push("/signup?next=/ads?new=true")
  }, [user, router])

  return (
    <>
      <Box as="span" onClick={handlePublishAd}>
        {children}
      </Box>
    </>
  )
}

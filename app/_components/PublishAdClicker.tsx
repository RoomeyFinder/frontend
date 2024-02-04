"use client"
import { Box } from "@chakra-ui/react"
import { ReactNode, useCallback } from "react"
import useCheckAuthentication from "../_hooks/useCheckAuthentication"
import { useRouter } from "next/navigation"

export default function PublishAdClicker({
  children,
}: {
  children: ReactNode | ReactNode[]
}) {
  const router = useRouter()
  const { isAuthenticated } = useCheckAuthentication()

  const handlePublishAd = useCallback(() => {
    if (isAuthenticated === true) router.push("/my-ads?new=true")
    else if (isAuthenticated === false) router.push("/signup")
  }, [isAuthenticated, router])

  return (
    <>
      <Box as="span" onClick={handlePublishAd}>
        {children}
      </Box>
    </>
  )
}

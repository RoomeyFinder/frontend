"use client"
import { Box } from "@chakra-ui/react"
import { ReactNode, useCallback, useContext } from "react"
import { useRouter } from "next/navigation"
import { AuthContext } from "../_providers/AuthContext"

export default function PublishAdClicker({
  children,
}: {
  children: ReactNode | ReactNode[]
}) {
  const router = useRouter()
  const { isAuthorized } = useContext(AuthContext)

  const handlePublishAd = useCallback(() => {
    if (isAuthorized === true) router.push("/ads?new=true")
    else if (isAuthorized === false) router.push("/signup?next=/ads?new=true")
  }, [isAuthorized, router])

  return (
    <>
      <Box as="span" onClick={handlePublishAd}>
        {children}
      </Box>
    </>
  )
}

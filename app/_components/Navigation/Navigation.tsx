"use client"
import PublicNavigation from "./PublicNavigation"
import PrivateNavigation from "./PrivateNavigation"
import { Box } from "@chakra-ui/react"

export default function Navigation({ isAuthenticated }: {
  isAuthenticated: boolean
}) {
  if (isAuthenticated === true) return <PrivateNavigation />
  else if (isAuthenticated === false) <PublicNavigation />
  return <Box></Box>
}

"use client"
import { Box } from "@chakra-ui/react"
import { AppFooterContent } from "./_components/AppFooter"
import NotFound from "./_components/NotFound"

export default function Error() {
  return (
    <Box >
      <NotFound />
      <AppFooterContent />
    </Box>
  )
}

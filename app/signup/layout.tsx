import { Box } from "@chakra-ui/react"
import { ReactNode } from "react"

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <Box height="100dvh" overflow="hidden">
      {children}
    </Box>
  )
}

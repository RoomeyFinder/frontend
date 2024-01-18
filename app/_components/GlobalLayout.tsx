import { ReactNode } from "react"
import AppHeader from "./AppHeader"
import { Box, Flex } from "@chakra-ui/react"
import AppFooter from "./AppFooter"



export default function GlobalLayout({ children, isAuthenticated }: {
  children: ReactNode | ReactNode[],
  isAuthenticated: boolean
}){
  return(
    <Box h="100dvh" overflow="auto">
      <AppHeader isAuthenticated={isAuthenticated} />
      <Flex justifyContent="center" alignItems="center" minH={{ base: "calc(100dvh - 30%)", sm: "calc(100dvh - 23%)" }}>
        <Box flexGrow="1">{children}</Box>
      </Flex>
      <AppFooter/>
    </Box>
  )
}

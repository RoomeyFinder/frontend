"use client"
import { ReactNode } from "react"
import AppHeader from "./AppHeader"
import { Box, Flex } from "@chakra-ui/react"
import AppFooter from "./AppFooter"
import useCheckAuthentication from "@/app/_hooks/useCheckAuthentication"


export default function GlobalLayout({ children }: {
  children: ReactNode | ReactNode[],
}){
  const { isAuthenticated } = useCheckAuthentication()
  return(
    <Box h="100dvh" overflow="auto">
      <AppHeader isAuthenticated={isAuthenticated ? true : false} />
      <Flex justifyContent="center" alignItems="center" minH={{ base: "calc(100dvh - 30%)", sm: "calc(100dvh - 23%)" }}>
        <Box flexGrow="1">{children}</Box>
      </Flex>
      <AppFooter/>
    </Box>
  )
}

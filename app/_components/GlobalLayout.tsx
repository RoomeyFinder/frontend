import { ReactNode } from "react"
import AppHeader from "./AppHeader"
import { Box } from "@chakra-ui/react"
import AppFooter from "./AppFooter"



export default function GlobalLayout({ children}: {
  children: ReactNode | ReactNode[]
}){
  return(
    <Box h="100dvh" overflow="auto">
      <AppHeader/>
      <Box minH={{ base: "calc(100dvh - 30%)", sm: "calc(100dvh - 23%)" }}>
        {children}
      </Box>
      <AppFooter/>
    </Box>
  )
}

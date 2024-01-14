import { ReactNode } from "react"
import AppHeader from "./AppHeader"
import { Box } from "@chakra-ui/react"



export default function GlobalLayout({ children}: {
  children: ReactNode | ReactNode[]
}){
  return(
    <Box h="100dvh">
    <AppHeader/>
      {children}
    </Box>
  )
}

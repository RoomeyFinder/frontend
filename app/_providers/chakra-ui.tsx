
"use client"
import { ChakraProvider } from "@chakra-ui/react"
import { Global } from "@emotion/react"
import { ReactNode } from "react"
import theme from "../_config/chakra-theme"

export default function ChakraUIProvider({ children }: {
  children: ReactNode | ReactNode[]
}){
  return (
    <ChakraProvider theme={theme}>
      <Global styles={`
        @font-face {
          font-family: 'Proxima Nova';
          font-style: cursive;
          font-display: swap;
          font-weight: 400;
          src: url('/Proxima Nova Font.otf') format('otf');
          unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
        }`}/>
      {children}
    </ChakraProvider>
  )
}
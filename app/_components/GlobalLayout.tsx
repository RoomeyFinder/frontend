"use client"
import { ReactNode } from "react"
import AppHeader from "./AppHeader"
import { Box, Flex } from "@chakra-ui/react"
import AppFooter from "./AppFooter"
import useListenForMessengerEvents from "../_socket/eventListeners/messenger"

export default function GlobalLayout({
  children,
}: {
  children: ReactNode | ReactNode[]
}) {
  useListenForMessengerEvents()
  return (
    <Box>
      <AppHeader />
      <Flex
        justifyContent="center"
        alignItems="center"
        minH={{ base: "80dvh" }}
      >
        <Box flexGrow="1">{children}</Box>
      </Flex>
      <AppFooter />
    </Box>
  )
}

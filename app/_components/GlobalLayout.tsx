"use client"
import { ReactNode } from "react"
import AppHeader from "./AppHeader"
import { Box, Flex } from "@chakra-ui/react"
import AppFooter from "./AppFooter"
import useListenForMessengerEvents from "../_socket/eventListeners/messenger"
import { usePathname } from "next/navigation"
import NexusLayout from "./NexusLayout/NexusLayout"
import PreferencesReminder from "./PreferencesReminder"

export default function GlobalLayout({
  children,
}: {
  children: ReactNode | ReactNode[]
}) {
  useListenForMessengerEvents()
  const pathname = usePathname()

  if (pathname.includes("nexus")) return (
    <NexusLayout>
      <PreferencesReminder />
      {children}
    </NexusLayout>
  )
  return (
    <Box maxW={{ "2xl": "144rem" }} mx="auto">
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

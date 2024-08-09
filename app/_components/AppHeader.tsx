"use client"
import { Flex } from "@chakra-ui/react"
import AppLogo from "./Logo"
import Navigation from "./Navigation/Navigation"
import Link from "next/link"

export default function AppHeader() {
  return (
    <Flex
      as="header"
      bg="rgba(58, 134, 255, 0.05)"
      height="8rem"
      width="100dvw"
      px={{ base: "1.5rem", sm: "4rem", md: "6rem" }}
    >
      <Flex
        justifyContent={{ base: "space-between" }}
        w="full"
        maxW="125rem"
        mx="auto"
      >
        <Flex href="/" as={Link} aria-label="home-page">
          <AppLogo showTextLogoAlways={!false} />
        </Flex>
        <Navigation />
      </Flex>
    </Flex>
  )
}

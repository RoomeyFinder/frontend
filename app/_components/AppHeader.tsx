"use client"
import { Flex } from "@chakra-ui/react"
import AppLogo from "./Logo"
import Navigation from "./Navigation/Navigation"
import Link from "next/link"

export default function AppHeader() {
  return (
    <Flex
      data-testid="header"
      as="header"
      className="header"
      position="fixed"
      zIndex="1000"
      top="0"
      insetX="0"
      h="8rem"
      px={{ base: "5.5%", md: "5.5%" }}
      boxShadow="0px 2px 0px 0px rgba(0,0,0,0.05);"
      bg="white.main"
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

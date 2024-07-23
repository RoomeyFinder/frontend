"use client"
import { Flex } from "@chakra-ui/react"
import AppLogo from "./Logo"
import Navigation from "./Navigation/Navigation"
import Link from "next/link"
import { useAppSelector } from "../_redux"

export default function AppHeader() {
  const { user } = useAppSelector((store) => store.auth)
  return (
    <Flex
      data-testid="header"
      as="header"
      position="sticky"
      zIndex="1000"
      top="0"
      minH="8rem"
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
        <Flex href={user ? "/nexus" : "/"} as={Link} aria-label="home-page">
          <AppLogo showTextLogoAlways={!false} />
        </Flex>
        <Navigation />
      </Flex>
    </Flex>
  )
}

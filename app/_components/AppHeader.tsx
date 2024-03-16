import { Flex, } from "@chakra-ui/react"
import AppLogo from "./Logo"
import SearchBar from "./SearchBar"
import Navigation from "./Navigation/Navigation"
import Link from "next/link"



export default function AppHeader() {
  return (
    <Flex
      data-testid="header"
      as="header"
      position="sticky"
      zIndex="100"
      top="0"
      height="7.4%"
      justifyContent={{ base: "space-between", "2xl": "space-around" }}
      px={{ base: "3.125%", md: "3.125%" }}
      border="1px solid"
      borderColor="white.100"
      boxShadow="0px 1px 1px 0px rgba(0, 0, 0, 0.25)"
      bg="white.main"
    >
      <Flex href="/" as={Link}>
        <AppLogo />
      </Flex>
      <Flex
        width={{ base: "60%", md: "75%" }}
        maxW="50rem"
        justifyContent="center"
        alignItems="center"
      >
        <SearchBar />
      </Flex>
      <Navigation />
    </Flex>
  )
}
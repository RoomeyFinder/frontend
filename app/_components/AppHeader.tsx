import { Flex } from "@chakra-ui/react"
import AppLogo from "./Logo"
import SearchBar from "./SearchBar"
import Navigation from "./Navigation/Navigation"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function AppHeader() {
  const pathname = usePathname()
  return (
    <Flex
      data-testid="header"
      as="header"
      position="sticky"
      zIndex="150"
      top="0"
      h="9dvh"
      minH="8rem"
      justifyContent={{ base: "space-between", "2xl": "space-around" }}
      px={{ base: "3.125%", md: "3.125%" }}
      border="1px solid"
      borderColor="white.100"
      boxShadow="0px 1px 1px 0px rgba(0, 0, 0, 0.25)"
      bg="white.main"
    >
      <Flex href="/" as={Link}>
        <AppLogo showTextLogoAlways={pathname !== "/"} />
      </Flex>
      <Navigation />
    </Flex>
  )
}

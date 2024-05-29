import { Flex } from "@chakra-ui/react"
import AppLogo from "./Logo"
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
      minH="8rem"
      justifyContent={{ base: "space-between" }}
      px={{ base: "5.5%", md: "5.5%" }}
      boxShadow="0px 2px 0px 0px rgba(0,0,0,0.05);"
      bg="white.main"
    >
      <Flex href="/" as={Link} aria-label="home-page">
        <AppLogo showTextLogoAlways />
      </Flex>
      <Navigation />
    </Flex>
  )
}

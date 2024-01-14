import { Flex, } from "@chakra-ui/react";
import AppLogo from "./Logo";
import SearchBar from "./SearchBar";
import Navigation from "./Navigation/Navigation";



export default function AppHeader() {
  return (
    <Flex
      as="header"
      height="7.4%"
      justifyContent="space-between"
      px={{ base: "3.125%", md: "3.125%" }}
      border="1px solid"
      borderColor="white.100"
      boxShadow="0px 1px 1px 0px rgba(0, 0, 0, 0.25)"
    >
      <AppLogo />
      <Flex width={{ base: "60%", md: "75%" }} maxW="50rem" justifyContent="center" alignItems="center">
        <SearchBar />
      </Flex>
      <Navigation isAuthenticated={true} />
    </Flex>
  )
}
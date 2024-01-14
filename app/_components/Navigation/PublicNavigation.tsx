import HamburgerIcon from "@/app/_assets/HamburgerIcon";
import { HStack, Show, Button, Drawer, DrawerBody, DrawerContent, DrawerOverlay, Flex, IconButton, useDisclosure, Link, CloseButton } from "@chakra-ui/react";
import { useRef } from "react";
import AppLogo from "../Logo";
import SupportNav from "./SupportNavList";

const SignupButton = () => {
  return (<Button
    textAlign="center"
    px="2.3rem"
    py="1.045rem"
    h="unset"
    _hover={{ textDecor: "none" }}
    as={Link} href="/signup"
    size="sm"
    variant="filled">Sign up</Button>)
}
const LoginButton = () => {
  return <Link href="/login" fontWeight="600" textAlign={{ base: "center", md: "right" }} fontSize="1.6rem">Login</Link>
}


export default function PublicNavigation() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef<HTMLButtonElement | null>(null)
  return (
    <Flex alignItems="center">
      <Show above="md">
        <HStack gap="2rem" w="100%">
          <LoginButton />
          <SignupButton />
        </HStack>
      </Show>
      <Show below="md">
        <IconButton
          aria-label='Navigation'
          icon={<HamburgerIcon />}
          onClick={onOpen}
          variant='outline'
          border="none"
          h="unset"
          bg="transparent"
          ref={btnRef}
          _hover={{ bg: "brand.10", color: "brand.main" }}
        />
        <Drawer
          isOpen={isOpen}
          placement='top'
          onClose={onClose}
          finalFocusRef={btnRef}
        >
          <DrawerOverlay />
          <DrawerContent bg="white.main" w="100%" px="1.5rem" py="2rem" borderBottom="1px solid" borderBottomColor="white.100" boxShadow="0px 1px 1px 0px rgba(0, 0, 0, 0.25)">
            <Flex justifyContent="space-between" mb="2rem" w="100%" maxW="60rem" mx="auto" alignItems="center">
              <AppLogo showTextLogo="base" />
              <CloseButton borderRadius="0" _hover={{ bg: "brand.10", color: "brand.main" }} 
              onClick={onClose} size="lg" justifyContent="center" ml="auto" mr="2rem" />
            </Flex>
            <DrawerBody display="flex" flexDir="column" gap="1.5rem" w="100%" maxW="60rem" mx="auto">
              <LoginButton />
              <SignupButton />
              <SupportNav navItemComponent={Button} navItemStyles={{
                px: "2.3rem", py: "1.045rem", height: "unset", justifyContent: "center"
              }} />
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Show>
    </Flex>
  )
}
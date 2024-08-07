import HamburgerIcon from "../../_assets/SVG/HamburgerIcon"
import {
  HStack,
  Show,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  Flex,
  IconButton,
  useDisclosure,
  Link,
  CloseButton,
  Box,
} from "@chakra-ui/react"
import { useRef } from "react"
import AppLogo from "../Logo"
import SupportNav from "./SupportNavList"
import { supportLinks } from "@/app/_data/navLinks"
import { useRouter } from "next/navigation"
import { FooterLink } from "../AppFooter"

const SignupButton = () => {
  return (
    <Button
      px='2.3rem'
      py='1.045rem'
      as={Link}
      href='/signup'
      variant={"brand"}>
            Get Started
    </Button>
  )
}
const LoginButton = () => {
  return (
    <Link
      href='/login'
      fontWeight='600'
      textAlign={{ base: "center", md: "right" }}
      fontSize='1.6rem'>
            Login
    </Link>
  )
}

export default function PublicNavigation() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef<HTMLButtonElement | null>(null)
  const router = useRouter()
  return (
    <Flex alignItems='center'>
      <Show above='md'>
        <HStack gap='4rem' w='100%'>
          {supportLinks.map((link) => (
            <FooterLink
              href={link.href}
              key={link.name}
              onClick={() => router.push(link.href)}>
              {link.name}
            </FooterLink>
          ))}
          <LoginButton />
          <SignupButton />
        </HStack>
      </Show>
      <Show below='md'>
        <IconButton
          aria-label='Navigation'
          icon={<HamburgerIcon />}
          onClick={onOpen}
          variant='outline'
          border='none'
          h='unset'
          bg='transparent'
          ref={btnRef}
          _hover={{ bg: "brand.10", color: "brand.main" }}
        />
        <Drawer
          isOpen={isOpen}
          placement='top'
          onClose={onClose}
          finalFocusRef={btnRef}>
          <DrawerOverlay />
          <DrawerContent
            bg='white.main'
            w='100%'
            px='1.5rem'
            py='2rem'
            borderBottom='1px solid'
            borderBottomColor='white.100'
            boxShadow='0px 1px 1px 0px rgba(0, 0, 0, 0.25)'>
            <Flex
              justifyContent='space-between'
              mb='2rem'
              w='100%'
              maxW='60rem'
              mx='auto'
              alignItems='center'>
              <AppLogo showTextLogoAlways={true} />
              <CloseButton
                borderRadius='0'
                _hover={{ bg: "brand.10", color: "brand.main" }}
                onClick={onClose}
                size='lg'
                justifyContent='center'
                ml='auto'
              />
            </Flex>
            <DrawerBody
              display='flex'
              flexDir='column'
              gap='1.5rem'
              w='100%'
              maxW='60rem'
              mx='auto'>
              <LoginButton />
              <SignupButton />
              <SupportNav
                navItemComponent={Button as typeof Box}
                navItemStyles={{
                  px: "2.3rem",
                  py: "1.045rem",
                  height: "unset",
                  justifyContent: "center",
                }}
                handleClose={onClose}
              />
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Show>
    </Flex>
  )
}

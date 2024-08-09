import ActiveBall from "@/app/_assets/SVG/ActiveBall"
import LogoutIcon from "@/app/_assets/SVG/Logout"
import ThreeDotsVertical from "@/app/_assets/SVG/ThreeDots"
import { sidebarLinks } from "@/app/_data/navLinks"
import { useAppDispatch, useAppSelector } from "@/app/_redux"
import { logout } from "@/app/_redux/slices/auth.slice"
import {
  Avatar,
  Box,
  Button,
  Flex,
  IconButton,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Show,
  Text,
  VStack,
} from "@chakra-ui/react"
import { usePathname, useRouter } from "next/navigation"
import { ReactNode } from "react"

export default function NexusSidebar({
  closeSidebar,
}: {
  closeSidebar?: () => void
}) {
  const dispatch = useAppDispatch()
  return (
    <Box w="full" bg={{ md: "#3a86ff0d" }} h="100%">
      <UserInfoHeading />
      <VStack
        as="ul"
        px={{ base: "2rem", sm: "4rem", md: "5rem" }}
        pt="3.8rem"
        listStyleType="none"
        gap="4rem"
        h="80%"
        alignItems="start"
      >
        {sidebarLinks.map((link) => (
          <Box
            key={link.href}
            as="li"
            w="full"
            onClick={() => closeSidebar && closeSidebar()}
          >
            <SidebarLink href={link.href} text={link.name} icon={link.icon()} />
          </Box>
        ))}
        <Show below="md">
          <Box as="li" w="full" mt="auto">
            <Text
              as="button"
              display="flex"
              alignItems="center"
              fontSize="1.5rem"
              fontWeight="600"
              gap="1.2rem"
              color="brand.main"
              rounded="1.2rem"
              bg="brand.10"
              h="5rem"
              px="2rem"
              margin="0 auto"
              onClick={() => dispatch(logout())}
            >
              <LogoutIcon /> Logout
            </Text>
          </Box>
        </Show>
        <Text
          textAlign="center"
          fontSize="1.2rem"
          fontWeight="500"
          color="brand.main"
          mt={{ md: "auto" }}
          as="li"
          w="full"
        >
          © RoomeyFinder Inc, 2024.
          <br />
          All rights reserved.
        </Text>
      </VStack>
    </Box>
  )
}

function SidebarLink({
  href,
  icon,
  text,
}: {
  href: string
  icon: ReactNode
  text: ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  return (
    <Button
      onClick={() => router.push(href)}
      height="unset"
      bg={"transparent"}
      _hover={{ bg: "transparent", color: "brand.main" }}
      _active={{ bg: "transparent" }}
      _focus={{ bg: "transparent" }}
      _focusVisible={{ bg: "transparent" }}
      gap="1rem"
      color={pathname === href ? "brand.main" : "gray.300"}
      textDecor={pathname === href ? "underline" : "none"}
      textUnderlineOffset=".8rem"
      rounded="0"
      fontSize="2rem"
      fontWeight={pathname === href ? "500" : "400"}
    >
      <Text as="span">{icon}</Text>
      <Text as="span">{text}</Text>
    </Button>
  )
}

function UserInfoHeading() {
  const { user } = useAppSelector((store) => store.auth)
  const dispatch = useAppDispatch()

  return (
    <Flex
      alignItems="center"
      gap="1.2rem"
      py="3.2rem"
      w="full"
      borderBottom="1px solid"
      borderBottomColor="brand.main"
      pl={{ base: "2rem", sm: "4rem", md: "5rem" }}
      pr={{ base: "2rem", sm: "3rem" }}
    >
      <Box pos="relative">
        <Avatar
          src={user?.profileImage?.secure_url}
          name={user ? `${user?.firstName}  ${user?.lastName}` : ""}
          bg="brand.10"
          color="brand.main"
          size="xl"
        />
        <Text pos="absolute" top="80%" right="15%">
          <ActiveBall color="#14b474" />
        </Text>
      </Box>
      <Text fontSize="2rem" textTransform="capitalize" noOfLines={2}>
        {user?.firstName} {user?.lastName}
      </Text>
      <Show above="md">
        <Popover placement="bottom-end">
          <PopoverTrigger>
            <IconButton
              ml="auto"
              aria-label={"more"}
              bg="transparent"
              _hover={{ bg: "transparent" }}
            >
              <ThreeDotsVertical />
            </IconButton>
          </PopoverTrigger>
          <PopoverContent
            rounded="md"
            border="none"
            bg="white"
            fontSize="1.6rem"
            shadow="xl"
          >
            <PopoverBody w="full" bg="#3a86ff05">
              <Text
                as="button"
                display="flex"
                alignItems="center"
                fontSize="1.5rem"
                fontWeight="600"
                gap="1.2rem"
                w="full"
                bg="brand.10"
                rounded="1.2rem"
                color="brand.main"
                h="5rem"
                px="1.5rem"
                transition="all 250ms ease"
                _hover={{
                  color: "white",
                  bg: "brand.main",
                }}
                onClick={() => dispatch(logout())}
              >
                <LogoutIcon /> Logout
              </Text>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </Show>
    </Flex>
  )
}

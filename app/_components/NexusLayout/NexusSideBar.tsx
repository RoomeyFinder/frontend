import LogoutIcon from "@/app/_assets/SVG/Logout"
import OverviewIcon from "@/app/_assets/SVG/OverviewIcon"
import { sidebarLinks } from "@/app/_data/navLinks"
import { UserContext } from "@/app/_providers/UserProvider"
import { Avatar, Box, Button, Flex, Show, Text, VStack } from "@chakra-ui/react"
import { usePathname, useRouter } from "next/navigation"
import { ReactNode, useContext } from "react"

export default function NexusSidebar() {
  const { logout } = useContext(UserContext)
  return (
    <Box w="full" bg={{ md: "rgba(58, 134, 255, 0.05)" }} h="100%">
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
        <Box as="li" w="full">
          <SidebarLink href="/nexus" text="Overview" icon={<OverviewIcon />} />
        </Box>
        {sidebarLinks.map((link) => (
          <Box key={link.href} as="li" w="full">
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
              onClick={() => logout()}
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
  const { user } = useContext(UserContext)

  return (
    <Flex
      alignItems="center"
      gap="1.2rem"
      py="3.2rem"
      w="full"
      borderBottom="1px solid"
      borderBottomColor="brand.main"
      px={{ base: "2rem", sm: "4rem", md: "5rem" }}
    >
      <Avatar
        src={user?.profileImage?.secure_url}
        name={user ? `${user?.firstName}  ${user?.lastName}` : ""}
        bg="brand.10"
        color="brand.main"
        size="xl"
      />
      <Box>
        <Text fontSize="2rem" textTransform="capitalize" noOfLines={1}>
          {user?.firstName || "Exploit"} {user?.lastName || "Enomah"}
        </Text>
        <Text color="gray.100" fontSize="1.4rem">
          Last seen:{" "}
          {new Date(user?.lastSeen || Date.now()).toLocaleTimeString("en-us", {
            hour12: false,
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Text>
      </Box>
    </Flex>
  )
}

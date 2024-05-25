import { Box, Flex, IconButton, Show, Text } from "@chakra-ui/react"
import AppLogo from "../Logo"
import MessageIcon from "@/app/_assets/SVG/MessageIcon"
import { useRouter } from "next/navigation"
import NotificationIcon from "@/app/_assets/SVG/NotificationIcon"
import LogoutIcon from "@/app/_assets/SVG/Logout"
import HamburgerIcon from "@/app/_assets/SVG/HamburgerIcon"

const x = [
  {
    name: "Chats",
    href: "/nexus/messenger",
    icon: MessageIcon,
    hideAbove: "md",
    showBelow: "md",
    isIcon: true,
  },
  {
    name: "Notifications",
    href: "/nexus/notifications",
    icon: NotificationIcon,
    hideAbove: "md",
    showBelow: "md",
    isIcon: true,
  },
]
export default function NexusHeading({
  isMenuOpen,
  handleToggleMenu,
}: {
  isMenuOpen: boolean
  handleToggleMenu: () => void
}) {
  const router = useRouter()
  return (
    <>
      <Flex
        as="header"
        bg="rgba(58, 134, 255, 0.05)"
        height="8rem"
        width="100dvw"
        px={{ base: "2rem", sm: "4rem", md: "6rem" }}
      >
        <Flex justifyContent="space-between" w="full" alignItems="center">
          <Box as="button" onClick={() => router.push("/")}>
            <AppLogo showTextLogoAlways />
          </Box>
          <Show below="md">
            <IconButton
              onClick={() => handleToggleMenu()}
              icon={<HamburgerIcon />}
              aria-label={"toggle-menu"}
              w="5rem"
              h="5rem"
              bg="white"
              color="brand.main"
              _hover={{
                bg: "brand.10",
                color: "brand.main",
              }}
              rounded="full"
            />
          </Show>
          <Show above="md">
            <Flex alignItems="center" gap="4rem">
              <IconButton
                aria-label="Notifications"
                icon={<NotificationIcon />}
                w="5rem"
                h="5rem"
                bg="white"
                color="brand.main"
                _hover={{
                  bg: "brand.10",
                  color: "brand.main",
                }}
                rounded="full"
              />
              <IconButton
                aria-label="Notifications"
                icon={<MessageIcon />}
                w="5rem"
                h="5rem"
                bg="white"
                color="brand.main"
                _hover={{
                  bg: "brand.10",
                  color: "brand.main",
                }}
                rounded="full"
              />
              <Text
                as="button"
                display="flex"
                alignItems="center"
                fontSize="1.5rem"
                fontWeight="600"
                gap="1.2rem"
                color="white"
                rounded="1.2rem"
                bg="brand.main"
                h="5rem"
                px="1.5rem"
                transition="all 250ms ease"
                _hover={{
                  color: "brand.main",
                  bg: "brand.10",
                }}
              >
                <LogoutIcon /> Logout
              </Text>
            </Flex>
          </Show>
        </Flex>
      </Flex>
    </>
  )
}

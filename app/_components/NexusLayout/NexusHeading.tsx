import {
  Badge,
  Box,
  Button,
  Flex,
  IconButton,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Show,
  Text,
} from "@chakra-ui/react"
import AppLogo from "../Logo"
import MessageIcon from "@/app/_assets/SVG/MessageIcon"
import { usePathname, useRouter } from "next/navigation"
import NotificationIcon from "@/app/_assets/SVG/NotificationIcon"
import HamburgerIcon from "@/app/_assets/SVG/HamburgerIcon"
import useGetUnseenNotificationsCount from "@/app/_hooks/useGetUnseenNotificationsCount"

export default function NexusHeading({
  handleToggleMenu,
}: {
  handleToggleMenu: () => void
}) {
  const pathname = usePathname()
  const router = useRouter()
  const unseenNotificationsCount = useGetUnseenNotificationsCount()
  return (
    <>
      <Flex
        as="header"
        bg="rgba(58, 134, 255, 0.05)"
        height="8rem"
        width="100dvw"
        px={{ base: "1.5rem", sm: "4rem", md: "6rem" }}
      >
        <Flex justifyContent="space-between" w="full" alignItems="center">
          <Box as="button" onClick={() => router.push("/")}>
            <AppLogo showTextLogoAlways />
          </Box>
          <Flex
            alignItems="center"
            gap={{ base: "1rem", md: "4rem" }}
            pr={{ lg: "6rem" }}
          >
            <Show above="md">
              <Button
                variant="brand"
                fontWeight="600"
                py="1.2rem"
                onClick={() => router.push("/nexus/ads/new")}
              >
                Create ad
              </Button>
            </Show>
            <Text as="div" pos="relative">
              <IconButton
                aria-label="Notifications"
                icon={<NotificationIcon />}
                w={{ base: "3.8rem", md: "5rem" }}
                h={{ base: "3.8rem", md: "5rem" }}
                bg={{
                  base:
                    pathname === "/nexus/notifications"
                      ? "brand.10"
                      : "transparent",
                  md:
                    pathname === "/nexus/notifications" ? "brand.10" : "white",
                }}
                color="brand.main"
                _hover={{
                  bg: "brand.10",
                  color: "brand.main",
                }}
                rounded="full"
                onClick={() => router.push("/nexus/notifications")}
              />
              {unseenNotificationsCount ? (
                <Badge
                  top="0"
                  bg="red.main"
                  color="white"
                  pos="absolute"
                  right=".5rem"
                  w="1.7rem"
                  h="1.7rem"
                  rounded="full"
                  fontSize="1rem"
                  fontWeight="900"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  {unseenNotificationsCount}
                </Badge>
              ) : null}
            </Text>
            <IconButton
              aria-label="Notifications"
              icon={<MessageIcon />}
              w={{ base: "3.8rem", md: "5rem" }}
              h={{ base: "3.8rem", md: "5rem" }}
              bg={{ base: "transparent", md: "white" }}
              color="brand.main"
              _hover={{
                bg: "brand.10",
                color: "brand.main",
              }}
              rounded="full"
            />
            <Show below="md">
              {" "}
              <IconButton
                onClick={() => handleToggleMenu()}
                icon={<HamburgerIcon />}
                aria-label={"toggle-menu"}
                w={{ base: "3.8rem", md: "5rem" }}
                h={{ base: "3.8rem", md: "5rem" }}
                bg={{ base: "transparent", md: "white" }}
                color="brand.main"
                _hover={{
                  bg: "brand.10",
                  color: "brand.main",
                }}
                rounded="full"
              />
            </Show>
          </Flex>
        </Flex>
      </Flex>
    </>
  )
}

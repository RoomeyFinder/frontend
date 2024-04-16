import Notification, { NotificationVariant } from "@/app/_types/Notification"
import { timeAgo } from "@/app/_utils/date"
import {
  Avatar,
  Box,
  Flex,
  Heading,
  Text,
  VStack,
  keyframes,
  useAnimationState,
} from "@chakra-ui/react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useMemo, useRef } from "react"

function getActionButtonsByVariant(variant: NotificationVariant) {
  let actionButtons = null
  switch (variant) {
    case NotificationVariant.LISTING_INTEREST:
      actionButtons = (
        <>
          <AcceptInterestButton /> <DeclineInterestButton />
        </>
      )
      break
    case NotificationVariant.PROFILE_INTEREST:
      actionButtons = (
        <>
          <AcceptInterestButton /> <DeclineInterestButton />
        </>
      )
      break
    case NotificationVariant.ACCEPTED_INTEREST:
      actionButtons = <StartChatButton />
      break
    case NotificationVariant.LISTING_VIEW:
      actionButtons = <></>
      break
    case NotificationVariant.PROFILE_VIEW:
      actionButtons = <></>
      break
    case NotificationVariant.MESSAGE:
      actionButtons = <ViewMessageButton />
      break
  }
  return actionButtons
}
export default function NotificationItem({
  variant,
  size,
  notification,
  shouldRedirectToNotificationsPage = false,
}: {
  variant: NotificationVariant
  size: "small" | "large"
  notification: Notification
  shouldRedirectToNotificationsPage?: boolean
}) {
  const router = useRouter()
  const query = useSearchParams()
  const isSmall = useMemo(() => size === "small", [size])
  const isInFocus = useMemo(
    () =>
      query.get("id") === notification._id &&
      shouldRedirectToNotificationsPage === false,
    [query, notification._id, shouldRedirectToNotificationsPage]
  )
  const spin = keyframes`  
  from {background: rgba(58, 134, 255, 0.5);}   
  to {background: #F9F9F9}`
  const containerRef = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    if (isInFocus) {
      containerRef.current?.scrollIntoView({
        behavior: "smooth",
        inline: "nearest",
        block: "nearest",
      })
      const resetFocusTimeout = setTimeout(() => {
        router.push("/notifications")
      }, 2000)
      return () => {
        clearTimeout(resetFocusTimeout)
      }
    }
  }, [isInFocus])
  return (
    <Flex
      ref={containerRef}
      animation={isInFocus ? `${spin} 2s linear` : ""}
      px={isSmall ? ".8rem" : "2rem"}
      py={isSmall ? "" : "1.5rem"}
      gap={isSmall ? ".4rem" : "1.5rem"}
      alignItems="start"
      bg={"#F9F9F9"}
      borderRadius={isSmall ? "" : "1.2rem"}
      id={notification._id}
      onClick={() =>
        shouldRedirectToNotificationsPage &&
        router.push(`/notifications?id=${notification._id}`)
      }
    >
      <Box border="1px solid" borderColor="brand.main" rounded="full">
        <Avatar
          src=""
          name="Exploit enomah"
          bg="brand.50"
          w={{ base: isSmall ? "3rem" : "4rem", md: "6rem" }}
          h={{ base: isSmall ? "3rem" : "4rem", md: "6rem" }}
        />
      </Box>
      <VStack alignItems="stretch" gap=".2rem">
        <Heading
          as="h5"
          fontSize={isSmall ? "1.4rem" : "1.9rem"}
          fontWeight="600"
          lineHeight="normal"
        >
          Exploit Enomah
        </Heading>
        <Text
          fontSize="1rem"
          fontWeight="400"
          lineHeight="normal"
          color="gray.100"
        >
          {notification.body}
        </Text>

        <Flex
          alignItems="center"
          gap=".5rem"
          fontSize={isSmall ? "1rem" : { base: "1.2rem", md: "1.6rem" }}
        >
          {getActionButtonsByVariant(variant)}
        </Flex>
      </VStack>
      <Text
        fontSize={isSmall ? "1.1rem" : { base: "1.2rem", md: "1.6rem" }}
        lineHeight="1rem"
        fontWeight="700"
        color="gray.100"
        ml="auto"
        alignSelf="center"
      >
        {timeAgo(new Date("2024-04-11"))}
      </Text>
    </Flex>
  )
}

function AcceptInterestButton() {
  return (
    <Text
      as="button"
      color="brand.main"
      fontSize="inherit"
      fontWeight="700"
      gap=".5rem"
    >
      Accept
    </Text>
  )
}

function StartChatButton() {
  return (
    <Text
      as="button"
      color="brand.main"
      fontSize="inherit"
      fontWeight="700"
      gap=".5rem"
    >
      Start Chat
    </Text>
  )
}
function ViewMessageButton() {
  return (
    <Text
      as="button"
      color="brand.main"
      fontSize="inherit"
      fontWeight="700"
      gap=".5rem"
    >
      View
    </Text>
  )
}

function DeclineInterestButton() {
  return (
    <Text
      as="button"
      color="gray.main"
      fontSize="inherit"
      fontWeight="700"
      gap=".5rem"
    >
      Decline
    </Text>
  )
}

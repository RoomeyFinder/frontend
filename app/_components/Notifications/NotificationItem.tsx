import useActOnInterest from "@/app/_hooks/useActOnInterest"
import Conversation, { Message } from "@/app/_types/Conversation"
import Interest from "@/app/_types/Interest"
import Notification, { NotificationVariant } from "@/app/_types/Notification"
import { timeAgo } from "@/app/_utils/date"
import {
  Avatar,
  Box,
  Flex,
  Heading,
  Spinner,
  Text,
  VStack,
  keyframes,
} from "@chakra-ui/react"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useMemo, useRef } from "react"

function getActionButtonsByVariant(
  variant: NotificationVariant,
  data: Notification["data"]
) {
  let actionButtons = null
  switch (variant) {
    case NotificationVariant.LISTING_INTEREST ||
      NotificationVariant.PROFILE_INTEREST: {
      const dataAsInterest = { ...data } as Interest
      actionButtons =
        !data || dataAsInterest?.accepted || dataAsInterest?.declined ? (
          <></>
        ) : (
          <>
            <AcceptInterestButton />
            <DeclineInterestButton />
          </>
        )
      break
    }
    case NotificationVariant.ACCEPTED_INTEREST:
      actionButtons = <StartChatButton conversation={data as Conversation} />
      break
    case NotificationVariant.LISTING_VIEW:
      actionButtons = <></>
      break
    case NotificationVariant.PROFILE_VIEW:
      actionButtons = <></>
      break
    case NotificationVariant.MESSAGE:
      actionButtons = <ViewMessageButton message={data as Message} />
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
        router.push("/nexus/notifications")
      }, 2000)
      return () => {
        clearTimeout(resetFocusTimeout)
      }
    }
  }, [isInFocus, router])
  return (
    <Flex
      ref={containerRef}
      animation={isInFocus ? `${spin} 2s linear` : ""}
      px={isSmall ? "1rem" : "2rem"}
      py={isSmall ? ".5rem" : "1.5rem"}
      gap={isSmall ? ".4rem" : "1.5rem"}
      alignItems="center"
      bg={"#F9F9F9"}
      borderRadius={isSmall ? "" : "1.2rem"}
      id={notification._id}
      onClick={() =>
        shouldRedirectToNotificationsPage &&
        router.push(`/nexus/notifications?id=${notification._id}`)
      }
    >
      <Box border="1px solid" borderColor="brand.main" rounded="full">
        <Avatar
          src=""
          name={`${notification.from?.firstName} ${notification.from?.lastName}`}
          bg="brand.50"
          w={{ base: isSmall ? "3rem" : "4rem", md: isSmall ? "3rem" : "6rem" }}
          h={{ base: isSmall ? "3rem" : "4rem", md: isSmall ? "3rem" : "6rem" }}
        />
      </Box>
      <VStack alignItems="stretch" gap=".2rem">
        <Heading
          as="h5"
          fontSize={isSmall ? "1.4rem" : "1.9rem"}
          fontWeight="600"
          lineHeight="normal"
          textTransform="capitalize"
        >
          {notification.from?.firstName} {notification.from?.lastName}
        </Heading>
        <Text
          fontSize="1rem"
          fontWeight="400"
          lineHeight="normal"
          color="gray.main"
        >
          {notification.body}
        </Text>

        <Flex
          alignItems="center"
          gap=".5rem"
          fontSize={isSmall ? "1rem" : { base: "1.2rem", md: "1.6rem" }}
        >
          {getActionButtonsByVariant(variant, notification.data)}
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
        {timeAgo(new Date(notification.createdAt))}
      </Text>
    </Flex>
  )
}

function AcceptInterestButton() {
  const { handleAccept, loading } = useActOnInterest()
  return (
    <Text
      onClick={(e) => {
        e.stopPropagation()
        handleAccept()
      }}
      as="button"
      color="brand.main"
      fontSize="inherit"
      fontWeight="700"
      gap=".5rem"
    >
      {loading ? <Spinner color="brand.main" size="sm" /> : <>Accept</>}
    </Text>
  )
}

function StartChatButton({ conversation }: { conversation: Conversation }) {
  const router = useRouter()
  return (
    <Text
      as="button"
      color="brand.main"
      fontSize="inherit"
      fontWeight="700"
      gap=".5rem"
      onClick={(e) => {
        e.stopPropagation()
        console.log(conversation)
        return
        router.push(`/messenger?convoId=${conversation?._id}`)
      }}
    >
      Start Chat
    </Text>
  )
}
function ViewMessageButton({ message }: { message: Message }) {
  const router = useRouter()
  return (
    <Text
      as="button"
      color="brand.main"
      fontSize="inherit"
      fontWeight="700"
      gap=".5rem"
      onClick={(e) => {
        e.stopPropagation()
        router.push(`/messenger?convoId=${message?.conversationId}`)
      }}
    >
      View
    </Text>
  )
}

function DeclineInterestButton() {
  const { handleDecline, loading } = useActOnInterest()
  return (
    <Text
      onClick={(e) => {
        e.stopPropagation()
        handleDecline()
      }}
      as="button"
      color="gray.main"
      fontSize="inherit"
      fontWeight="700"
      gap=".5rem"
    >
      {loading ? <Spinner color="brand.main" size="sm" /> : <>Decline</>}
    </Text>
  )
}

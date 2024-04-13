import { NotificationVariant } from "@/app/_types/Notification"
import { timeAgo } from "@/app/_utils/date"
import { Avatar, Box, Flex, Heading, Text, VStack } from "@chakra-ui/react"
import { useMemo } from "react"

function getDisplayTextByVariant(variant: NotificationVariant) {
  let text = ""
  switch (variant) {
    case NotificationVariant.RECEIVED_LISTING_INTEREST:
      text = "showed interest in your listing"
      break
    case NotificationVariant.RECEIVED_PROFILE_INTEREST:
      text = "showed interest in your profile"
      break
    case NotificationVariant.ACCEPTED_INTEREST:
      text = "accepted your interest"
      break
    case NotificationVariant.LISTING_VIEW:
      text = "viewed your listing"
      break
    case NotificationVariant.PROFILE_VIEW:
      text = "viewed your profile"
      break
    case NotificationVariant.MESSAGE:
      text = "sent you a message"
      break
  }
  return text
}

function getActionButtonsByVariant(variant: NotificationVariant) {
  let actionButtons = null
  switch (variant) {
    case NotificationVariant.RECEIVED_LISTING_INTEREST:
      actionButtons = (
        <>
          <AcceptInterestButton /> <DeclineInterestButton />
        </>
      )
      break
    case NotificationVariant.RECEIVED_PROFILE_INTEREST:
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
}: {
  variant: NotificationVariant
  size: "small" | "large"
}) {
  const isSmall = useMemo(() => size === "small", [size])

  return (
    <Flex
      px={isSmall ?".8rem": "2rem"}
      py={isSmall ? "" : "1.5rem"}
      gap={isSmall ? ".4rem" : "1.5rem"}
      alignItems="start"
      bg="#F9F9F9"
      borderRadius={isSmall ? "" : "1.2rem"}
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
          {getDisplayTextByVariant(variant)}
        </Text>

        <Flex alignItems="center" gap=".5rem" fontSize={isSmall ? "1rem" : {base: "1.2rem", md: "1.6rem"}}>
          {getActionButtonsByVariant(variant)}
        </Flex>
      </VStack>
      <Text
        fontSize={isSmall ? "1.1rem": {base: "1.2rem", md: "1.6rem"}}
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

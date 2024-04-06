import {
  Avatar,
  Box,
  Flex,
  Heading,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Text,
} from "@chakra-ui/react"
import Conversation from "./Conversation"
import { SmallThreeDotIcon } from "@/app/_assets/SVG/ThreeDotIcon"
import { useCallback, useContext, useMemo } from "react"
import { MessengerContext } from "@/app/_providers/MessengerProvider"
import AppLogo from "@/app/_components/Logo"
import ConversationInput from "./ConversationInput"
import { MessagesContext } from "@/app/_providers/MessagesProvider"
import { CONVERSATION_EVENTS } from "@/app/_socket/events"
import { UserContext } from "@/app/_providers/UserProvider"
import User from "@/app/_types/User"

export default function ActiveConversation() {
  const { activeConversation, closeActiveConversation, socket } =
    useContext(MessengerContext)
  const { messages } = useContext(MessagesContext)
  const { user } = useContext(UserContext)

  const recipient = useMemo(() => {
    if (activeConversation?.creator?._id === user?._id)
      return activeConversation?.otherUser
    return activeConversation?.creator
  }, [user, activeConversation])

  const messagesInActiveConversation = useMemo(() => {
    return messages.filter(
      (msg) => msg.conversationId === activeConversation?._id
    )
  }, [messages, activeConversation])
  const sortedMessages = useMemo(
    () =>
      messagesInActiveConversation.toSorted(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      ),
    [messagesInActiveConversation]
  )

  const handleSendMessage = useCallback(
    (msg: string) => {
      socket.emit(CONVERSATION_EVENTS.MESSAGE, {
        recipient: recipient?._id,
        text: msg,
        conversationId: activeConversation?._id,
      })
    },
    [socket, activeConversation, recipient]
  )
  return (
    <>
      <Box
        w="full"
        position="relative"
        h={{ base: "calc(100dvh - 8rem)", sm: "calc(100dvh - 8.7rem)" }}
        overflow="hidden"
        bg="#f9f9f9"
      >
        <ConversationHeader
          closeConversation={closeActiveConversation}
          otherUser={recipient}
        />
        <Box
          h={{ base: "calc(100dvh - 28.8rem)", md: "calc(100dvh - 30rem)" }}
          overflow="auto"
        >
          <Conversation messages={sortedMessages} />
        </Box>
        <Box
          pos="sticky"
          bottom="0"
          insetX="0"
          px={{ base: "5dvw", md: "3rem" }}
          py="3rem"
          bg="linear-gradient(45deg, transparent, white)"
        >
          <ConversationInput onSubmit={handleSendMessage} />
        </Box>
      </Box>
    </>
  )
}

function ConversationHeader({
  closeConversation,
  otherUser,
}: {
  closeConversation: () => void
  otherUser?: User
}) {
  return (
    <Box position="sticky" top="0" w="full" bg="white">
      <Flex
        justifyContent="space-between"
        bg="brand.10"
        px={{ base: "2rem", sm: "5rem" }}
        alignItems="center"
        h={{ base: "7rem", sm: "9rem" }}
      >
        <Flex gap="1rem" alignItems="center">
          <Avatar />
          <Heading fontSize={{ base: "1.8rem", sm: "2rem" }}>
            {otherUser?.firstName} {otherUser?.lastName}
          </Heading>
        </Flex>
        <Popover placement="left">
          <PopoverTrigger>
            <Text as="button">
              <SmallThreeDotIcon />
            </Text>
          </PopoverTrigger>
          <PopoverContent bg="white" fontSize="1.4rem" p="1rem" w="max-content">
            <Text
              onClick={closeConversation}
              as="button"
              w="full"
              textAlign="left"
            >
              Close chat
            </Text>
          </PopoverContent>
        </Popover>
      </Flex>
    </Box>
  )
}

import { Avatar, Box, CloseButton, Flex, Heading } from "@chakra-ui/react"
import Conversation from "./Conversation"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import ConversationInput from "./ConversationInput"
import { useAppDispatch, useAppSelector } from "@/app/_redux"
import {
  fetchUserMessages,
  markMessagesAsRead,
} from "@/app/_redux/thunks/messages.thunk"
import { CONVERSATION_EVENTS } from "@/app/_socket/events"
import User from "@/app/_types/User"
import {
  removeActiveConversation,
  updateConversation,
} from "@/app/_redux/slices/conversations.slice"
import { Socket } from "socket.io-client"
import { pseudoAddNewMessage } from "@/app/_redux/slices/messages.slice"

export default function ActiveConversation({ socket }: { socket: Socket }) {
  const { user } = useAppSelector((store) => store.auth)

  const dispatch = useAppDispatch()
  const [isUserIntentionallyScrolling, setIsUserIntentionallyScrolling] =
    useState(false)
  const conversationsContainerRef = useRef<HTMLDivElement | null>(null)
  const { activeConversation } = useAppSelector((store) => store.conversations)
  const { messages } = useAppSelector((store) => store.messages)
  const messagesInActiveConversation = useMemo(
    () => (activeConversation ? messages[activeConversation?._id] : []),
    [messages, activeConversation]
  )

  useEffect(() => {
    if (activeConversation && activeConversation?.unreadMsgsCount > 0) {
      dispatch(markMessagesAsRead(activeConversation._id)).then(() => {
        dispatch(
          updateConversation({
            id: activeConversation._id,
            update: {
              unreadMsgsCount: 0,
            },
          })
        )
      })
    }
  }, [dispatch, activeConversation])
  useEffect(() => {
    if (activeConversation && !messagesInActiveConversation) {
      dispatch(fetchUserMessages(activeConversation._id))
    }
  }, [messagesInActiveConversation, activeConversation, dispatch])

  const recipient = useMemo(() => {
    if (activeConversation?.creator?._id === user?._id)
      return activeConversation?.otherUser
    return activeConversation?.creator
  }, [user, activeConversation])

  const sortedMessages = useMemo(
    () =>
      messagesInActiveConversation?.toSorted(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      ),
    [messagesInActiveConversation]
  )

  const handleSendMessage = useCallback(
    (msg: string) => {
      if (activeConversation)
        dispatch(
          pseudoAddNewMessage({
            conversationId: activeConversation?._id,
            message: {
              recipient: recipient?._id as any,
              text: msg,
              conversationId: activeConversation?._id,
              sender: user?._id as any,
              isPending: true,
              _id: Math.random().toString(),
            },
          })
        )
      socket.emit(CONVERSATION_EVENTS.MESSAGE, {
        recipient: recipient?._id,
        text: msg,
        conversationId: activeConversation?._id,
      })
    },
    [activeConversation?._id, recipient, socket, user, dispatch]
  )

  useEffect(() => {
    const currentConversationRef = conversationsContainerRef.current
    currentConversationRef?.addEventListener("scroll", (e) => {
      setIsUserIntentionallyScrolling(
        e.target != null &&
          (e.target as any).scrollHeight - (e.target as any).scrollTop > 900
      )
    })
    return () => {
      currentConversationRef?.removeEventListener("scroll", () => {})
    }
  }, [])
  return (
    <>
      <Box w="full" position="relative" h="100%" overflow="hidden">
        <ConversationHeader
          closeConversation={() => dispatch(removeActiveConversation())}
          otherUser={recipient as any}
        />
        <Box overflow="auto" h="80%" ref={conversationsContainerRef}>
          <Conversation
            messages={sortedMessages || []}
            canScrollToLatestMessage={isUserIntentionallyScrolling === false}
          />
        </Box>
        <Box
          pos="sticky"
          bottom="1rem"
          insetX="0"
          w="95%"
          maxW=""
          mx="auto"
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
          <Heading
            textTransform="capitalize"
            fontWeight="600"
            fontSize={{ base: "1.8rem" }}
          >
            {otherUser?.firstName} {otherUser?.lastName}
          </Heading>
        </Flex>
        <CloseButton
          ml="auto"
          rounded="full"
          size="xl"
          border="1px solid"
          borderColor="brand.main"
          w="3rem"
          h="3rem"
          display={{ base: "none", md: "block" }}
          onClick={() => closeConversation()}
        />
      </Flex>
    </Box>
  )
}

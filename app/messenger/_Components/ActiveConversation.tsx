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
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
// import { MessengerContext } from "@/app/_providers/MessengerProvider"
import ConversationInput from "./ConversationInput"
import { useAppDispatch, useAppSelector } from "@/app/_redux"
import { fetchUserMessages } from "@/app/_redux/thunks/messages.thunk"
import { CONVERSATION_EVENTS } from "@/app/_socket/events"
import { socket } from "@/app/_redux/slices/messages.slice"
import { SmallThreeDotIcon } from "@/app/_assets/SVG/ThreeDotIcon"
import User from "@/app/_types/User"
// import { MessagesContext } from "@/app/_providers/MessagesProvider"
// import { useAppSelector } from "@/app/_redux"

export default function ActiveConversation() {
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
    if (activeConversation && !messagesInActiveConversation) {
      dispatch(fetchUserMessages(activeConversation._id)).then(console.log)
    }
    console.log("djflsdf;a")
  }, [messagesInActiveConversation, activeConversation, dispatch])
  const { user } = useAppSelector((store) => store.auth)

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
      console.log(socket, msg)
      socket.then((socket) =>
        socket.emit("MESSAGE", {
          recipient: recipient?._id,
          text: msg,
          conversationId: activeConversation?._id,
        })
      )
      // socket?.emit(CONVERSATION_EVENTS.MESSAGE, {
      //   recipient: recipient?._id,
      //   text: msg,
      //   conversationId: activeConversation?._id,
      // })
    },
    [activeConversation?._id, recipient]
  )

  useEffect(() => {
    const currentConversationRef = conversationsContainerRef.current
    currentConversationRef?.addEventListener("scroll", (e) => {
      console.log((e.target as any).scrollHeight - (e.target as any).scrollTop)
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
      <Box
        w="full"
        position="relative"
        h="100%"
        overflow="hidden"
      >
        <ConversationHeader
          closeConversation={() => {}}
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
          bottom="5%"
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
            fontSize={{ base: "1.8rem", sm: "2rem" }}
          >
            {otherUser?.firstName} {otherUser?.lastName}
          </Heading>
        </Flex>
      </Flex>
    </Box>
  )
}

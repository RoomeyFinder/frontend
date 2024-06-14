import { Box } from "@chakra-ui/react"
import Conversation from "./Conversation"
import { useEffect, useRef, useState } from "react"
// import { MessengerContext } from "@/app/_providers/MessengerProvider"
import ConversationInput from "./ConversationInput"
// import { MessagesContext } from "@/app/_providers/MessagesProvider"
// import { useAppSelector } from "@/app/_redux"

export default function ActiveConversation() {
  const [isUserIntentionallyScrolling, setIsUserIntentionallyScrolling] =
    useState(false)
  const conversationsContainerRef = useRef<HTMLDivElement | null>(null)
  // const { activeConversation, closeActiveConversation, socket } =
  // useContext(MessengerContext)
  // const { messages } = useContext(MessagesContext)
  // const { user } = useAppSelector(store => store.auth)

  // const recipient = useMemo(() => {
  //   if (activeConversation?.creator?._id === user?._id)
  //     return activeConversation?.otherUser
  //   return activeConversation?.creator
  // }, [user, activeConversation])

  // const messagesInActiveConversation = useMemo(() => {
  //   return messages.filter(
  //     (msg) => msg.conversationId === activeConversation?._id
  //   )
  // }, [messages, activeConversation])
  // const sortedMessages = useMemo(
  //   () =>
  //     messagesInActiveConversation.toSorted(
  //       (a, b) =>
  //         new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  //     ),
  //   [messagesInActiveConversation]
  // )

  // const handleSendMessage = useCallback(
  //   (msg: string) => {
  //     socket?.emit(CONVERSATION_EVENTS.MESSAGE, {
  //       recipient: recipient?._id,
  //       text: msg,
  //       conversationId: activeConversation?._id,
  //     })
  //   },
  //   [socket, activeConversation, recipient]
  // )

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
        bg="#3a86ff0a"
      >
        {/* <ConversationHeader
          closeConversation={() => {}}
          otherUser={{} as any}
        /> */}
        <Box
          overflow="auto"
          h="full"
          ref={conversationsContainerRef}
        >
          <Conversation
            messages={[]}
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
          <ConversationInput onSubmit={() => {}} />
        </Box>
      </Box>
    </>
  )
}

// function ConversationHeader({
//   closeConversation,
//   otherUser,
// }: {
//   closeConversation: () => void
//   otherUser?: User
// }) {
//   return (
//     <Box position="sticky" top="0" w="full" bg="white">
//       <Flex
//         justifyContent="space-between"
//         bg="brand.10"
//         px={{ base: "2rem", sm: "5rem" }}
//         alignItems="center"
//         h={{ base: "7rem", sm: "9rem" }}
//       >
//         <Flex gap="1rem" alignItems="center">
//           <Avatar />
//           <Heading fontSize={{ base: "1.8rem", sm: "2rem" }}>
//             {otherUser?.firstName} {otherUser?.lastName}
//           </Heading>
//         </Flex>
//         <Popover placement="left">
//           <PopoverTrigger>
//             <Text as="button">
//               <SmallThreeDotIcon />
//             </Text>
//           </PopoverTrigger>
//           <PopoverContent bg="white" fontSize="1.4rem" p="1rem" w="max-content">
//             <Text
//               onClick={closeConversation}
//               as="button"
//               w="full"
//               textAlign="left"
//             >
//               Close chat
//             </Text>
//           </PopoverContent>
//         </Popover>
//       </Flex>
//     </Box>
//   )
// }

import { Flex, VStack } from "@chakra-ui/react"
import Message from "./Message"
import { Message as MessageInterface } from "@/app/_types/Conversation"
import { useCallback, useEffect, useRef } from "react"
// import { MessengerContext } from "@/app/_providers/MessengerProvider"
import DownChevron from "@/app/_assets/SVG/DownChevron"
import { useAppSelector } from "@/app/_redux"

export default function Conversation({
  messages,
  canScrollToLatestMessage,
}: {
  messages: MessageInterface[]
  canScrollToLatestMessage: boolean
}) {
  const { user } = useAppSelector(store => store.auth)
  // const { socket } = useContext(MessengerContext)
  const lastMessageRef = useRef<HTMLDivElement | null>(null)

  const scrollToLatestMsg = useCallback(() => {
    lastMessageRef.current?.scrollIntoView({
      behavior: "smooth",
      inline: "end",
      block: "end",
    })
  }, [])

  useEffect(() => {
    canScrollToLatestMessage && scrollToLatestMsg()
    console.log("iytsuede", canScrollToLatestMessage)
    // socket.onAny(() => {
    //   console.log("dfjkadslf", canScrollToLatestMessage)
    //   if (canScrollToLatestMessage)
    //     lastMessageRef.current?.scrollIntoView(false)
    // })
    return () => {
      // socket.offAny(() => {
      //   console.log("dfjkadslf", canScrollToLatestMessage)
      //   if (canScrollToLatestMessage)
      //     lastMessageRef.current?.scrollIntoView(false)
      // })
    }
  }, [
    scrollToLatestMsg,
    canScrollToLatestMessage,
    // socket,
  ])

  return (
    <>
      <VStack
        gap="3rem"
        alignItems="start"
        px={{ base: "3rem", md: "5rem" }}
        py="3rem"
      >
        {messages.map((msg, idx, list) => (
          <Message
            key={msg._id}
            shadow="md"
            ml={user?._id === msg.sender ? "auto" : ""}
            bg={user?._id === msg.sender ? "" : "brand.10"}
            message={msg}
            messageRef={idx === list.length - 1 ? lastMessageRef : undefined}
          />
        ))}
        {!canScrollToLatestMessage && (
          <Flex
            alignItems="center"
            justifyContent="center"
            w="4rem"
            h="4rem"
            pos="sticky"
            bottom="5rem"
            bg="brand.main"
            color="white"
            rounded="full"
            cursor="pointer"
            marginLeft="auto"
            transition="all 400ms ease"
            opacity=".4"
            _hover={{ opacity: "1" }}
            onClick={scrollToLatestMsg}
            as="button"
          >
            <DownChevron />
          </Flex>
        )}
      </VStack>
    </>
  )
}

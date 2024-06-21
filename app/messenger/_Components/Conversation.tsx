import { Flex, VStack } from "@chakra-ui/react"
import Message from "./Message"
import { Message as MessageInterface } from "@/app/_types/Conversation"
import { useCallback, useEffect, useRef } from "react"
import DownChevron from "@/app/_assets/SVG/DownChevron"
import { useAppSelector } from "@/app/_redux"
import { socket } from "@/app/_socket/socket"

export default function Conversation({
  messages,
  canScrollToLatestMessage,
}: {
  messages: MessageInterface[]
  canScrollToLatestMessage: boolean
}) {
  const { user } = useAppSelector((store) => store.auth)
  const lastMessageRef = useRef<HTMLDivElement | null>(null)

  const scrollToLatestMsg = useCallback(() => {
    if (messages?.length > 0)
      lastMessageRef.current?.scrollIntoView({
        behavior: "smooth",
        inline: "end",
        block: "nearest",
      })
  }, [messages])

  useEffect(() => {
    scrollToLatestMsg()
    socket.on("MESSAGE", (d) => {
      if (canScrollToLatestMessage)
        lastMessageRef.current?.scrollIntoView(false)
    })
    return () => {
      socket.off("MESSAGE", () => {
        if (canScrollToLatestMessage)
          lastMessageRef.current?.scrollIntoView(false)
      })
    }
  }, [scrollToLatestMsg, canScrollToLatestMessage])

  return (
    <>
      <VStack alignItems="start" px={{ base: "3rem", md: "5rem" }} py="3rem"> 
        {messages.map((msg, idx, list) => (
          <Message
            key={msg._id}
            isSameSender={list[idx + 1]?.sender === msg.sender}
            shadow="sm"
            ml={user?._id === msg.sender ? "auto" : ""}
            bg={user?._id === msg.sender ? "brand.10" : "white"}
            borderRadius={
              user?._id === msg.sender ? "8px 0 8px 8px" : "0 8px 8px 8px"
            }
            message={msg}
            messageRef={idx === list.length - 1 ? lastMessageRef : undefined}
          />
        ))}
        {!canScrollToLatestMessage && (
          <Flex
            alignItems="center"
            justifyContent="center"
            p="2rem"
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

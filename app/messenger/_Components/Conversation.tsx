import { VStack } from "@chakra-ui/react"
import Message from "./Message"
import { Message as MessageInterface } from "@/app/_types/Conversation"
import { useContext, useEffect, useRef } from "react"
import { UserContext } from "@/app/_providers/UserProvider"
import { MessengerContext } from "@/app/_providers/MessengerProvider"
import { CONVERSATION_EVENTS } from "@/app/_socket/events"

export default function Conversation({
  messages,
}: {
  messages: MessageInterface[]
}) {
  const { user } = useContext(UserContext)
  const { socket } = useContext(MessengerContext)
  const lastMessageRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView(false)
    socket.on(CONVERSATION_EVENTS.MESSAGE, () => {
      lastMessageRef.current?.scrollIntoView(false)
    })
    return () => {
      socket.off(CONVERSATION_EVENTS.MESSAGE, () => {
        lastMessageRef.current?.scrollIntoView(false)
      })
    }
  }, [])
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
      </VStack>
    </>
  )
}

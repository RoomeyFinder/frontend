import { Message as MessageInterface } from "@/app/_types/Conversation"
import { Flex, FlexProps, Text } from "@chakra-ui/react"
import { MutableRefObject } from "react"

export default function Message({
  message,
  messageRef,
  isSameSender,
  ...props
}: FlexProps & {
  isSameSender: boolean
  message: MessageInterface
  messageRef?: MutableRefObject<HTMLDivElement | null>
}) {
  return (
    <>
      <Flex
        w="max-content"
        maxW={{ base: "28rem", sm: "30rem", md: "50rem" }}
        px=".9rem"
        py=".6rem"
        rounded="1.2rem"
        gap=".5rem"
        color="gray.main"
        mb={isSameSender ? ".2rem" : "1.2rem"}
        ref={messageRef}
        {...props}
      >
        <Text fontSize={{ base: "1.4rem" }} lineHeight="150%">
          {message.text}
        </Text>
        <Text alignSelf="end" color="gray.100">
          {new Date(message.createdAt).toLocaleTimeString("en-us", {
            minute: "numeric",
            hour: "numeric",
            hour12: true,
          })}
        </Text>
      </Flex>
    </>
  )
}

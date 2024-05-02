import { Message as MessageInterface } from "@/app/_types/Conversation"
import { Flex, FlexProps, Text } from "@chakra-ui/react"
import { MutableRefObject } from "react"

export default function Message({
  message,
  messageRef,
  ...props
}: FlexProps & {
  message: MessageInterface
  messageRef?: MutableRefObject<HTMLDivElement | null>
}) {
  return (
    <>
      <Flex
        background="#D9D9D92A"
        w="fit-content"
        maxW={{ base: "28rem", sm: "30rem", md: "50rem" }}
        px="1.5rem"
        py="1rem"
        rounded="1.2rem"
        flexDir="column"
        ref={messageRef}
        {...props}
      >
        <Text fontSize={{ base: "1.2rem", md: "1.6rem" }} lineHeight="150%">
          {message.text}
        </Text>
        <Text alignSelf="end" color="gray.main">
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

import { Flex, Heading, Text } from "@chakra-ui/react"
import { ReactNode } from "react"

export default function NoConversation({
  heading,
  body,
}: {
  heading: ReactNode | ReactNode[]
  body: ReactNode | ReactNode[]
}) {
  return (
    <>
      <Flex
        h="full"
        justifyContent="center"
        alignItems="start"
        flexDir="column"
        gap="1rem"
        color="gray.main"
        pb="30rem"
        px="3rem"
        textAlign="center"
      >
        <Heading fontWeight="500" fontSize="2.4rem" color="inherit">
          {heading}
        </Heading>
        <Text fontWeight="400" fontSize="1.6rem">
          {body}
        </Text>
      </Flex>
    </>
  )
}

import { Flex, Heading, Text } from "@chakra-ui/react"
import { ReactNode } from "react"

export default function NoConversation({ heading, body }: {
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
        gap="2rem"
        color="#7070704D"
        pb="30rem"
        px="3rem"
      >
        <Heading fontWeight="500" fontSize="2.4rem" color="inherit">
          {heading}
        </Heading>
        <Text fontWeight="400" fontSize="1.4rem">
          {body}
        </Text>
      </Flex>
    </>
  )
}

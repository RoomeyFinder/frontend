import { BoxProps, Flex, Heading, Text } from "@chakra-ui/react"
import { ReactNode } from "react"

export default function NoConversation({
  heading,
  body,
  containerProps
}: {
  heading: ReactNode | ReactNode[]
  body: ReactNode | ReactNode[]
  containerProps: BoxProps
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
        {...containerProps}
      >
        <Heading fontWeight="500" fontSize="2.4rem" color="inherit">
          {heading}
        </Heading>
        <Text fontWeight="400" fontSize="1.6rem" mx="auto">
          {body}
        </Text>
      </Flex>
    </>
  )
}

import { Flex, FlexProps, Text } from "@chakra-ui/react"

export default function Message({ ...props }: FlexProps) {
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
        {...props}
      >
        <Text fontSize={{ base: "1.2rem", md: "1.6rem" }} lineHeight="150%">
          Lorem ipsum dolor sit amet consectetur. Eu aliquet proin id sit ipsum
          velit sed diam. Sagittis sit sit maecenas egestas. Aliquet
        </Text>
        <Text alignSelf="end" color="gray.main">
          12:00 AM
        </Text>
      </Flex>
    </>
  )
}

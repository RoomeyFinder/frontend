import { Avatar, Box, Flex, Heading, Text, VStack } from "@chakra-ui/react"

export default function Conversations() {
  return (
    <>
      <VStack
        alignItems="start"
        w="full"
        position="relative"
        h={{ base: "calc(100dvh - 8rem)", sm: "calc(100dvh - 8.7rem)" }}
        overflow="auto"
        py="2rem"
      >
        <ConversationItem />
        <ConversationItem />
        <ConversationItem isActive />
        <ConversationItem />
      </VStack>
    </>
  )
}

function ConversationItem({ isActive }: { isActive?: boolean }) {
  return (
    <>
      <Flex
        gap="1rem"
        minH={{ base: "6rem", sm: "8rem" }}
        pl={{ base: "1.5rem", md: "4rem" }}
        alignItems="center"
        w="full"
        bg={isActive ? "brand.10" : ""}
      >
        <Avatar
          w={{ base: "3rem", md: "5rem" }}
          h={{ base: "3rem", md: "5rem" }}
        />
        <Box>
          <Heading fontSize={{ base: "1.7rem", md: "2rem" }}>
            Exploit Enomah
            <Text
              as="span"
              fontWeight="normal"
              display="block"
              fontSize={{ base: "1.4rem", sm: "1.6rem" }}
              mt=".5rem"
            >
              Latest message text
            </Text>
          </Heading>
        </Box>
      </Flex>
    </>
  )
}

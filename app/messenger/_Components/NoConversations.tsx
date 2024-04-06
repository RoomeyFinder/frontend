import { Flex, Heading, Text } from "@chakra-ui/react";



export default function NoConversation(){

  return (
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
        No Conversations yet
      </Heading>
      <Text fontWeight="400" fontSize="1.4rem">
        Conversations you start will appear hear
      </Text>
    </Flex>
  )
}
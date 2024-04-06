import AppLogo from "@/app/_components/Logo";
import { Flex, Heading } from "@chakra-ui/react";



export default function InactiveConversationView(){
  return (
    <Flex
      h="full"
      justifyContent="center"
      alignItems="center"
      flexDir="column"
      gap="2rem"
      pb="12rem"
      overflow="hidden"
    >
      <AppLogo showTextLogoAlways />
      <Heading fontWeight="500" fontSize="2.4rem" color="#7070704D">
        Send and receive messages
      </Heading>
    </Flex>
  )
}
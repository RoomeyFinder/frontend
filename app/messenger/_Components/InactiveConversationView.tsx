import DisclaimerText from "@/app/_components/DisclaimerText"
import AppLogo from "@/app/_components/Logo"
import { Flex, Heading } from "@chakra-ui/react"

export default function InactiveConversationView() {
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
      <Heading fontWeight="500" fontSize="1.6rem" color="#707070">
        Send and receive messages
      </Heading>
      <DisclaimerText maxW="70ch" />
    </Flex>
  )
}

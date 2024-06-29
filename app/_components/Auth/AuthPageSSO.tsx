import { VStack, HStack } from "@chakra-ui/react";
import { DividerWithCenteredText } from "../PremiumModal";
import FacebookSSOButton from "./FacebookSSOButton";
import GoogleSSOButton from "./GoogleSSOButton";


export default function AuthPageSSO(){
  return (
    <VStack
      maxW="85.9rem"
      gap="2rem"
      mx="auto"
      alignItems="start"
      mb="6rem"
      w="87dvw"
    >
      <DividerWithCenteredText
        maxW="50rem"
        w="90dvw"
        mx="auto"
        text="Continue with"
      />
      <HStack
        w="full"
        rowGap="2rem"
        columnGap="2rem"
        alignItems="center"
        flexWrap="wrap"
        px="1rem"
        display={{ base: "flex", sm: "grid" }}
        gridTemplateColumns="repeat(2, 1fr)"
      >
        <GoogleSSOButton />
        <FacebookSSOButton />
      </HStack>
    </VStack>
  )
}
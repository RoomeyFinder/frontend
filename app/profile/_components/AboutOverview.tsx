import User from "@/app/_types/User";
import { Heading, Text, VStack } from "@chakra-ui/react";


export default function AboutOverview({ userData }:{
  userData: User
}) {
  return (
    <VStack alignItems="start">
      <Heading fontSize={{ base: "1.8rem", md: "2.2rem" }}>About me</Heading>
      <Text
        color="gray.main"
        fontSize={{ base: "1.5rem", md: "1.9rem" }}
        lineHeight={{ base: "2.8rem", md: "3.2rem" }}
      >
        <Text as="q">{userData.about}</Text>
      </Text>
    </VStack>
  )
}
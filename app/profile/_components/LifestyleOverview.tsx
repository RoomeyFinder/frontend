import User from "@/app/_types/User";
import { VStack, Heading, Flex } from "@chakra-ui/react";
import { LifestyleTag } from "./LifestyleInput";



export default function LifeStyleOverview({ userData }: {
  userData: User
}){
  return (
    <VStack alignItems="start">
      <Heading fontSize={{ base: "1.8rem", md: "2.2rem" }} mb=".8rem">
        Lifestyle
      </Heading>
      <Flex
        justifyContent="start"
        alignItems="start"
        gap="1rem"
        flexWrap="wrap"
      >
        {userData.lifestyleTags?.map((tag) => (
          <LifestyleTag key={tag.value} item={tag}></LifestyleTag>
        ))}
      </Flex>
    </VStack>
  )
}
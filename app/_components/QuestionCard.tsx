import { Flex, Heading, Text, VStack } from "@chakra-ui/react"
import { ReactNode } from "react"


export default function QuestionCard({ title, number, description }: {
  title: ReactNode | ReactNode[]
  number: ReactNode | ReactNode[]
  description: ReactNode | ReactNode[]
}) {
  return (
    <Flex
      gap="3rem"
      h={{ base: "25rem", md: "30rem" }}
      w="95dvw"
      maxW={{ base: "37.5rem", md: "45rem" }}
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      boxShadow="0px 4px 4px 0px #00000040"
      rounded="1.2rem"
      border="1px solid"
      borderColor="#7070704D"
    >
      <Text
        fontSize="5rem"
        fontWeight="bold"
        color="gray.main"
        border="5px solid currentColor"
        lineHeight="normal"
        w="7rem"
        h="7rem"
        textAlign="center"
        display="flex"
        justifyContent="center"
        alignItems="center"
        rounded="full"
      >
        {number}
      </Text>
      <VStack spacing="2rem">
        <Heading fontSize="2rem" fontWeight="600">
          {title}
        </Heading>
        <Text fontSize="1.6rem" lineHeight="2.4rem" color="gray.main">
          {description}
        </Text>
      </VStack>
    </Flex>
  )
}
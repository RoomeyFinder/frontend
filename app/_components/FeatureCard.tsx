import { Box, Flex, Heading, Text } from "@chakra-ui/react"
import { ReactNode } from "react"

export default function FeatureCard({
  iconChild,
  heading,
  body,
}: {
    iconChild: ReactNode;
    heading: string;
    body: string;
}) {
  return (
    <Flex
      as="li"
      gap="3rem"
      p={{ base: "2rem", md: "3rem" }}
      flexDir="column"
      alignItems="center"
      maxW="40rem"
      bg="#f5f9ffd5"
      boxShadow="0px 0px 1px 0px #00000066"
      rounded="1.2rem"
    >
      <Box>{iconChild}</Box>
      <Flex gap="2rem" flexDir="column" alignItems="center">
        <Heading as="h3" lineHeight="normal" fontSize="2rem" color="brand.main">
          {heading}
        </Heading>
        <Text
          textAlign="left"
          fontSize="1.6rem"
          lineHeight="2.4rem"
          color="gray.main"
        >
          {body}
        </Text>
      </Flex>
    </Flex>
  )
}

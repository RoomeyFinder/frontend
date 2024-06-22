import { Box, Flex, Text, VStack } from "@chakra-ui/react"
import NoResults from "../_assets/SVG/NoResults"
import { ReactNode } from "react"

export default function NoResultsDisplay({
  heading,
  body,
}: {
  heading: ReactNode
  body: ReactNode
}) {
  return (
    <>
      <VStack
        gap="1rem"
        minH="50dvh"
        w="full"
        alignItems="center"
        justifyContent="center"
      >
        <NoResults />
        <Flex
          alignItems="center"
          flexDir="column"
          gap="1rem"
          lineHeight="normal"
          color="black"
          textAlign="center"
        >
          <Text
            as="h2"
            fontSize={{ base: "2rem", md: "2.8rem" }}
            fontWeight="500"
          >
            {heading}
          </Text>
          <Box
            fontSize={{ base: "1.4rem", md: "1.8rem" }}
            _firstLetter={{ textTransform: "uppercase" }}
          >
            {body}
          </Box>
        </Flex>
      </VStack>
    </>
  )
}

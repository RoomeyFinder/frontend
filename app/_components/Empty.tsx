import { Flex, Text } from "@chakra-ui/react"
import NoFilesIcon from "../_assets/SVG/NoFilesIcon"
import { ReactNode } from "react"

export default function Empty({
  heading,
  text,
}: {
  heading?: ReactNode
  text?: ReactNode
}) {
  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      w="full"
      minH="70dvh"
      px="2rem"
    >
      <Flex gap="1rem" alignItems="center">
        <NoFilesIcon />
        <Flex
          alignItems="start"
          flexDir="column"
          gap="1rem"
          lineHeight="normal"
          color="gray.main"
          textAlign="left"
        >
          <Text fontSize={{ base: "3rem", lg: "5rem" }}>
            {heading || <>Empty</>}
          </Text>
          <Text fontSize={{ base: "1.4rem", sm: "1.8rem", md: "2.4rem" }}>
            {text}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  )
}

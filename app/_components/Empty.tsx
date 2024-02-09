import { Flex, Text } from "@chakra-ui/react"
import NoFilesIcon from "../_assets/NoFilesIcon"

export default function Empty({ text }: { text?: string }) {
  return (
    <Flex justifyContent="center" alignItems="center" w="full" minH="70dvh">
      <Flex alignItems="center" gap="1rem">
        <NoFilesIcon />
        <Text
          fontSize={{ base: "3rem", lg: "5rem" }}
          lineHeight="normal"
          color="gray.main"
          textAlign="center"
        >
          {text || <>Empty</>}
        </Text>
      </Flex>
    </Flex>
  )
}

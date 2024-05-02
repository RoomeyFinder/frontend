import { Flex, Text } from "@chakra-ui/react"
import NoFilesIcon from "../_assets/SVG/NoFilesIcon"
import { ReactNode } from "react"

export default function Empty({
  heading,
  text,
  icon,
}: {
  heading?: ReactNode
  text?: ReactNode
  icon?: ReactNode
}) {
  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      w="full"
      minH="70dvh"
      px="2rem"
    >
      <Flex gap="1rem" alignItems="start">
        {icon || <NoFilesIcon />}
        <Flex
          alignItems="start"
          flexDir="column"
          gap="1rem"
          lineHeight="normal"
          color="gray.main"
          textAlign="left"
        >
          <Text fontSize={{ base: "2.4rem", md: "3.6rem", lg: "5rem" }}>
            {heading || <>Empty</>}
          </Text>
          <Text fontSize={{ base: "1.4rem", sm: "1.6rem", md: "1.8rem" }}>
            {text}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  )
}

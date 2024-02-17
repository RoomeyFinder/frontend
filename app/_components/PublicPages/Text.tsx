import { Text } from "@chakra-ui/react"
import { ReactNode } from "react"

export default function PageText({
  children,
}: {
  children: ReactNode | ReactNode[]
}) {
  return (
    <Text
      fontSize={{ base: "1.3rem", sm: "1.6rem", md: "1.9rem" }}
      color="black"
      lineHeight="2.2rem"
      maxW="70rem"
    >
      {children}
    </Text>
  )
}

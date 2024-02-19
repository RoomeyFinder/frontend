import { As, FormLabel, Text } from "@chakra-ui/react"
import { ReactNode } from "react"

export default function InputLabel({ children, as }: { children: ReactNode, as?: As }) {
  return (
    <FormLabel flexGrow="1" m="0" as={as}>
      <Text
        lineHeight="normal"
        mb="1rem"
        fontWeight="600"
        fontSize={{ base: "1.6rem", md: "2rem" }}
      >
        {children}
      </Text>
    </FormLabel>
  )
}
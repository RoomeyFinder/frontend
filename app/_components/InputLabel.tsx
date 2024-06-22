import { As, BoxProps, FormLabel, Text } from "@chakra-ui/react"
import { ReactNode } from "react"

export default function InputLabel({
  children,
  as,
  ...rest
}: { children: ReactNode; as?: As } & BoxProps) {
  return (
    <FormLabel flexGrow="1" m="0" as={as}>
      <Text
        lineHeight="normal"
        mb="1rem"
        fontWeight="600"
        fontSize={{ base: "1.3rem", md: "2rem" }}
        {...rest}
      >
        {children}
      </Text>
    </FormLabel>
  )
}

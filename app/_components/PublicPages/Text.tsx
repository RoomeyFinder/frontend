import { Text, TextProps } from "@chakra-ui/react"
import { ReactNode } from "react"

export default function PageText({
  children,
  ...rest
}: {
  children: ReactNode | ReactNode[]
} & TextProps) {
  return (
    <Text
      fontSize={{ base: "1.3rem", sm: "1.6rem", md: "1.9rem" }}
      color="#222222"
      lineHeight="2.2rem"
      maxW="70rem"
      {...rest}
    >
      {children}
    </Text>
  )
}

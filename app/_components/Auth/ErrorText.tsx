import { Text, TextProps } from "@chakra-ui/react"
import { ReactNode } from "react"

export default function ErrorText({
  children,
  ...rest
}: {
  children: ReactNode | ReactNode[]
} & TextProps) {
  return (
    <Text color="red" mt=".5rem" {...rest}>
      {children}
    </Text>
  )
}

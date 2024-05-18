import { Text } from "@chakra-ui/react"
import { ReactNode } from "react"

export default function ErrorText({
  children,
}: {
  children: ReactNode | ReactNode[]
}) {
  return (
    <Text color="red" mt=".5rem">
      {children}
    </Text>
  )
}

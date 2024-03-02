import { Box, BoxProps } from "@chakra-ui/react"

export default function DotSeparator(props: BoxProps) {
  return (
    <Box
      as="span"
      w=".3rem"
      h=".3rem"
      backgroundColor="#333333"
      borderRadius="50%"
      {...props}
    />
  )
}

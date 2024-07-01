import { BoxProps, Flex, Text } from "@chakra-ui/react"
import { ReactNode } from "react"

export default function SSOButton({
  icon,
  text,
  onClick,
  ...rest
}: {
  icon: ReactNode | ReactNode[]
  text: ReactNode | ReactNode[]
  onClick: () => void
} & BoxProps) {
  return (
    <Flex
      as="button"
      gap="1.6rem"
      w="full"
      alignItems="center"
      justifyContent="center"
      fontSize="1.4rem"
      fontWeight="600"
      px="2.4rem"
      py="1.4rem"
      border="1px solid"
      rounded="1.2rem"
      _hover={{ bg: "white.100" }}
      onClick={onClick}
      {...rest}
    >
      <Text as="span" w="2rem" h="2rem" ml="0" textAlign="center">
        {icon}
      </Text>
      <Text as="span" textAlign="center">
        {text}
      </Text>
    </Flex>
  )
}

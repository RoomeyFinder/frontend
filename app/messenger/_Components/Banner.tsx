import FilterIcon from "@/app/_assets/SVG/FilterIcon"
import { SmallSearchIcon } from "@/app/_assets/SVG/SearchIcon"
import {
  Flex,
  Heading,
  Input,
  InputGroup,
  InputRightAddon,
  Text,
  VStack,
} from "@chakra-ui/react"

export default function Banner() {
  return (
    <VStack
      gap="1rem"
      alignItems="left"
      px={{ base: "1.5rem", md: "4rem" }}
      pt="3rem"
    >
      <Flex as={Heading} justifyContent="space-between">
        Messages
        <Text as="button" color="#707070" _hover={{ color: "brand.main" }}>
          <FilterIcon />
        </Text>
      </Flex>
      <InputGroup
        border="0"
        borderBottom="1px solid #D9D9D9"
        pb="1rem"
        _hover={{ bg: "transparent" }}
        p="0"
      >
        <Input px="0" py="0" rounded="0" border="0" />
        <InputRightAddon border="0" color="gray.main">
          <SmallSearchIcon />
        </InputRightAddon>
      </InputGroup>
    </VStack>
  )
}

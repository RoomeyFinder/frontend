import FilterIcon from "@/app/_assets/SVG/FilterIcon"
import { SmallSearchIcon } from "@/app/_assets/SVG/SearchIcon"
import CustomRadioGroup from "@/app/_components/CustomRadio"
import {
  Flex,
  Heading,
  Input,
  InputGroup,
  InputRightAddon,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Radio,
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
        <FilterButton />
      </Flex>
      <InputGroup
        border="0"
        borderBottom="1px solid #D9D9D9"
        pb="1rem"
    
        p="0"
      >
        <Input px="0" py="0" rounded="0" border="0" />
        <InputRightAddon border="0" color="gray.main"    _hover={{ bg: "transparent" }}>
          <SmallSearchIcon />
        </InputRightAddon>
      </InputGroup>
    </VStack>
  )
}

function FilterButton() {
  return (
    <Popover placement="bottom">
      <PopoverTrigger>
        <Text as="button" color="#707070" _hover={{ color: "brand.main" }}>
          <FilterIcon />
        </Text>
      </PopoverTrigger>
      <PopoverContent
        bg="white"
        border="0"
        outline="0"
        boxShadow="0px 0px 1px 0px #00000066"
        padding="2rem"
        rounded="1.2rem"
      >
        <PopoverBody border="0">
          <Heading fontSize="1.6rem" mb="2rem">Filter by</Heading>
          <Flex>
            <CustomRadioGroup
              options={["All", "Read", "Unread"]}
              onChange={() => {}}
              name={"filterBy"}
              selectedValue={"All"}
              containerProps={{
                flexDir: "column",
                alignItems: "start",
                gap: "2rem",
                fontSize: "1.4rem",
                fontWeight: "400"
              }}
            />
          </Flex>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}

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
  Text,
  VStack,
} from "@chakra-ui/react"
import { ChangeEventHandler } from "react"

export default function Banner({
  onChange,
  onSelectFilter,
  selectedFilter,
}: {
  onChange?: ChangeEventHandler<HTMLInputElement>
  onSelectFilter?: (val: string) => void
  selectedFilter?: string
}) {
  return (
    <VStack
      gap="1rem"
      alignItems="left"
      px={{ base: "1.5rem", md: "4rem" }}
      pt="3rem"
    >
      <Flex
        as={Heading}
        fontSize="2.6rem"
        fontWeight="500"
        justifyContent="space-between"
      >
        Chats
        <FilterButton
          value={selectedFilter}
          handleChange={onSelectFilter}
          options={["All", "Read", "Unread"]}
        />
      </Flex>
      <InputGroup border="0" borderBottom="1px solid #D9D9D9" pb="1rem" p="0">
        <Input px="0" py="0" rounded="0" border="0" onChange={onChange} />
        <InputRightAddon
          border="0"
          color="gray.main"
          _hover={{ bg: "transparent" }}
        >
          <SmallSearchIcon />
        </InputRightAddon>
      </InputGroup>
    </VStack>
  )
}

function FilterButton({
  handleChange,
  value,
  options = ["All", "Read", "Unread"],
}: {
  handleChange?: (val: string) => void
  value?: string
  options?: string[]
}) {
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
          <Heading fontSize="1.6rem" mb="2rem">
            Filter by
          </Heading>
          <Flex>
            <CustomRadioGroup
              options={options}
              onChange={(val) => {
                typeof handleChange === "function" && handleChange(val)
              }}
              name={"filterBy"}
              selectedValue={value || options[0]}
              containerProps={{
                flexDir: "column",
                alignItems: "start",
                gap: "2rem",
                fontSize: "1.4rem",
                fontWeight: "400",
              }}
            />
          </Flex>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}

import SearchIcon from "@/app/_assets/SVG/SearchIcon"
import TextCheckbox from "@/app/nexus/me/_components/TextCheckbox"
import {
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
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
      pt="2rem"
    >
      <Flex as={Heading} fontSize="2.6rem" fontWeight="500" mb="1.5rem">
        Chats
      </Flex>
      <InputGroup
        rounded="1.2rem"
        border="1px solid #D9D9D9"
        py=".6rem"
        px="1.2rem"
      >
        <InputLeftAddon
          border="0"
          color="gray.100"
          pl=".3rem"
          pr=".5rem"
          _hover={{ bg: "transparent" }}
        >
          <SearchIcon />
        </InputLeftAddon>
        <Input
          px="0"
          py="0"
          rounded="0"
          border="0"
          color="gray.main"
          placeholder="Search"
          onChange={onChange}
        />
      </InputGroup>
      <Flex gap=".8rem">
        {["All", "Read", "Unread"].map((opt) => (
          <TextCheckbox
            key={opt}
            name={opt}
            isSelected={selectedFilter === opt}
            onChange={() => onSelectFilter && onSelectFilter(opt)}
            value={opt}
            styleProps={{
              px: "1.2rem",
              py: ".6rem",
              fontSize: "1.4rem",
              rounded: ".6rem",
            }}
            inputType="radio"
          >
            {opt}
          </TextCheckbox>
        ))}
      </Flex>
    </VStack>
  )
}

import { VStack, List, ListItem } from "@chakra-ui/react"

export default function CustomDropDownList({
  list, handleItemClick
}: {
  list: string[]
  handleItemClick: (selection: string) => void
}) {
  return (
    <VStack as={List} spacing="1rem" p="1rem" fontSize="1.6rem" maxH="30rem" overflow="auto">
      {(list as string[]).map((opt: string) => (
        <ListItem _hover={{ bg: "brand.10" }} p="1rem" w="full" cursor="pointer" textTransform="capitalize" key={opt}
          onClick={() => handleItemClick(opt)}>
          {opt}
        </ListItem>))}
      {list.length === 0 && <ListItem p="1rem" textTransform="capitalize" >No matches found</ListItem>}
    </VStack>
  )
}
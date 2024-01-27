import { VStack, List, ListItem, Button, ButtonProps } from "@chakra-ui/react"
import { useCallback } from "react"

const itemProps = {
  _hover: { bg: "brand.10" },
  _focus: { bg: "brand.50" },
  bg: "transparent",
  w: "full",
  justifyContent: "start",
  h: "unset",
  p: "1rem",
  cursor: "pointer",
  textTransform: "capitalize",
}
export default function CustomDropDownList({
  list, handleItemClick,
  ItemComponent,
  ItemComponentProps
}: {
  list: never[]
  handleItemClick?: (selection: string) => void
  ItemComponent?: ({ option }: { option: never }) => JSX.Element
  ItemComponentProps?: { [x: string]: never }
}) {

  const renderItem = useCallback((option: string | { [x: string]: unknown }) => {
    if (ItemComponent) return <ItemComponent option={option as never} {...itemProps} {...(ItemComponentProps ? ItemComponentProps : {})} />
    else return (
      <Button onClick={() => handleItemClick && handleItemClick(option as string)} {...(itemProps as ButtonProps)}>
        {option as string}
      </Button>
    )
  }, [ItemComponent, ItemComponentProps, handleItemClick])

  return (
    <VStack as={List}
      _focusWithin={{ border: "1px solid", borderColor: "brand.main" }}
      spacing="1rem" p="1rem"
      fontSize="1.6rem"
      maxH="30rem"
      overflow="auto" 
      bg="white">
      {(list as string[]).map((opt: string | { [x: string]: unknown }, idx) => (
        <ListItem w="full" key={idx}>
          {renderItem(opt)}
        </ListItem>))}
      {list.length === 0 && <ListItem p="1rem" textTransform="capitalize" >No matches found</ListItem>}
    </VStack>
  )
}
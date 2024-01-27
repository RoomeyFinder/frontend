import lifestyleCategories from "@/app/_data/lifestyle.json"
import { Flex, Input, List, ListItem, Box, Text, CloseButton} from "@chakra-ui/react"
import { useCallback, useMemo, useRef } from "react"
import useFilterListByText from "../_hooks/useFilterStringListByText"
import useCategorizeListOfObjects from "../_hooks/useCategorizeListOfObjects"

export default function LifestyleInput({ selectedItems, handleSelectItem, handleRemoveItem }: {
  selectedItems: { value: string, category: string }[]
  handleSelectItem: (item: {value: string, category: string}) => void
  handleRemoveItem: (item: {value: string, category: string}) => void
}) {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const { text, updateText, filteredList } = useFilterListByText(lifestyleCategories)
  const lifestyleCategoriesFiltered = useMemo(() => filteredList.filter(it => !JSON.stringify(selectedItems).toLowerCase().includes((JSON.stringify(it).toLowerCase()))), [filteredList, selectedItems])
  const categorizedList = useCategorizeListOfObjects({ list: lifestyleCategoriesFiltered as Record<string|number|symbol, unknown>[], keyToCategorizeBy: "category"})
  
  const lifestylesList = useCallback(() => {
    return Object.keys(categorizedList).map((key) => (
      <LifestyleCategory 
        handleItemClick={(val) => {
          if(selectedItems.length >= 10) return 
          updateText("")
          inputRef.current?.focus()
          handleSelectItem(val)
        }}
        key={key} 
        name={key} 
        options={categorizedList[key as keyof typeof lifestyleCategories] as {category: string, value: string}[]} />
    ))
  }, [categorizedList, handleSelectItem, updateText, selectedItems.length])

  return (
    <>
      <Flex  maxW="51rem" position="relative" border="1px solid" borderColor="gray.100"px="1rem" pb="1rem" rounded="1.2rem" flexDir="column" maxH="22rem">
        <Flex pl="2rem" py="0" pt="1rem" pb=".5rem" borderBottom="1px solid" borderBottomColor="gray.100"flexWrap="wrap">
          {selectedItems.map((item) => 
            <Flex alignItems="center" gap=".4rem" fontSize="1.2rem" key={item.value}>
              <Text>{item.value} </Text>
              <Text as="button"><CloseButton onClick={() => handleRemoveItem(item)} /></Text>
            </Flex>
          )}
          <Input ref={inputRef} w="min-content" value={text} onChange={(e) => updateText(e.target.value)}
            bg="white" px="0" py="0"
            border="0" rounded="0"
            placeholder="Search" />
        </Flex>
        <Box mr="2rem" maxH="18rem" mt="1rem" overflow="auto" css={{
          "&::-webkit-scrollbar": {
            width: "3px",
            borderRadius: "2.4rem",
            boxShadow: "-1px 0px 0 0 #D9D9D9 inset"
          },
          "&::-webkit-scrollbar-thumb": {
            background: "#3A86FF",
            borderRadius: "2.4rem",
          },
        }}>
          {lifestylesList()}
        </Box>
      </Flex>
    </>
  )
}


function LifestyleCategory({ name, options, handleItemClick }: {
  name: string
  options: {category: string, value: string}[]
  handleItemClick: (selection: { category: string, value: string}) => void
}) {
  return (
    <List>
      <Text as={ListItem} mb=".5rem" ml=".9rem" lineHeight="normal" color="gray.main" fontSize={{ base: "1.3rem", md: "1.6rem" }} fontWeight="600">{name}</Text>
      {options.map(opt => (
        <ListItem _hover={{ color: "brand.main" }} cursor="pointer" onClick={() => handleItemClick(opt)} key={opt.value} py={{ base: "1rem", lg: "0" }} mb=".5rem" ml="2rem" color="gray.main" textTransform="capitalize" lineHeight="normal" fontSize={{ base: "1.2rem", md: "1.4rem" }}>
          {opt.value}
        </ListItem>
      ))}
    </List>
  )
}
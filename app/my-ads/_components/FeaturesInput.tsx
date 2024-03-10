import { adFeatures, icons } from "@/app/_data/adFeatures"
import {
  Flex,
  Input,
  List,
  ListItem,
  Box,
  Text,
  CloseButton,
  Heading,
  VStack,
  HStack,
} from "@chakra-ui/react"
import { useCallback, useMemo, useRef } from "react"
import useFilterListByText from "../../_hooks/useFilterStringListByText"
import useCategorizeListOfObjects from "../../_hooks/useCategorizeListOfObjects"

export default function FeatureInput({
  selectedItems,
  handleSelectItem,
  handleRemoveItem,
}: {
  selectedItems: { value: string; category: string }[]
  handleSelectItem: (item: { value: string; category: string }) => void
  handleRemoveItem: (item: { value: string; category: string }) => void
}) {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const { text, updateText, filteredList } = useFilterListByText(adFeatures)
  const adFeaturesFiltered = useMemo(
    () =>
      filteredList.filter(
        (it) =>
          !JSON.stringify(selectedItems)
            .toLowerCase()
            .includes(JSON.stringify(it).toLowerCase())
      ),
    [filteredList, selectedItems]
  )
  const categorizedList = useCategorizeListOfObjects({
    list: adFeaturesFiltered as Record<string | number | symbol, unknown>[],
    keyToCategorizeBy: "category",
  })

  const featuresList = useCallback(() => {
    return Object.keys(categorizedList).map((key, idx) => (
      <FeatureCategory
        handleItemClick={(val) => {
          updateText("")
          inputRef.current?.focus()
          handleSelectItem(val)
        }}
        key={idx}
        name={key}
        options={
          categorizedList[key as keyof typeof adFeatures] as {
            category: string
            value: string
          }[]
        }
      />
    ))
  }, [categorizedList, handleSelectItem, updateText])

  return (
    <>
      <Flex
        maxW={{ base: "90dvw", md: "51rem" }}
        w="full"
        position="relative"
        border="1px solid"
        borderColor="gray.100"
        px="1rem"
        pb="1rem"
        rounded="1.2rem"
        flexDir="column"
        h="45.2rem"
      >
        {selectedItems.length > 0 && (
          <HStack
            overflowX="auto"
            maxWidth="100%"
            flexGrow="0"
            px="1rem"
            flexWrap="nowrap"
            gap="1rem"
            minH="8rem"
          >
            {selectedItems.map((item, idx) => (
              <FeatureTag
                key={idx}
                item={item}
                editable={true}
                handleRemoveItem={handleRemoveItem}
              />
            ))}
          </HStack>
        )}
        <Heading
          ml=".5rem"
          py=".3rem"
          my="1rem"
          fontWeight="bold"
          as="h5"
          fontSize="1.6rem"
        >
          Select Features
        </Heading>

        <Input
          ref={inputRef}
          w="full"
          value={text}
          onChange={(e) => updateText(e.target.value)}
          bg="white"
          py="0"
          border="0"
          rounded="0"
          placeholder="Search"
          borderBottom="1px solid"
          borderBottomColor="gray.100"
          px="1.2rem"
        />
        <Box
          mr="2rem"
          mt="1rem"
          overflow="auto"
          css={{
            "&::-webkit-scrollbar": {
              width: "3px",
              borderRadius: "2.4rem",
              boxShadow: "-1px 0px 0 0 #D9D9D9 inset",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "#3A86FF",
              borderRadius: "2.4rem",
            },
          }}
        >
          <VStack alignItems="start" gap="2rem" p="1rem">
            {featuresList()}
          </VStack>
        </Box>
      </Flex>
    </>
  )
}

function FeatureCategory({
  name,
  options,
  handleItemClick,
}: {
  name: string
  options: { category: string; value: string }[]
  handleItemClick: (selection: { category: string; value: string }) => void
}) {
  return (
    <List>
      <Text
        as={ListItem}
        mb="1rem"
        ml=".9rem"
        lineHeight="normal"
        color="gray.main"
        fontSize={{ base: "1.3rem", md: "1.6rem" }}
        fontWeight="600"
      >
        {name}
      </Text>
      <List display="flex" flexWrap="wrap" gap="1rem">
        {options.map((opt, idx) => (
          <ListItem
            _hover={{ color: "brand.main" }}
            cursor="pointer"
            onClick={() => handleItemClick(opt)}
            key={idx}
            p="0"
            m="0"
            color="gray.main"
            textTransform="capitalize"
            lineHeight="normal"
            fontSize={{ base: "1.2rem", md: "1.4rem" }}
            display="inline-flex"
          >
            <FeatureTag item={opt} />
          </ListItem>
        ))}
      </List>
    </List>
  )
}

export function FeatureTag({
  handleRemoveItem,
  item,
  editable = false,
  bg,
  padding,
  rounded
}: {
  item: {
    category: string
    value: string
  }
  editable?: boolean
  handleRemoveItem?: (item: { category: string; value: string }) => void
  bg?: string
  padding?: string
  rounded?: string
}) {
  return (
    <Flex
      gap="1rem"
      p={padding || "2rem"}
      alignItems="center"
      boxShadow={editable ? "" : "0px 0px 1px 0px #00000066"}
      borderColor="gray.100"
      rounded={rounded || "1.2rem"}
      bg={editable ? "brand.10" : bg || "transparent"}
    >
      <Text> {icons[item.value as keyof typeof icons]}</Text>
      <Text
        whiteSpace="nowrap"
        fontSize="1.2rem"
        lineHeight="1.2rem"
        color={editable ? "black" : "gray.main"}
      >
        {item.value}
      </Text>
      {editable && (
        <Text as="span" w="min-content">
          <CloseButton
            onClick={() =>
              typeof handleRemoveItem === "function" && handleRemoveItem(item)
            }
          />
        </Text>
      )}
    </Flex>
  )
}

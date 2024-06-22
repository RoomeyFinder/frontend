import { GridItem, SimpleGrid, SimpleGridProps } from "@chakra-ui/react"
import { ReactNode } from "react"

export default function ListingsGridLayout({
  list,
  justifyContent = "center",
  alignItems = "center",
  alignContent = "center",
  columns = { base: 1, sm: 2, lg: 3 },
  ...rest
}: { list: ReactNode[] } & SimpleGridProps) {
  return (
    <SimpleGrid
      w="full"
      maxW="180rem"
      mx="auto"
      as="ul"
      columnGap={{ base: "1rem", sm: "1.5rem", md: "2rem" }}
      rowGap={{ base: "3rem", md: "5rem" }}
      justifyContent={justifyContent}
      alignContent={alignContent}
      alignItems={alignItems}
      columns={columns}
      {...rest}
    >
      {list.map((item, idx) => (
        <GridItem
          justifyContent={justifyContent}
          key={idx}
        >
          {item}
        </GridItem>
      ))}
    </SimpleGrid>
  )
}

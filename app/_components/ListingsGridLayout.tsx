import { Grid, GridItem, GridProps } from "@chakra-ui/react"
import { ReactNode } from "react"

export default function ListingsGridLayout({
  list,
  justifyContent = "center",
  alignItems = "center",
  alignContent = "center",
  templateColumns = {
    base: "repeat(1, 1fr)",
    sm: "repeat(2, 1fr)",
    md: "repeat(3, 1fr)",
    lg: "repeat(4, 1fr)",
    xl: "repeat(5, 1fr)",
  },
  ...rest
}: { list: ReactNode[] } & GridProps) {
  return (
    <Grid
      w="full"
      maxW="180rem"
      mx="auto"
      as="ul"
      columnGap={{ base: "1rem", sm: "1.5rem", md: "2rem" }}
      rowGap={{ base: "3rem", md: "5rem" }}
      justifyContent={justifyContent}
      alignContent={alignContent}
      alignItems={alignItems}
      templateColumns={templateColumns}
      {...rest}
    >
      {list.map((item, idx) => (
        <GridItem
          display="flex"
          w="full"
          justifyContent={justifyContent}
          key={idx}
        >
          {item}
        </GridItem>
      ))}
    </Grid>
  )
}

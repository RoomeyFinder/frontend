import { Grid, GridItem } from "@chakra-ui/react";
import { ReactNode } from "react";



export default function ListingsGridLayout({ list }: {
  list: ReactNode[]
}){

  return (
    <Grid
      w="93%"
      maxW="180rem"
      mx="auto"
      as="ul"
      columnGap={{ base: "1rem", sm: "1.5rem", md: "2rem" }}
      rowGap={{ base: "3rem", md: "5rem" }}
      templateColumns={{
        base: "repeat(1, 1fr)",
        sm: "repeat(2, 1fr)",
        md: "repeat(3, 1fr)",
        lg: "repeat(4, 1fr)",
        "xl": "repeat(5, 1fr)",
      }}
      justifyContent="center"
      alignItems="center"
      alignContent="center"
    >
      {list.map((item, idx) => (
        <GridItem display="flex" justifyContent="center" key={idx}>
          {item}
        </GridItem>
      ))}
    </Grid>
  )
}
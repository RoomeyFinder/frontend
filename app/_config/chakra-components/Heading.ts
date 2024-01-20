import { defineStyleConfig } from "@chakra-ui/react"

const Heading = defineStyleConfig({
  baseStyle: {
    color: "black",
    fontSize: "2.4rem !important",
    fontStyle: "normal",
    fontWeight: 700,
    lineHeight: "normal",
  },
  variants: {
    "medium": {
      fontSize: "3.2rem",
      fontWeight: "600"
    },
    "bold": {
      fontWeight: "700"
    },
  },
  sizes: {
    base: {
      fontSize: "2.4rem",
    },
    md: {
      fontSize: "3.2rem"
    },
    xl: {
      fontSize: "7.2rem"
    }
  },
  defaultProps: {
    colorScheme: "brand",
    size: "base",
    variant: "bold",
  },
})

export default Heading
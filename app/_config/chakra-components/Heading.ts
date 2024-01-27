import { defineStyleConfig } from "@chakra-ui/react"

const Heading = defineStyleConfig({
  baseStyle: {
    color: "black",
    fontSize: "2.4rem",
    fontStyle: "normal",
    lineHeight: "normal",
  },
  variants: {
    100: {
      fontWeight: 100,
    },
    200: {
      fontWeight: 100,
    },
    300: {
      fontWeight: 100,
    },
    400: {
      fontWeight: 100,
    },
    500: {
      fontWeight: 100,
    },
    600: {
      fontWeight: 600,
    },
    700: {
      fontWeight: 700,
    },
    800: {
      fontWeight: 800,
    },
    900: {
      fontWeight: 800,
    },
  },
  sizes: {
    base: {
      fontSize: {
        base: "1.8rem",
        md: "2.4rem"
      },
      lineHeight: "normal"
    },
    md: { 
      fontSize: { 
        base: "2.6rem",
        md: "3.2rem"
      },
      lineHeight: "normal"
    },
    large: {
      fontSize: {
        base: "3.2rem",
        md: "5rem"
      },
      lineHeight: "normal"
    },
    xl: {
      fontSize: {
        base: "4.5rem",
        md: "7.2rem"
      },
      lineHeight: "normal"
    },
  },
  defaultProps: {
    colorScheme: "brand",
    size: "base",
    variant: 700,
  },
})

export default Heading
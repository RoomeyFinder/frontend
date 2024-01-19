
import { defineStyleConfig, extendTheme } from "@chakra-ui/react"
import * as components from "./chakra-components"
import * as customComponents from "./custom-chakra-components"
import { inputAnatomy } from "@chakra-ui/anatomy"
import { createMultiStyleConfigHelpers } from "@chakra-ui/react"

const colors = {
  white: {
    main: "#FFFFFF",
    100: "#F1F1F1",
    200: "#F4F4F4",
    300: "#F8F8F8",
    400: "#F9F9F9",
    500: "#EEEEEE",
    600: "#E5E5E5",

  },
  brand: {
    main: "#3A86FF",
    500: "#3A86FF",
    10: "#3A86FF1A",
    25: "#3A86FF40",
    50: "#3A86FF80",
    100: "#5DB8EA",
  },
  green: {
    main: "#009A49",
    50: "#49C3A733",
    100: "#49C3A7",
  },
  red: {
    main: "#FE251B",
    50: "#FF00004D"
  },
  gray: {
    main: "#707070",
    100: "#A1A1A1",
    200: "#D9D9D9",
    300: "#5C5F62"
  }
}

const fonts = {
  body: "Proxima Nova, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Helvetica, Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\"",
  heading: "Proxima Nova, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Helvetica, Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\"",
}

const fontSizes = {
  xs: "0.75rem",
  sm: "0.875rem",
  md: "1rem",
  lg: "1.125rem",
  xl: "1.25rem",
  "2xl": "1.5rem",
  "3xl": "1.875rem",
  "4xl": "2.25rem",
  "5xl": "3rem",
  "6xl": "3.75rem",
  "7xl": "4.5rem",
  "8xl": "6rem",
  "9xl": "8rem",
}

const breakpoints = {
  base: "0em",
  sm: "40em",
  md: "62em",
  lg: "74em",
  xl: "86em",
  "2xl": "104em",
}

const headingTheme = defineStyleConfig({
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



const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(inputAnatomy.keys)

const baseStyle = definePartsStyle({
  field: {
    borderRadius: "1.2rem",
    border: "1px solid",
    fontSize: "1.6rem",
    lineHeight: "150%",
    color: "black",
    height: "unset",
    backgroundColor: "transparent",
    _placeholder: {
      color: "gray.100"
    },
  },
})

const filledInput = definePartsStyle({
  field: {
    bg: "white.300",
    border: "1px solid",
    borderColor: "gray.100",
    py: { base: "1.4rem", md: "2rem" },
    px: { base: "2rem", md: "2.7rem" },
    _hover: {
      background: "white.500"
    },
    _placeholder: {
      fontSize: "1.6rem",
      lineHeight: "150%"
    }
  },
})

export const inputTheme = defineMultiStyleConfig({ 
  baseStyle, 
  variants: {
    filled: filledInput
  }
})

const theme = extendTheme({ 
  colors, 
  fonts,
  fontSizes,
  breakpoints,
  components: {
    Heading: headingTheme,
    Input: inputTheme,
    ...components,
    ...customComponents
  }
})

export default theme
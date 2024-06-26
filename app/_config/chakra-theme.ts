
import { extendTheme } from "@chakra-ui/react"
import Button from "./chakra-components/Button"
import * as customComponents from "./custom-chakra-components"
import Input from "./chakra-components/Input"
import Heading from "./chakra-components/Heading"
import Switch from "./chakra-components/Switch"

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
    50: "#FF00004D",
  },
  gray: {
    main: "#707070",
    100: "#A1A1A1",
    200: "#D9D9D9",
    300: "#5C5F62",
  },
  black: {
    500: "#222222",
  },
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
  xl: "100em",
  "2xl": "120em",
}

const theme = extendTheme({ 
  colors, 
  fonts,
  fontSizes,
  breakpoints,
  components: {
    Heading,
    Input,
    Switch,
    Button,
    ...customComponents
  }
})

export default theme
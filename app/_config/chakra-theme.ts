
import { extendTheme } from '@chakra-ui/react'

const colors = {
  white: {
    main: "#FFFFFF",
    100: "#F1F1F1",
    200: "#F4F4F4",
    300: "#F9F9F9",
    400: "#EEEEEE",
    500: "#E5E5E5",

  },
  brand: {
    main: '#3A86FF',
    10: "#3A86FF1A",
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
  body: `Proxima Nova, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`,
  heading: `Proxima Nova, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`,
}

const theme = extendTheme({ colors, fonts, })

export default theme
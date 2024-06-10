import { switchAnatomy } from "@chakra-ui/anatomy"
import { createMultiStyleConfigHelpers } from "@chakra-ui/react"

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(switchAnatomy.keys)

const baseStyle = definePartsStyle({
  container: {
    // ...
  },
  thumb: {
    p: ".8rem",
    bg: "#dddddd8f",
    _checked: {
      bg: "brand.main",
    },
  },
  track: {
    p: ".5rem",
    bg: "brand.10",
    _checked: {
      bg: "brand.10",
    },
    _focusVisible: {
      boxShadow:"none"
    }
  },
})

const Switch = defineMultiStyleConfig({ baseStyle })

export default Switch

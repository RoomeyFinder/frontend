import { switchAnatomy } from "@chakra-ui/anatomy"
import { createMultiStyleConfigHelpers } from "@chakra-ui/react"

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(switchAnatomy.keys)

const baseStyle = definePartsStyle({
  container: {
    // ...
  },
  thumb: {
    bg: "#D9D9D9",
    _checked: {
      bg: "brand.main",
    },
  },
  track: {
    bg: "brand.10",
  },
})

const Switch = defineMultiStyleConfig({ baseStyle })

export default Switch

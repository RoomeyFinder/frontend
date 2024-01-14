import { defineStyleConfig } from "@chakra-ui/react";

export const StandAloneIcon = defineStyleConfig({
  baseStyle: {
    color: "black",
    _hover: {
      color: "brand.main"
    },
    boxShadow: "none"
  },
  variants: {
  },
  defaultProps: {
  },
})
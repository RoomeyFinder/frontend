import { defineStyleConfig } from "@chakra-ui/react"

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

export const BrandButton = defineStyleConfig({
  baseStyle: {
    display: "flex",
    padding: "0px 22px",
    justifyContent: "center",
    alignItems: "center",
    gap: "1rem",
    background: "brand.main",
    textAlign: "center",
    px: "2.2rem",
    py: "1.045rem",
    h: "unset",
    color: "white.main",
    fontWeight: "600",
    _hover: {
      filter: "brightness(115%)",
      textDecor: "none"
    },
  },
  variants: {
    "sm": {
      fontSize: "1.6rem",
      borderRadius: "1rem"
    },
    "rounded-md": {
      fontSize: "1.9rem",
      borderRadius: "1.2rem"
    },
  }
})

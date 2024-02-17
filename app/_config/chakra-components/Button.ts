import { defineStyleConfig } from "@chakra-ui/react"
const Button = defineStyleConfig({
  baseStyle: {
    fontWeight: "600",
    borderRadius: "1rem",
    cursor: "pointer",
    textAlign: "center",
    h: "auto",
  },
  sizes: {
    sm: {
      fontSize: "1.6rem",
    },
    md: {
      fontSize: "1.9rem",
    },
  },
  variants: {
    filled: {
      color: "white.main",
      background: "brand.main",
    },
    main: {
      background: "white",
      border: "1px solid black",
      color: "black",
      py: "1.7rem",
      w: "full",
      maxW: "18.5rem",
      textAlign: "center",
      h: "auto",
      _hover: {
        background: "brand.main",
        color: "white.main",
        borderColor: "brand.main",
      },
    },
    brand: {
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
      _hover: {
        filter: "brightness(115%)",
        textDecor: "none",
      },
    },
    "brand-secondary": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "1rem",
      background: "brand.10",
      textAlign: "center",
      px: "2rem",
      py: "1.55rem",
      color: "brand.main",
      textTransform: "capitalize",
      height: "auto",
      _hover: {
        textDecor: "none",
        background: "brand.main",
        color: "white.main",
        _disabled: {
          background: "brand.50",
        },
      },
      _focus: {
        textDecor: "none",
        background: "brand.main",
        color: "white.main",
      },
      _disabled: {
        textDecor: "none",
        background: "brand.50",
        color: "white.main",
      },
    },
  },
  defaultProps: {
    size: "sm",
  },
})

export default Button
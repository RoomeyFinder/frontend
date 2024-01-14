import { defineStyleConfig } from '@chakra-ui/react'

export const Button = defineStyleConfig({
  baseStyle: {
    fontWeight: '600',
    borderRadius: '1rem',
    cursor: "pointer"
  },
  sizes: {
    sm: {
      fontSize: '1.6rem',
    },
    md: {
      fontSize: '1.9rem',
    },
  },
  variants: {
    filled: {
      color: 'white.main',
      background: "brand.main",
    },
  },
  defaultProps: {
    size: 'sm',
  },
})

export const Link = defineStyleConfig({
 
})
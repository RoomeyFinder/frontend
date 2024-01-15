import { BoxProps, ChakraComponent, Flex, SystemStyleObject, chakra, Box } from "@chakra-ui/react"
import { supportLinks } from "./data"
import { useRouter } from "next/navigation"


export const baseNavItemStyles = {
  bg: "transparent",
  width: "100%",
  p: "1.3rem",
  color: "gray.main",
  fontSize: { base: "1.4rem", md: "1.6rem" },
  display: "flex",
  alignItems: "center",
  gap: "1rem",
  justifyContent: "start",
  transition: "all 250ms ease",
  _hover: {
    textDecor: "none",
    bg: "brand.10",
    color: "brand.main",
    fontWeight: "600"
  },
  _active: {
    bg: "brand.25"
  },
  _focus: {
    borderColor: "brand.50",
    bg: "brand.25"
  }
}

function getSupportMenuElement (chakraComponent: ChakraComponent<never, BoxProps>, styles: SystemStyleObject) {
  return chakra(chakraComponent, {
    baseStyle: {
      ...baseNavItemStyles,
      border: "1px solid rgba(112, 112, 112, 0.25)",
      borderRadius: "1rem",
      w: "100%",
      mx: "auto",
      textAlign: "left",
      alignItems: "center",
      justifyContent: "start",
      ...styles
    }
  })
}

export default function SupportNav({ navItemComponent, navItemStyles }: {
  navItemComponent: ChakraComponent<never, BoxProps>,
  navItemStyles?: SystemStyleObject
}) {
  const router = useRouter()
  const SupportMenuComponent = getSupportMenuElement(navItemComponent, navItemStyles || {}) as ChakraComponent<typeof Box, BoxProps>
  return (
    <>
      <Flex flexDir="column" gap="2rem" pb="2rem">
        {
          supportLinks.map((link) => (
            <SupportMenuComponent key={link.name} onClick={() => router.push(link.href)}>
              {link.name}
            </SupportMenuComponent>
          ))
        }
      </Flex>
    </>
  )
}

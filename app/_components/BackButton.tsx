import { BoxProps, Flex, Text } from "@chakra-ui/react"
import { usePathname, useRouter } from "next/navigation"
import BackIcon from "../_assets/SVG/BackIcon"

export default function BackButton(props: BoxProps) {
  const router = useRouter()
  const pathname = usePathname()
  return (
    <Flex
      as="button"
      pos="fixed"
      bg="white"
      top="10rem"
      zIndex="300"
      shadow="lg"
      rounded="lg"
      left={{ base: "3%", xl: "15%" }}
      px="2rem"
      py="1rem"
      dropShadow="-1px 3px 39px #00000059"
      opacity=".7"
      _hover={{
        opacity: 1,
      }}
      {...props}
      onClick={() => {
        const prevPath = localStorage.getItem("prevPath")
        if (prevPath) router.back()
        else {
          localStorage.setItem("prevPath", pathname)
          router.replace("/")
        }
      }}
      fontSize="1.6rem"
      fontWeight="500"
      alignItems="center"
      justifyContent="center"
      gap="1.4rem"
    >
      <BackIcon /> <Text as="span">Back</Text>
    </Flex>
  )
}

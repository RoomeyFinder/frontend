import { Box, Flex } from "@chakra-ui/react"
import { ReactNode } from "react"

export default function Hero({
  children,
  bgImagePath,
}: {
  children: ReactNode | ReactNode[]
  bgImagePath: string
}) {
  return (
    <>
      <Flex
        minH={{ base: "55dvh", lg: "60rem" }}
        bgColor="#f5f9ff"
        pt={{ base: "6rem", md: "10rem" }}
        pb={{ base: "8rem", md: "14.6rem" }}
        alignItems={{ base: "center", lg: "start" }}
        justifyContent="center"
      >
        <Flex pos="relative" flexGrow="1">
          <Box
            pos="absolute"
            h={{ lg: "120%" }}
            left="0"
            right="0"
            top="-10%"
            bottom="0"
            bgColor="white"
            bgImage={`url(${bgImagePath})`}
            bgPos="top right"
            bgSize="cover"
            mx="auto"
            bgRepeat="no-repeat"
            zIndex="1"
            opacity={{ base: ".2", md: "1" }}
          />
          <Flex
            minH={{ lg: "45dvh" }}
            zIndex="2"
            pos="relative"
            mx="auto"
            textAlign="left"
            as="main"
            w={{ base: "95dvw", md: "79%" }}
            backdropFilter={{ base: "blur(.3rem)", md: "unset"}}
          >
            <Box maxW="70rem" w="full">
              {children}
            </Box>
          </Flex>
        </Flex>
      </Flex>
    </>
  )
}

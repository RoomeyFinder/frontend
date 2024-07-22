"use client"
import { Box, Flex, keyframes, Text } from "@chakra-ui/react"

// Define keyframes for animations
const pendulum1 = keyframes`
  0% {
    transform: rotate(-45deg) translateX(0);
  }
  100% {
    transform: rotate(45deg) translateX(10px);
  }
`

const pendulum2 = keyframes`
  0% {
    transform: rotate(45deg) translateX(0);
  }
  100% {
    transform: rotate(-45deg) translateX(-10px);
  }
`

const PageLoader = () => {
  return (
    <Flex
      height="100dvh"
      width="100dvw"
      alignItems="center"
      justifyContent="center"
      position="relative"
      flexDir="column-reverse"
      gap="3rem"
    >
      <Text fontSize="2rem" fontWeight="500">
        RoomeyFinder
      </Text>
      <Flex
        alignItems="center"
        justifyContent="center"
        width="full"
        height="auto"
      >
        <Box
          className="pendulum-one"
          height="4.5rem"
          width="1rem"
          bg="#3a86ff"
          borderTopRadius="5px"
          transformOrigin="top"
          position="relative"
          animation={`${pendulum1} 650ms ease-in-out infinite alternate-reverse`}
        >
          <Box
            height="1px"
            width="100%"
            bg="white"
            position="absolute"
            top="18px"
          ></Box>
          <Box
            height="3.5rem"
            width="3.5rem"
            border="2px solid"
            borderColor="#3a86ff"
            borderRadius="50%"
            position="absolute"
            top="98%"
            left="50%"
            transform="translateX(-50%)"
            _before={{
              content: "''",
              position: "absolute",
              top: "50%",
              left: "40%",
              width: "1.5rem",
              height: "1rem",
              bg: "transparent",
              boxShadow: "inset 0px -2px 3px .5px #3a86ff",
              borderRadius: "50%",
              opacity: "0.6",
              transform: "translateX(-50%) rotate(25deg)",
            }}
          ></Box>
        </Box>
        <Box
          height="4.5rem"
          width="1rem"
          bg="#3a86ff"
          borderTopRadius="5px"
          transformOrigin="top"
          position="relative"
          animation={`${pendulum2} 650ms ease-in-out infinite alternate-reverse`}
        >
          <Box
            height="1px"
            width="100%"
            bg="white"
            position="absolute"
            top="18px"
            className="pendulum-marker"
          ></Box>
          <Box
            height="3.5rem"
            width="3.5rem"
            border="2px solid"
            borderColor="#3a86ff"
            borderRadius="50%"
            position="absolute"
            top="98%"
            left="50%"
            transform="translateX(-50%)"
            _before={{
              content: "''",
              position: "absolute",
              top: "50%",
              left: "40%",
              width: "1.5rem",
              height: "1rem",
              bg: "transparent",
              boxShadow: "inset 0px -2px 3px .5px #3a86ff",
              borderRadius: "50%",
              opacity: "0.6",
              transform: "translateX(-50%) rotate(45deg)",
            }}
          ></Box>
        </Box>
      </Flex>
    </Flex>
  )
}

export default PageLoader

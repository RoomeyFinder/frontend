import PadlockDivider from "@/app/_assets/SVG/PadlockDivider"
import {
  Flex,
  Text,
  Heading,
  keyframes,
  Box,
  Avatar,
  VStack,
} from "@chakra-ui/react"
import ProfileAvatar from "../ProfileAvatar"
import FavouriteIcon from "@/app/_assets/SVG/Favourite"
import DotSeparator from "../DotSeparator"

export function RoomeyListingCardSkeleton({
  hasBorder = false,
}: {
  hasBorder?: boolean
}) {
  const pulse = keyframes`  
0% {opacity: .4;}   
50% {opacity: .8} 
100% {opacity: .4} 
`
  return (
    <Flex
      minH="28rem"
      maxW={{ base: "95dvw", sm: "28.3rem" }}
      animation={`${pulse} infinite 2s linear`}
      py="2rem"
      w="100%"
      alignItems="center"
      flexDir="column"
      gap="1.5rem"
      pos="relative"
      border={hasBorder ? "1px solid #7070704D" : ""}
      borderRadius="1.2rem"
      background="transparent"
      cursor="pointer"
      h="full"
      _hover={{ background: "white", shadow: "md", textDecor: "underline" }}
    >
      <Box pos="absolute" right="2.4rem">
        <FavouriteIcon isFilled={true} />
      </Box>
      <ProfileAvatar width={100} height={100} />
      <VStack gap="1rem" alignItems="center">
        <Text width="5rem" bgColor="gray.100" h=".6rem" opacity=".3"></Text>
        <Flex alignItems="center" gap="1rem">
          <Text
            width="5rem"
            height=".4rem"
            bgColor="gray.100"
            opacity=".3"
          ></Text>
          <DotSeparator />
          <Text width="5rem" bgColor="gray.100" h=".4rem" opacity=".3"></Text>
        </Flex>
      </VStack>
      <PadlockDivider />
      <Flex flexDir="column" textAlign="center" gap="1rem" w="full">
        <Text
          maxW="24rem"
          bgColor="gray.main"
          w="full"
          h=".7rem"
          opacity=".1"
          mx="auto"
        ></Text>
        <Text
          h="1.7rem"
          maxW="24rem"
          whiteSpace="wrap"
          mx="auto"
          bgColor="gray.main"
          w="full"
          opacity=".1"
        ></Text>
        <Text
          h="1.7rem"
          maxW="24rem"
          whiteSpace="wrap"
          mx="auto"
          bgColor="gray.main"
          w="full"
          opacity=".1"
        ></Text>
      </Flex>
    </Flex>
  )
}

export function RoomListingCardSkeleton({
  hasBorder,
}: {
  hasBorder?: boolean
}) {
  const pulse = keyframes`  
    0% {opacity: .4;}   
    50% {opacity: .8} 
    100% {opacity: .4} 
  `
  return (
    <Flex
      w="100%"
      padding={hasBorder === true ? "1rem" : "0"}
      alignItems="start"
      flexDir="column"
      gap=".5rem"
      pos="relative"
      border={hasBorder === true ? "1px solid #7070704D" : ""}
      borderRadius="1.2rem"
      background="transparent"
      cursor="pointer"
      animation={`${pulse} infinite 2s linear`}
    >
      <Box pos="absolute" right="2.4rem" top="2.4rem">
        <FavouriteIcon />
      </Box>
      <Box
        w="full"
        pos="relative"
        minH="27.7rem"
        bg="gray.main"
        opacity=".1"
        rounded="1rem"
      ></Box>
      <Flex gap=".8rem" alignItems="center">
        <Avatar w={35} h={35} src={""} name="" />
        <VStack alignItems="start" gap=".4rem">
          <Box h=".8rem" w="8rem" bg="gray.100" opacity=".2" />
        </VStack>
      </Flex>
      <Flex flexDir="column" gap="1rem" w="full" mt="1rem">
        <Heading height="1rem" bgColor="black" w="80%" opacity=".08"></Heading>
        <Flex
          height=".8rem"
          gap="1rem"
          w="full"
          pos="relative"
          alignItems="center"
        >
          <Box bgColor="gray.main" opacity=".1" h=".6rem" w="30%"></Box>
          <DotSeparator backgroundColor="gray.main" w=".6rem" h=".6rem" />
          <Box bgColor="gray.main" opacity=".1" h=".6rem" w="30%"></Box>
        </Flex>
        <Flex flexDir="column" textAlign="center" gap=".5rem" w="full">
          <Text bgColor="black" w="60%" h=".7rem" opacity=".1"></Text>
        </Flex>
      </Flex>
    </Flex>
  )
}

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
      py="2rem"
      w="95dvw"
      minH="38rem"
      maxW={{ base: "95dvw", sm: "28.3rem" }}
      alignItems="center"
      flexDir="column"
      gap="1.5rem"
      pos="relative"
      border={hasBorder ? "1px solid #7070704D" : ""}
      borderRadius="1.2rem"
      background="transparent"
      cursor="pointer"
      animation={`${pulse} infinite 2s linear`}
    >
      <Box pos="absolute" right="2.4rem">
        <FavouriteIcon isFilled={true} />
      </Box>
      <ProfileAvatar width={180} height={180} showVerifiedBadge />
      <Flex gap="1rem" alignItems="center">
        <Heading width="5rem" height=".4rem" bgColor="gray.100"></Heading>
        <DotSeparator />
        <Text width="3rem" height=".4rem" bgColor="gray.100"></Text>
      </Flex>
      <PadlockDivider />
      <Flex flexDir="column" textAlign="center" gap=".5rem" w="full">
        <Text bgColor="gray.main" w="full" h=".7rem" opacity=".1"></Text>
        <Text bgColor="gray.main" w="full" h=".7rem" opacity=".1"></Text>
        <Text bgColor="gray.main" w="full" h=".7rem" opacity=".1"></Text>
        <Text bgColor="gray.main" w="full" h=".7rem" opacity=".1"></Text>
        <Text bgColor="gray.main" w="full" h=".7rem" opacity=".1"></Text>
      </Flex>
    </Flex>
  )
}

export function RoomListingCardSkeleton() {
  const pulse = keyframes`  
    0% {opacity: .4;}   
    50% {opacity: .8} 
    100% {opacity: .4} 
  `
  return (
    <Flex
      w="95dvw"
      minH="38rem"
      maxW={{ base: "32rem", sm: "28.3rem" }}
      alignItems="start"
      flexDir="column"
      gap=".5rem"
      pos="relative"
      borderRadius="1.2rem"
      overflow="hidden"
      background="transparent"
      cursor="pointer"
      _hover={{ background: "white" }}
      animation={`${pulse} infinite 2s linear`}
    >
      <Box pos="absolute" right="2.4rem" top="2.4rem">
        <FavouriteIcon isFilled={true} />
      </Box>
      <Box
        w="full"
        pos="relative"
        minH="27.7rem"
        bg="gray.main"
        opacity=".1"
      ></Box>
      <Flex gap=".8rem" alignItems="center">
        <Avatar w={25} h={25} src={""} name="" />
        <VStack alignItems="start" gap=".4rem">
          <Box h=".4rem" w="8rem" bg="gray.100" opacity=".5" />
          <Box h=".4rem" w="12rem" bg="gray.100" opacity=".3" />
        </VStack>
      </Flex>
      <Flex flexDir="column" gap=".5rem" w="full">
        <Heading height=".4rem"></Heading>
        <Flex
          height=".8rem"
          gap="1rem"
          w="full"
          pos="relative"
          alignItems="center"
        >
          <Box bgColor="gray.main" opacity=".3" h=".6rem" w="30%"></Box>
          <DotSeparator backgroundColor="gray.main" w=".6rem" h=".6rem" />
          <Box bgColor="gray.main" opacity=".3" h=".6rem" w="30%"></Box>
          <DotSeparator backgroundColor="gray.main" w=".6rem" h=".6rem" />
          <Box bgColor="gray.main" opacity=".3" h=".6rem" w="30%"></Box>
        </Flex>
        <Flex flexDir="column" textAlign="center" gap=".5rem" w="full">
          <Text bgColor="gray.main" w="full" h=".7rem" opacity=".1"></Text>
          <Text bgColor="gray.main" w="full" h=".7rem" opacity=".1"></Text>
        </Flex>
      </Flex>
    </Flex>
  )
}

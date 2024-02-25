import {
  Flex,
  Heading,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Text,
} from "@chakra-ui/react"
import DownChevron from "../_assets/SVG/DownChevron"

export default function FAQ() {
  return (
    <Popover matchWidth>
      <PopoverTrigger>
        <Question />
      </PopoverTrigger>
      <PopoverContent
        w="100%"
        _focus={{ boxShadow: "none", outline: "0", border: "0" }}
      >
        <Answer />
      </PopoverContent>
    </Popover>
  )
}

const sharedStyles = {
  py: { base: "2rem", md: "4rem" },
  px: { base: "2rem", md: "5rem" },
  boxShadow: "0px 1px 1px 0px #00000040",
  border: "1px solid #7070704D",
}

function Question() {
  return (
    <Flex
      {...sharedStyles}
      width={{ base: "95dvw", md: "72.9%" }}
      justifyContent="space-between"
      alignItems="center"
      rounded="1.2rem"
      cursor="pointer"
    >
      <Heading
        as="h5"
        fontSize={{ base: "1.6rem", lg: "2rem" }}
        lineHeight="2rem"
        fontWeight="600"
      >
        Is Roomeyfinder free to use?
      </Heading>
      <Button variant="transparent">
        <DownChevron />
      </Button>
    </Flex>
  )
}

function Answer() {
  return (
    <Flex
      {...sharedStyles}
      rounded="1.2rem"
      justifyContent="space-between"
      alignItems="start"
      flexDir="column"
      width={"100%"}
      gap={{ base: "2rem", lg: "3rem" }}
      bg="white"
      fontSize={{ base: "1.4rem", lg: "1.9rem" }}
      lineHeight="2.4rem"
      fontWeight="normal"
    >
      <Text as="h6">Is Roomeyfinder free to use?</Text>
      <Flex gap={{ base: "1rem", lg: "2rem" }} flexDir="column">
        <Text>Yes! It's free to create an account Roomi for personal use.</Text>
        <Text>
          If you're looking to rent out your room, you can have up to two active
          listings at one time and connect with up to 5 people per day for
          free.If you're looking for a roommate or a place to move, you can
          message up to 5 people per day for free.If you want to get verified,
          create more listings, or message more people, you'll need to upgrade
          your account by purchasing the Safety Bundle, Solo Agent, or
          Unlimited.
        </Text>
      </Flex>
    </Flex>
  )
}

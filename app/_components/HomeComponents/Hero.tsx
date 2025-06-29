"use client"
import { useAppSelector } from "@/app/_redux"
import { Box, Button, Flex, Heading, Link, Text } from "@chakra-ui/react"

export default function Hero() {
  const { user } = useAppSelector((store) => store.auth)
  return (
    <>
      <Flex
        minH="40dvh"
        bg="white"
        justifyContent="space-between"
        alignItems="center"
        flexDir={{ base: "column", sm: "row" }}
        pb={{ base: "5rem", md: "10rem" }}
        pt={{ base: "4rem", md: "8rem" }}
        maxW="125rem"
        w="90%"
        mx="auto"
      >
        <Box as="main">
          <Heading
            as="h1"
            variant="xl"
            fontWeight="500"
            lineHeight="120%"
            color="dark.main"
            mb="1rem"
            fontSize={{ base: "2.8rem", md: "4.2rem" }}
          >
            Find The Perfect Roommate & Space For You
          </Heading>

          <Text
            fontSize={{ base: "1.6rem", md: "2rem" }}
            color="gray.main"
            mb="4rem"
            lineHeight="150%"
          >
            Who says the perfect roommate does not exist? Easily find a roommate
            or living space that fits your lifestyle.
          </Text>
          <Button
            px="3rem"
            py="1.5rem"
            as={Link}
            href={user ? "/nexus" : "/signup?next=/ads"}
            variant={"brand"}
            fontSize="1.6rem"
            width="fit-content"
            fontWeight="700"
          >
            Explore Rooms
          </Button>
        </Box>
        <Box
          w={{ base: "100%" }}
          minH={{ base: "40dvh", lg: "50dvh" }}
          bgImage="url(/hero.svg)"
          bgSize="contain"
          bgRepeat="no-repeat"
          bgPos={{ base: "center", sm: "right" }}
        />
      </Flex>
    </>
  )
}

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
        flexDir={{ base: "column", md: "row" }}
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
            mb="1rem"
            fontSize={{ base: "2.8rem", md: "4.2rem" }}
          >
            Find Your Perfect Match: Roommates and Spaces Tailored to You
          </Heading>

          <Text
            fontSize={{ base: "1.6rem", md: "2rem" }}
            color="gray.main"
            mb="4rem"
            lineHeight="150%"
          >
            Whether you&apos;re a student searching for a cozy apartment, a
            professional seeking a shared living space, or a homeowner looking
            for a compatible roommate, we&apos;ve got you covered.
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
          minH="400px"
          maxW={{ base: "100vw", md: "60rem", lg: "60rem" }}
          bgImage="url(https://res.cloudinary.com/drwuaxewb/image/upload/v1734579561/statics/eb1s3mse2h7mvhpsmj3x.webp)"
          bgSize="contain"
          bgRepeat="no-repeat"
          bgPos="center"
        />
      </Flex>
    </>
  )
}

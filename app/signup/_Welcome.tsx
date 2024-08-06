import { Button, Flex, HStack, Heading, Text } from "@chakra-ui/react"
import { useRouter } from "next/navigation"

export default function Welcome() {
  const router = useRouter()
  return (
    <HStack
      justifyContent={{ base: "center", sm: "end" }}
      gap="4rem"
      maxW="120rem"
      mx="auto"
      minH={{ base: "70dvh", md: "68dvh" }}
      alignItems={{ sm: "center" }}
      px={{ base: "3rem", sm: "6rem" }}
      bgImage={{
        base: "url(https://res.cloudinary.com/messengerapptask/image/upload/v1719666824/welcome_eeuyan.svg)",
      }}
      bgSize={{ base: "25rem", sm: "30rem", md: "48rem" }}
      bgRepeat="no-repeat"
      bgPos={{ base: "top", sm: "left" }}
    >
      <Flex
        flexDir="column"
        mt={{ base: "9rem", sm: "0" }}
        alignItems={{ base: "center", sm: "end" }}
        justifyContent="center"
        textAlign={{ base: "center", sm: "right" }}
        gap="2.4rem"
        pt={{ base: "3rem"}}
      >
        <Heading variant="large" fontWeight="500">
          Welcome To{" "}
          <Text
            textShadow="2px 2px #3a86ff30"
            fontSize="inherit"
            fontWeight="inherit"
            as="span"
          >
            RoomeyFinder!
          </Text>
        </Heading>
        <Text fontSize={{ base: "1.8rem", md: "2.4rem" }}>
          Let&apos;s get you started with finding your
          <Text
            fontSize="inherit"
            fontWeight="500"
            as="span"
            color="brand.main"
          >
            {" "}
            ideal roommate.
          </Text>
        </Text>
        <Button variant="brand-secondary" onClick={() => router.push("/nexus")}>
          Find My roommate
        </Button>
      </Flex>
    </HStack>
  )
}

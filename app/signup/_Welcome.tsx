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
      minH={{ base: "60dvh", md: "60dvh" }}
      alignItems={{ sm: "center" }}
      px={{ base: "3rem", sm: "6rem" }}
      bgImage={{ base: "url(/images/welcome.svg)" }}
      bgSize={{ base: "25rem", sm: "30rem", md: "contain" }}
      bgRepeat="no-repeat"
      bgPos={{ base: "top", sm: "left" }}
    >
      <Flex
        flexDir="column"
        alignItems={{ base: "center", sm: "end" }}
        justifyContent="end"
        textAlign={{ base: "center", sm: "right" }}
        gap="2.4rem"
      >
        <Heading variant="large" fontWeight="500">
          Welcome To{" "}
          <Text
            textShadow="2px  2px #3a86ff30"
            fontSize="inherit"
            fontWeight="inherit"
            as="span"
          >
            RoomeyFinder!
          </Text>
        </Heading>
        <Text fontSize={{ base: "1.8rem", md: "2.4rem" }}>
          Let&apos;s get you started with finding the
          <Text
            fontSize="inherit"
            fontWeight="500"
            as="span"
            color="brand.main"
          >
            {" "}
            perfect roommate.
          </Text>
        </Text>
        <Button variant="brand-secondary" onClick={() => router.push("/")}>
          Find My roommate
        </Button>
      </Flex>
    </HStack>
  )
}

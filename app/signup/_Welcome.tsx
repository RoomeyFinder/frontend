import { Button, Flex, HStack, Heading, Image, Text } from "@chakra-ui/react"
import { useRouter } from "next/navigation"

export default function Congratulations() {
  const router = useRouter()
  return (
    <HStack
      justifyContent={{ base: "center", sm: "start" }}
      gap="4rem"
      maxW="120rem"
      mx="auto"
      minH="40dvh"
      alignItems={{ sm: "start" }}
      px={{ base: "3rem", sm: "6rem" }}
      bgImage={{ base: "none", sm: "url(/images/welcome.jpg)" }}
      bgSize={{ sm: "50rem", md: "70rem" }}
      bgRepeat="no-repeat"
      bgPos="right"
    >
      <Flex
        flexDir="column"
        alignItems={{ base: "center", sm: "start" }}
        textAlign={{ base: "center", sm: "start" }}
        gap="2.4rem"
      >
        <Heading variant="large" fontWeight="400">
          Welcome To RoomeyFinder!
        </Heading>
        <Image
          src="/images/welcome.jpg"
          alt=""
          display={{ sm: "none" }}
          w="50rem"
          h="auto"
        />
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

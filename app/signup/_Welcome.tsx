import { Button, Flex, VStack, Heading, Text, Image } from "@chakra-ui/react"
import { useRouter } from "next/navigation"

export default function Welcome() {
  const router = useRouter()
  return (
    <VStack
      flexDir={{ base: "column", sm: "row" }}
      justifyContent="center"
      gap="4rem"
      maxW="120rem"
      mx="auto"
      minH={{ base: "70dvh", md: "68dvh" }}
      alignItems="center"
      px={{ base: "3rem", sm: "6rem" }}
    >
      <Image
        alt=""
        width={{ base: 250, md: 415 }}
        height={{ base: 300, md: 500 }}
        src="https://res.cloudinary.com/messengerapptask/image/upload/v1719666824/welcome_eeuyan.svg"
      />
      <Flex
        flexDir="column"
        justifyContent="center"
        alignItems={{ base: "center", sm: "end" }}
        textAlign={{ base: "center", sm: "right" }}
        gap="2.4rem"
        pt={{ base: "3rem" }}
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
    </VStack>
  )
}

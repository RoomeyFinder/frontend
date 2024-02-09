"use client"
import {
  Box,
  Divider,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react"
import Hero from "../_components/PublicPages/Hero"
import { useState } from "react"
import Empty from "../_components/Empty"

export default function Home() {
  const [currentDisplay, setCurrentDisplay] = useState<"terms-of-service" | "privacy-policy">("terms-of-service")
  return (
    <>
      <Box position="relative">
        <Hero bgImagePath="/images/legal-hero.png">
          <Heading as="h1" variant="large" mb="2rem" mt="auto">
            Legal
          </Heading>
          <Divider borderColor="gray.100" />
          <Text
            fontSize={{ base: "1.3rem", md: "1.6rem" }}
            color="black"
            my="3rem"
            lineHeight="2.2rem"
          >
            Explore this section for crucial details about how you can use our
            website, our privacy policy, and other legal matters that impact
            your engagement with us.
          </Text>
          <Divider borderColor="gray.100" />
        </Hero>
        <Flex
          fontSize={{ base: "1.6rem", lg: "2.4rem" }}
          lineHeight="normal"
          gap="2rem"
          position="absolute"
          bottom="0"
          left="10.5%"
        >
          <Text
            as="button"
            onClick={() => setCurrentDisplay("terms-of-service")}
            color={
              currentDisplay === "terms-of-service" ? "black" : "gray.main"
            }
            borderBottom=".3rem solid"
            borderBottomColor={
              currentDisplay === "terms-of-service" ? "black" : "transparent"
            }
            pb="1rem"
          >
            Terms of service
          </Text>
          <Text
            as="button"
            onClick={() => setCurrentDisplay("privacy-policy")}
            color={currentDisplay === "privacy-policy" ? "black" : "gray.main"}
            borderBottom=".3rem solid"
            borderBottomColor={
              currentDisplay === "privacy-policy" ? "black" : "transparent"
            }
            pb="1rem"
          >
            Privacy policy
          </Text>
        </Flex>
      </Box>
      <Box>
        <Empty />
      </Box>
    </>
  )
}

import {
  Box,
  Divider,
  Flex,
  Heading,
  Input,
  Text,
  Textarea,
} from "@chakra-ui/react"
import Hero from "../_components/PublicPages/Hero"
import PageInput from "../_components/PublicPages/Input"
import RightArrow from "../_assets/RightArrow"

export default function Home() {
  return (
    <>
      <Hero bgImagePath="/images/contact-hero.png">
        <Heading as="h1" variant="large" mb="2rem">
          Contact us:
        </Heading>
        <Divider borderColor="gray.100" />
        <Text
          fontSize={{ base: "1.3rem", md: "1.6rem" }}
          color="black"
          my="3rem"
          lineHeight="2.2rem"
        >
          Have any questions?
        </Text>
        <Divider borderColor="gray.100" />
        <Box mt="3rem">
          <PageInput
            inputProps={{
              placeholder: "Say hi to us",
              _placeholder: {
                color: "gray.100",
              },
            }}
            icon={<RightArrow />}
          />
        </Box>
      </Hero>
      <FeaturesSection />
    </>
  )
}

function FeaturesSection() {
  return (
    <>
      <Flex
        minH="40dvh"
        bg="white"
        textAlign="center"
        justifyContent="center"
        w="100%"
        py={{ base: "8rem", md: "5rem" }}
      >
        <Box as="section" w="95dvw">
          <Heading as="h2" variant="md" mb="3rem">
            Leave a message
          </Heading>
          <Flex
            flexWrap="wrap"
            gap="5rem"
            w="full"
            justifyContent="center"
            as="form"
            maxW="60rem"
            mx="auto"
          >
            <Input placeholder="Your name" borderColor="#7070704D" />
            <Input placeholder="Your email" borderColor="#7070704D" />
            <Input 
              as={Textarea}
              placeholder="Your message"
              resize="none"
              h="25rem"
              rounded="1.2rem"
              borderColor="#7070704D"
            ></Input>
          </Flex>
        </Box>
      </Flex>
    </>
  )
}

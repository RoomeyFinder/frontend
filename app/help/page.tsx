import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react"
import Hero from "../_components/PublicPages/Hero"
import DownChevron from "../_assets/DownChevron"
import PageInput from "../_components/PublicPages/Input"
import SearchIcon from "../_assets/SearchIcon"

export default function Home() {
  return (
    <>
      <Hero bgImagePath="/images/help-hero.png">
        <Heading as="h1" variant="large" mb="2rem">
          Help
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
              placeholder: "Enter your search term here...",
              _placeholder: {
                color: "gray.100",
              },
            }}
            icon={<SearchIcon />}
          />
        </Box>
      </Hero>
      <Questions />
      <FAQS />
    </>
  )
}

function FAQS() {
  return (
    <Box py="5rem">
      <Heading textAlign="center" variant="medium" mb="5rem">
        Frequently Asked Questions
      </Heading>
      <VStack gap={{ base: "2rem", lg: "5rem" }}>
        <FAQ />
        <FAQ />
        <FAQ />
      </VStack>
    </Box>
  )
}

function Questions() {
  return (
    <Box py="5rem">
      <Heading textAlign="center" variant="medium" mb="5rem">
        How Can We Help You Today?
      </Heading>
      <Flex
        gap="5rem"
        flexWrap="wrap"
        justifyContent="center"
        alignItems="center"
      >
        <QuestionBox />
        <QuestionBox />
        <QuestionBox />
        <QuestionBox />
        <QuestionBox />
        <QuestionBox />
      </Flex>
    </Box>
  )
}

function QuestionBox() {
  return (
    <Flex
      gap="3rem"
      h={{ base: "25rem", md: "30rem" }}
      w="95dvw"
      maxW={{ base: "37.5rem", md: "45rem" }}
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      boxShadow="0px 4px 4px 0px #00000040"
      rounded="1.2rem"
      border="1px solid"
      borderColor="#7070704D"
    >
      <Text
        fontSize="5rem"
        fontWeight="bold"
        color="gray.main"
        border="5px solid currentColor"
        lineHeight="normal"
        w="7rem"
        h="7rem"
        textAlign="center"
        display="flex"
        justifyContent="center"
        alignItems="center"
        rounded="full"
      >
        1
      </Text>
      <VStack spacing="2rem">
        <Heading fontSize="2rem" fontWeight="600">
          Getting started
        </Heading>
        <Text fontSize="1.6rem" lineHeight="2.4rem" color="gray.main">
          5 Questions
        </Text>
      </VStack>
    </Flex>
  )
}

function FAQ() {
  return (
    <Flex
      appearance="none"
      py={{ base: "2rem", md: "4rem" }}
      px={{ base: "2rem", md: "5rem" }}
      width={{ base: "95dvw", md: "72.9%" }}
      justifyContent="space-between"
      alignItems="center"
      boxShadow="0px 1px 1px 0px #00000040"
      border="1px solid #7070704D"
      rounded="1.2rem"
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

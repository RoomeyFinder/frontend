import {
  Box,
  Divider,
  Flex,
  Heading,
  VStack,
} from "@chakra-ui/react"
import FAQ from "../_components/FAQ"
import QuestionCard from "../_components/QuestionCard"
import Hero from "../_components/PublicPages/Hero"
import PageInput from "../_components/PublicPages/Input"
import SearchIcon from "../_assets/SearchIcon"
import PageText from "../_components/PublicPages/Text"

export default function Home() {
  return (
    <>
      <Hero bgImagePath="/images/help-hero.png">
        <Heading as="h1" variant="large" mb="2rem">
          Help
        </Heading>
        <Divider borderColor="gray.100" />
        <PageText>
          Have any questions?
        </PageText>
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
          <QuestionCard
            title={"Getting Started"}
            number={"1"}
            description={"5 Questions"}
          />
          <QuestionCard
            title={"Your Account"}
            number={"2"}
            description={"3 Questions"}
          />
          <QuestionCard
            title={"In app Purchases"}
            number={"3"}
            description={"1 Questions"}
          />
          <QuestionCard
            title={"Trust and Safety"}
            number={"4"}
            description={"1 Questions"}
          />
          <QuestionCard
            title={"Submit a bug report"}
            number={"5"}
            description={"2 Questions"}
          />
          <QuestionCard
            title={"Troubleshooting"}
            number={"6"}
            description={"2 Questions"}
          />
        </Flex>
      </Box>
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
    </>
  )
}

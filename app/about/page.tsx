import {
  Box,
  Divider,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react"
import Hero from "../_components/PublicPages/Hero"
import ChatIcon from "../_assets/ChatIcon"
import Handlens from "../_assets/Handlens"
import PeopleGroup from "../_assets/PeopleGroup"
import FeatureCard from "../_components/FeatureCard"

export default function Home() {
  return (
    <>
      <Hero bgImagePath="/images/about-hero.png">
        <Heading as="h1" variant="large" mb="2rem">
          About us:
        </Heading>
        <Divider borderColor="gray.100" />
        <Text
          fontSize={{ base: "1.3rem", md: "1.6rem" }}
          color="black"
          my="3rem"
          lineHeight="2.2rem"
        >
          Welcome to Roomeyfinder, we redefine the experience of finding the
          perfect living space and compatible roommates. Our platform is
          designed with precision, simplicity, and professionalism in mind,
          offering a seamless solution for individuals seeking rooms and
          roommates.
        </Text>
        <Divider borderColor="gray.100" />
      </Hero>
      <FeaturesSection/>
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
          <Heading as="h1" variant="md" mb="3rem">
            What Roomeyfinder offers
          </Heading>
          <Text
            fontSize={{ base: "1.3rem", md: "1.6rem" }}
            color="gray.main"
            mb="5rem"
            lineHeight="2.2rem"
          >
            Here at Roomeyfinder, we help you find your ideal living situation
            or find a match for your space.
          </Text>
          <Flex
            as="ul"
            flexWrap="wrap"
            gap="5rem"
            w="full"
            justifyContent="center"
          >
            <FeatureCard
              iconChild={<PeopleGroup />}
              heading="List your space"
              body="Roomeyfinder helps you effortlessly project and list your available living spaces. Our platform serves as a dedicated avenue to showcase your space and connect with individuals searching for their ideal space."
            />
            <FeatureCard
              iconChild={<Handlens />}
              heading="Find a new space"
              body=" We are here to help you find the perfect living space. Our platform is designed to provide a seamless avenue for discovering spaces that match your preferences. We provide access to a detailed selection of spaces  to help you make informed decisions."
            />
            <FeatureCard
              iconChild={<ChatIcon />}
              heading="Message potential roommates"
              body="Message and get in touch with potential roommates in order to get to k now each other better by using the Roomeyfinder messaging system."
            />
          </Flex>
        </Box>
      </Flex>
    </>
  )
}

import { Box, Flex, Heading, Text } from "@chakra-ui/react"
import AboutPageSvg from "../_assets/SVG/AboutPage"
import ChatIcon from "../_assets/SVG/ChatIcon"
import Handlens from "../_assets/SVG/Handlens"
import PeopleGroup from "../_assets/SVG/PeopleGroup"
import FeatureCard from "../_components/FeatureCard"
import appendSharedMetaData from "../_metadata"

export async function generateMetadata() {
  return appendSharedMetaData({
    title: "About Us • Roomeyfinder",
    description:
      "Learn more about Roomeyfinder, our mission, values, and the services we offer to help you find the perfect living arrangement and roommates.",
  })
}
export default function Home() {
  return (
    <>
      <Flex
        minH="40dvh"
        bg="white"
        justifyContent="space-between"
        alignItems="center"
        flexDir={{ base: "column", sm: "row" }}
        pt={{ base: "5rem", md: "10rem" }}
        pb={{ md: "5rem" }}
        maxW="125rem"
        w="90%"
        mx="auto"
      >
        <>
          <Box as="main">
            <Heading
              as="h1"
              variant="xl"
              fontWeight="500"
              mb="2.5rem"
              fontSize={{ base: "3.6rem", md: "5rem" }}
            >
              About Roomeyfinder
            </Heading>

            <Text
              fontSize={{ base: "1.6rem", md: "2rem" }}
              color="gray.main"
              mb="4.9rem"
              lineHeight="150%"
              maxW="70rem"
            >
              Whether you&apos;re a student searching for a cozy apartment, a
              professional seeking a shared living space, or a homeowner looking
              for a compatible roommate, we&apos;ve got you covered.
              Roomeyfinder is your go-to platform for finding the perfect living
              arrangements. Our mission is to simplify the process of finding
              rooms and roommates, creating harmonious living environments for
              everyone.
            </Text>
          </Box>
        </>
        <Box w="90dvw" maxW={{ base: "35rem", lg: "45rem" }}>
          <AboutPageSvg />
        </Box>
      </Flex>
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
          <Heading as="h1" variant="md" mb="1.8rem">
            What Roomeyfinder offers
          </Heading>
          <Text
            fontSize={{ base: "1.6rem", md: "2rem" }}
            color="gray.main"
            mb="5rem"
            lineHeight="2.2rem"
          >
            Finding your perfect roommate effortlessly.
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

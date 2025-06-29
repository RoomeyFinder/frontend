"use client"
import ChatIcon from "@/app/_assets/SVG/ChatIcon";
import ForRent from "@/app/_assets/SVG/ForRent";
import Handlens from "@/app/_assets/SVG/Handlens";
import MatchIcon from "@/app/_assets/SVG/Match";
import SupportIcon from "@/app/_assets/SVG/Support";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import FeatureCard from "../FeatureCard";
// import Contract from "../_assets/SVG/Contract"

export default function FeaturesSection() {
  return (
    <>
      <Flex
        minH="40dvh"
        bg="#f5f9ff59"
        textAlign="center"
        justifyContent="center"
        mb="6rem"
        w="100%"
        px={{ base: "3rem", md: "8rem", lg: "8rem" }}
        py={{ base: "5rem", md: "8rem" }}
      >
        <Box as="section">
          <Heading
            as="h2"
            variant="md"
            mb="1rem"
            fontSize={{ base: "2.6rem", md: "4rem" }}
            fontWeight="500"
          >
            What Roomeyfinder offers
          </Heading>
          <Text
            fontSize={{ base: "1.6rem", md: "2rem" }}
            mb="4rem"
            maxW="80rem"
            mx="auto"
            // lineHeight="3rem"
          >
            Find Your Perfect Roommate with Our Roommate Finder effortlessly.
          </Text>
          <Flex
            as="ul"
            flexWrap="wrap"
            gap="3rem"
            w="full"
            justifyContent="center"
          >
            {/* <FeatureCard
              iconChild={<ForRent />}
              heading="List your space"
              body="Roomeyfinder helps you effortlessly project and list your available living spaces. Our platform serves as a dedicated avenue to showcase your space and connect with individuals searching for their ideal space."
            />
            <FeatureCard
              iconChild={<ForRent />}
              heading="Roommate matching"
              body="Our roommate matching system ensures you find a roommate with similar lifestyles and preferences"
            />
            <FeatureCard
              iconChild={<Handlens />}
              heading="Find a new space"
              body=" Our platform is designed to provide a seamless avenue for discovering spaces that match your preferences. We provide access to a detailed selection of spaces  to help you make the best choice."
            />
            <FeatureCard
              iconChild={<ChatIcon />}
              heading="Message potential roommates"
              body="Message and get in touch with potential roommates in order to get to know each other  by using the Roomeyfinder messaging system."
            /> */}
            <FeatureCard
              iconChild={<ForRent />}
              heading="List Your Space"
              body="Effortlessly showcase your available living spaces on RoomeyFinder. Our platform connects you with individuals actively searching for their ideal home."
            />

            <FeatureCard
              iconChild={<MatchIcon />}
              heading="Roommate Matching"
              body="Discover your perfect match with our advanced roommate matching system. Find someone who shares your lifestyle, interests, and preferences for a harmonious living experience."
            />

            <FeatureCard
              iconChild={<Handlens />}
              heading="Find Your New Space"
              body="Explore a diverse selection of living spaces tailored to your needs. RoomeyFinder makes it easy to discover your next home with just a few clicks."
            />

            <FeatureCard
              iconChild={<ChatIcon />}
              heading="Connect with Potential Roommates"
              body="Use our built-in messaging system to communicate with potential roommates. Get to know each other better and make informed decisions before moving in together."
            />

            {/* <FeatureCard
              iconChild={<Contract />}
              heading="Roommate Agreements"
              body="Create customized roommate agreements to set clear expectations. Our templates help you outline responsibilities and keep your living situation stress-free."
            /> */}

            <FeatureCard
              iconChild={<SupportIcon />}
              heading="24/7 Support"
              body="Enjoy peace of mind with our dedicated support team available around the clock. Whether you have questions or need assistance, we’re here to help you every step of the way."
            />
          </Flex>
        </Box>
      </Flex>
    </>
  )
}

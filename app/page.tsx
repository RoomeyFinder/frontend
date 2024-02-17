"use client"
import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Link,
  Text,
} from "@chakra-ui/react"
import PublishAdClicker from "./_components/PublishAdClicker"
import FeatureCard from "./_components/FeatureCard"
import RoomListingCard from "./_components/RoomListingCard"
import ListingsGridLayout from "./_components/ListingsGridLayout"
import ChatIcon from "./_assets/SVG/ChatIcon"
import Handlens from "./_assets/SVG/Handlens"
import PeopleGroup from "./_assets/SVG/PeopleGroup"
const listOfRoomeys = [
  <RoomListingCard
    isLocked
    ownersName={"Milfred"}
    isFavourite={false}
    toggleIsFavourite={function (): void {}}
    ownersOccupation={"Banker"}
    city={""}
    rentAmount={1500000}
    rentDuration={"yearly"}
    title={""}
    images={[]}
  />,
  <RoomListingCard
    isLocked
    ownersName={"Milfred"}
    isFavourite={false}
    toggleIsFavourite={function (): void {}}
    ownersOccupation={"Banker"}
    city={""}
    rentAmount={1500000}
    rentDuration={"yearly"}
    title={""}
    images={[]}
  />,
  <RoomListingCard
    isLocked
    ownersName={"Milfred"}
    isFavourite={false}
    toggleIsFavourite={function (): void {}}
    ownersOccupation={"Banker"}
    city={""}
    rentAmount={1500000}
    rentDuration={"yearly"}
    title={""}
    images={[]}
  />,
  <RoomListingCard
    isLocked
    ownersName={"Milfred"}
    isFavourite={false}
    toggleIsFavourite={function (): void {}}
    ownersOccupation={"Banker"}
    city={""}
    rentAmount={1500000}
    rentDuration={"yearly"}
    title={""}
    images={[]}
  />,
  <RoomListingCard
    isLocked
    ownersName={"Milfred"}
    isFavourite={false}
    toggleIsFavourite={function (): void {}}
    ownersOccupation={"Banker"}
    city={""}
    rentAmount={1500000}
    rentDuration={"yearly"}
    title={""}
    images={[]}
  />,
  <RoomListingCard
    isLocked
    ownersName={"Milfred"}
    isFavourite={false}
    toggleIsFavourite={function (): void {}}
    ownersOccupation={"Banker"}
    city={""}
    rentAmount={1500000}
    rentDuration={"yearly"}
    title={""}
    images={[]}
  />,
  <RoomListingCard
    isLocked
    ownersName={"Milfred"}
    isFavourite={false}
    toggleIsFavourite={function (): void {}}
    ownersOccupation={"Banker"}
    city={""}
    rentAmount={1500000}
    rentDuration={"yearly"}
    title={""}
    images={[]}
  />,
  <RoomListingCard
    isLocked
    ownersName={"Milfred"}
    isFavourite={false}
    toggleIsFavourite={function (): void {}}
    ownersOccupation={"Banker"}
    city={""}
    rentAmount={1500000}
    rentDuration={"yearly"}
    title={""}
    images={[]}
  />,
]
export default function Home() {
  return (
    <>
      <Hero />
      <ListingsGridLayout list={listOfRoomeys} />
      <FeaturesSection />
    </>
  )
}

function Hero() {
  return (
    <>
      <Flex
        minH="40dvh"
        bg="white.200"
        textAlign="center"
        justifyContent="center"
        alignItems="center"
        py={{ base: "8rem", md: "14.6rem" }}
      >
        <Box as="main" maxW="80rem" w="95dvw">
          <Heading as="h1" variant="xl" mb="2.5rem">
            Find Roomies & Rooms.
          </Heading>
          <Divider borderColor="gray.100" />
          <Text
            fontSize={{ base: "1.3rem", md: "1.6rem" }}
            color="gray.main"
            mb="4.9rem"
            lineHeight="2.2rem"
          >
            Whether you&apos;re a student searching for a cozy apartment, a
            professional seeking a shared living space, or a homeowner looking
            for a compatible roommate, we&apos;ve got you covered.
          </Text>
          <Button display="block" mx="auto" variant="main" mb="4.5rem">
            <PublishAdClicker>Publish Your Ad</PublishAdClicker>
          </Button>
          <Link
            color="gray.main"
            fontSize={{ base: "1.3rem", md: "1.675rem" }}
            lineHeight="0"
            href="/help"
          >
            Info & Advice
          </Link>
        </Box>
      </Flex>
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

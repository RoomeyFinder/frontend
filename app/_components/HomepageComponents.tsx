"use client"
import ChatIcon from "@/app/_assets/SVG/ChatIcon"
import ForRent from "@/app/_assets/SVG/ForRent"
import Handlens from "@/app/_assets/SVG/Handlens"
import { useAppSelector } from "@/app/_redux"
import { Listing } from "@/app/_types/Listings"
import { Heading, Flex, Button, Box, Text, Image } from "@chakra-ui/react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ReactNode, LegacyRef, useContext } from "react"
import Empty from "./Empty"
import FeatureCard from "./FeatureCard"
import ListingsGridLayout from "./ListingsGridLayout"
import RoomListingCard from "./RoomListingCard"
import { RoomListingCardSkeleton } from "./Skeletons/ListingCardSkeleton"
import SkeletalLoading from "./Skeletons/SkeletalLoader"
import { AuthModalContext } from "../_providers/AuthModalProvider"

export default function ListingsSection() {
  const { user } = useAppSelector((store) => store.auth)
  const { listings, loading } = useAppSelector((store) => store.search)
  const router = useRouter()
  if (listings.length === 0 && !loading) return null
  return (
    <>
      <Box mx="auto" maxW="125rem" w={{ md: "90%" }}>
        <ListSectionContainer>
          <Heading variant="md">Latest Rooms</Heading>
          {loading ? (
            <SkeletalLoading variant="rooms" />
          ) : (
            <RoomsList
              rooms={listings}
              allowFavoriting={user !== null}
              loading={loading}
              emptyTextValue={<>No rooms found</>}
            />
          )}
          {listings.length > 0 && (
            <ContinueExploring
              text="rooms"
              onClick={() => router.push("/ads")}
              show={true}
            />
          )}
        </ListSectionContainer>
      </Box>
    </>
  )
}

function ListSectionContainer({
  children,
  sectionRef,
}: {
  children: ReactNode | ReactNode[]
  sectionRef?: LegacyRef<HTMLDivElement>
}) {
  return (
    <Box
      w={{ base: "95dvw", md: "full" }}
      mx="auto"
      display="flex"
      flexDir="column"
      gap="3rem"
      py={{ base: "3rem", md: "6rem" }}
      // px={{ base: "1.5rem", sm: "2rem", md: "6rem", lg: "7rem" }}
      ref={sectionRef}
    >
      {children}
    </Box>
  )
}

function RoomsList({
  rooms,
  // allowFavoriting,
  loading,
  emptyTextValue,
}: {
  rooms: Listing[]
  allowFavoriting: boolean
  loading: boolean
  emptyTextValue: ReactNode
}) {
  if (loading)
    return (
      <ListingsGridLayout
        list={new Array(12).fill(1).map((_, idx) => (
          <RoomListingCardSkeleton key={idx} />
        ))}
      />
    )
  if (rooms.length === 0 && !loading)
    return <Empty heading="Oops" text={emptyTextValue} />
  return (
    <>
      <ListingsGridLayout
        list={rooms.map((room) => (
          <RoomListingCard key={room._id} listing={room} variant="outlined" />
        ))}
        justifyContent="start"
        columns={{ base: 1, sm: 2, md: 2, lg: 4 }}
        alignItems="stretch"
      ></ListingsGridLayout>
    </>
  )
}

function ContinueExploring({
  text,
  onClick,
  show,
}: {
  text: ReactNode
  onClick: () => void
  show: boolean
}) {
  const { user, loading } = useAppSelector((store) => store.auth)
  const { open: showAuthModal } = useContext(AuthModalContext)

  if (!show) return null
  return (
    <Text
      onClick={() => {
        if (loading === false && user === null)
          return showAuthModal({
            title: "Sign in to view more ads",
            nextUrl: "/ads",
          })
        else typeof onClick === "function" && onClick()
      }}
      as="button"
      color="brand.main"
      fontSize={{ base: "1.6rem", md: "1.9rem" }}
      display="flex"
      justifyContent={{ base: "center", md: "start" }}
      alignItems={{ base: "center", md: "baseline" }}
      gap="1.6rem"
      p="0"
      h="unset"
      _hover={{
        md: {
          bg: "transparent",
          color: "black",
          textDecor: "underline",
        },
      }}
      _active={{ bg: "transparent" }}
    >
      Continue exploring {text}
    </Text>
  )
}

export function Hero() {
  const { user } = useAppSelector((store) => store.auth)
  return (
    <>
      <Flex
        minH="40dvh"
        bg="white"
        justifyContent="space-between"
        alignItems="center"
        flexDir={{ base: "column", md: "row" }}
        py={{ base: "5rem", md: "10rem" }}
        maxW="125rem"
        w="90%"
        mx="auto"
      >
        <Box as="main">
          <Heading
            as="h1"
            variant="xl"
            fontWeight="500"
            mb="1rem"
            fontSize={{ base: "3.6rem", md: "6rem" }}
          >
            Find Roomies & Rooms.
          </Heading>

          <Text
            fontSize={{ base: "1.6rem", md: "2rem" }}
            color="gray.main"
            mb="4rem"
            lineHeight="150%"
          >
            Whether you&apos;re a student searching for a cozy apartment, a
            professional seeking a shared living space, or a homeowner looking
            for a compatible roommate, we&apos;ve got you covered.
          </Text>
          <Button
            px="3rem"
            py="1.5rem"
            as={Link}
            href={user ? "/nexus/me" : "/signup"}
            variant={"brand"}
            fontSize="1.6rem"
            width="fit-content"
            fontWeight="700"
          >
            Get Started
          </Button>
        </Box>
        <Box maxW={{ base: "100vw", md: "60rem", lg: "60rem" }}>
          <Image
            src="https://res.cloudinary.com/messengerapptask/image/upload/v1719666871/hero-image_hokwu8.jpg"
            alt="Hero image for Roomeyfinder. Two ladies sitting on a blue couch having coffee"
          />
        </Box>
      </Flex>
    </>
  )
}

export function FeaturesSection() {
  return (
    <>
      <Flex
        minH="40dvh"
        bg="#f5f9ff"
        textAlign="center"
        justifyContent="center"
        w="100%"
        px={{ base: "3rem", md: "8rem", lg: "8rem" }}
        py={{ base: "5rem", md: "8rem" }}
      >
        <Box as="section">
          <Heading
            as="h1"
            variant="md"
            mb="1rem"
            fontSize={{ base: "3rem", md: "4rem" }}
            fontWeight="500"
          >
            What Roomeyfinder offers
          </Heading>
          <Text
            fontSize={{ base: "1.6rem", md: "2rem" }}
            mb="4rem"
            maxW="80rem"
            mx="auto"
            lineHeight="3rem"
          >
            Find your perfect roommate effortlessly.
          </Text>
          <Flex
            as="ul"
            flexWrap="wrap"
            gap="3rem"
            w="full"
            justifyContent="center"
          >
            <FeatureCard
              iconChild={<ForRent />}
              heading="List your space"
              body="Roomeyfinder helps you effortlessly project and list your available living spaces. Our platform serves as a dedicated avenue to showcase your space and connect with individuals searching for their ideal space."
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
            />
          </Flex>
        </Box>
      </Flex>
    </>
  )
}

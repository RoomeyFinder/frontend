"use client"
import {
  Box,
  GridItem,
  HStack,
  Heading,
  SimpleGrid,
  VStack,
} from "@chakra-ui/react"
import { useAppSelector } from "../_redux"
import RoomeyListingCard from "../_components/RoomeyListingCard"
import { useCallback } from "react"
import RoomListingCard from "../_components/RoomListingCard"
import { Listing } from "../_types/Listings"
import User from "../_types/User"

export default function NexusPage() {
  const { user } = useAppSelector((store) => store.auth)

  if (!user) return <></>
  return (
    <>
      <VStack
        as="main"
        py="4rem"
        px={{ base: "1.8rem", sm: "4rem", md: "6rem", xl: "4rem" }}
        alignItems="start"
        gap="10rem"
      >
        {(user.preferences?.lookingFor === "roommate" ||
          user.preferences?.lookingFor === "both" ||
          !user.preferences?.lookingFor) && (
          <VStack gap="3rem" alignItems="start" as="section" w="full">
            <Heading fontWeight="600" fontSize="3.2rem">
              Recommended Profiles
            </Heading>
            <RecomendationsDisplay type="Roomey" />
          </VStack>
        )}
        {(user.preferences?.lookingFor === "room" ||
          user.preferences?.lookingFor === "both" ||
          !user.preferences?.lookingFor) && (
          <VStack gap="3rem" alignItems="start" as="section" w="full">
            <Heading fontWeight="600" fontSize="3.2rem">
              Recommended Rooms
            </Heading>
            <RecomendationsDisplay type="Room" />
          </VStack>
        )}
      </VStack>
    </>
  )
}

function RecomendationsDisplay({ type }: { type: "Roomey" | "Room" }) {
  const { user } = useAppSelector((store) => store.auth)

  const getChildComponent = useCallback(
    (data: User | Listing) =>
      type === "Roomey" ? (
        <RoomeyListingCard user={data as User} variant="outlined" />
      ) : (
        <RoomListingCard listing={data as Listing} variant="outlined" />
      ),
    [type]
  )
  return (
    <>
      <SimpleGrid
        columns={{ base: 1, sm: 2, lg: 3, xl: 4 }}
        gap="1rem"
        w="full"
      >
        {[1, 2, 3, 4, 12, 22, 33, 44, 14, 32, 23, 24].map((it) => (
          <GridItem key={it} w="full">
            {getChildComponent(user as any)}
          </GridItem>
        ))}
      </SimpleGrid>
    </>
  )
}

"use client"
import { GridItem, Heading, SimpleGrid, VStack } from "@chakra-ui/react"
import { useAppSelector } from "../_redux"
import RoomeyListingCard from "../_components/RoomeyListingCard"
import { useCallback } from "react"
import RoomListingCard from "../_components/RoomListingCard"
import { Listing } from "../_types/Listings"
import User from "../_types/User"
import SkeletalLoading from "../_components/Skeletons/SkeletalLoader"

export default function NexusPage() {
  const { user } = useAppSelector((store) => store.auth)
  const { loadingRoomies, loadingRooms, roomies, rooms } = useAppSelector(
    (store) => store.recommendations
  )
  if (!user) return <></>
  return (
    <>
      <VStack
        as="main"
        py="4rem"
        px={{ base: "1.8rem", sm: "4rem", md: "6rem", xl: "4rem" }}
        alignItems={loadingRoomies || loadingRooms ? "center" : "start"}
        gap="10rem"
      >
        {(loadingRoomies || roomies.length > 0) &&
          (user.preferences?.lookingFor === "roommate" ||
            user.preferences?.lookingFor === "both" ||
            !user.preferences?.lookingFor) && (
            <VStack gap="3rem" alignItems="start" as="section" w="full">
              <Heading fontWeight="600" fontSize="3.2rem">
                Recommended Profiles
              </Heading>
              <RecomendationsDisplay type="Roomey" list={roomies} />
              {loadingRoomies && <SkeletalLoading variant="roomies" />}
            </VStack>
          )}
        {(loadingRooms || rooms.length > 0) &&
          (user.preferences?.lookingFor === "room" ||
            user.preferences?.lookingFor === "both" ||
            !user.preferences?.lookingFor) && (
            <VStack gap="3rem" alignItems="start" as="section" w="full">
              <Heading fontWeight="600" fontSize="3.2rem">
                Recommended Rooms
              </Heading>
              <RecomendationsDisplay type="Room" list={rooms} />
              {loadingRooms && <SkeletalLoading variant="rooms" />}n
            </VStack>
          )}
      </VStack>
    </>
  )
}

function RecomendationsDisplay({
  type,
  list,
}: {
  type: "Roomey" | "Room"
  list: (User | Listing)[]
}) {
  const getChildComponent = useCallback(
    (data: User | Listing) =>
      type === "Roomey" ? (
        <RoomeyListingCard user={data as User} variant="outlined" />
      ) : (
        <RoomListingCard
          listing={data as Listing}
          variant="outlined"
          showFavoriteButton
        />
      ),
    [type]
  )
  return (
    <>
      <SimpleGrid
        columns={{ base: 1, sm: 2, lg: 3, xl: 4 }}
        gap="1rem"
        w="full"
        alignItems="stretch"
      >
        {list.map((data) => (
          <GridItem key={data._id} w="full" h="full">
            {getChildComponent(data as any)}
          </GridItem>
        ))}
      </SimpleGrid>
    </>
  )
}

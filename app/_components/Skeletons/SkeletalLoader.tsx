"use client"
import { GridItem, SimpleGrid } from "@chakra-ui/react"
import {
  RoomListingCardSkeleton,
  RoomeyListingCardSkeleton,
} from "./ListingCardSkeleton"
import { useMemo } from "react"

export default function SkeletalLoading({
  variant,
  arrayLength,
}: {
  variant: "rooms" | "roomies"
  arrayLength?: number
}) {
  const list = useMemo(() => {
    const array: number[] = []
    array.length = arrayLength && arrayLength < 100 ? arrayLength : 4
    array.fill(0)
    return array
  }, [arrayLength])
  return (
    <SimpleGrid
      columns={{ base: 1, sm: 2, lg: 3, xl: 4 }}
      gap="1rem"
      w="full"
      alignItems="stretch"
    >
      {list.map((_, idx) => (
        <GridItem key={idx} w="full" h="full">
          {variant === "rooms" ? (
            <RoomListingCardSkeleton key={idx} hasBorder />
          ) : (
            <RoomeyListingCardSkeleton key={idx} hasBorder />
          )}
        </GridItem>
      ))}
    </SimpleGrid>
  )
}

import { HStack } from "@chakra-ui/react"
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
    <HStack flexWrap="wrap" w="full">
      {list.map((_, idx) =>
        variant === "rooms" ? (
          <RoomListingCardSkeleton key={idx} hasBorder />
        ) : (
          <RoomeyListingCardSkeleton key={idx} hasBorder />
        )
      )}
    </HStack>
  )
}

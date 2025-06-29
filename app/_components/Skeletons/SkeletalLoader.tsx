"use client"
import { Box } from "@chakra-ui/react"
import {
  RoomListingCardSkeleton,
  RoomeyListingCardSkeleton,
} from "./ListingCardSkeleton"
import { useMemo } from "react"
import { ListSectionContainer } from "../HomeComponents/ListingsClient"
import ListingsGridLayout from "../ListingsGridLayout"

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
    <>
      <ListSectionContainer>
        <ListingsGridLayout
          justifyContent="start"
          columns={{ base: 1, sm: 2, md: 2, lg: 4 }}
          alignItems="stretch"
          list={list.map((_, idx) => (
            <Box key={idx}>
              {variant === "rooms" ? (
                <RoomListingCardSkeleton key={idx} hasBorder />
              ) : (
                <RoomeyListingCardSkeleton key={idx} hasBorder />
              )}
            </Box>
          ))}
        />
      </ListSectionContainer>
    </>
  )
}

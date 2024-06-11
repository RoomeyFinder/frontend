"use client"
import { useAppSelector } from "@/app/_redux"
import ListingFormForCreateOrEdit from "../new/_components/ListingFormForCreateOrEdit"
import { useEffect, useMemo, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Flex } from "@chakra-ui/react"
import Loading from "@/app/_assets/SVG/Loading"

export default function ListingPage() {
  const { listings, loading } = useAppSelector((store) => store.listings)
  const searchParams = useSearchParams()
  const listing = useMemo(
    () => listings.find((it) => it._id === searchParams.get("id")),
    [listings, searchParams]
  )

  if (loading)
    return (
      <Flex justifyContent="center" alignItems="center" h="75dvh">
        <Loading />
      </Flex>
    )
  return <ListingFormForCreateOrEdit isCreate={false} listing={listing} />
}

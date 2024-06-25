"use client"
import { useSearchParams } from "next/navigation"
import ListingFormForCreateOrEdit from "../_components/ListingFormForCreateOrEdit"
import { useAppSelector } from "@/app/_redux"
import { useMemo } from "react"
import NoResultsDisplay from "@/app/_components/NoResultsDisplay"
import Loading from "@/app/_assets/SVG/Loading"
import { Flex } from "@chakra-ui/react"

export default function ListingPage() {
  const query = useSearchParams()
  const { listings, loading } = useAppSelector((store) => store.listings)
  const listing = useMemo(
    () => listings.find((it) => it._id === query.get("id")),
    [listings, query]
  )
  if (loading)
    return (
      <Flex w="full" h="full" justifyContent="center" alignItems="center">
        <Loading />
      </Flex>
    )
  if (!listing && loading)
    return <NoResultsDisplay body="That ad was not found" heading="Oops!" />
  return <ListingFormForCreateOrEdit isCreate={false} listing={listing} />
}

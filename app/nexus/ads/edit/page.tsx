"use client"
import { useSearchParams } from "next/navigation"
import ListingFormForCreateOrEdit from "../_components/ListingFormForCreateOrEdit"
import { useAppSelector } from "@/app/_redux"
import { useMemo } from "react"
import NoResultsDisplay from "@/app/_components/NoResultsDisplay"
import PageLoader from "@/app/_components/PageLoader"

export default function ListingPage() {
  const query = useSearchParams()
  const { listings, loading } = useAppSelector((store) => store.listings)
  const listing = useMemo(
    () => listings.find((it) => it._id === query.get("id")),
    [listings, query]
  )
  if (loading) return <PageLoader />
  if (!listing && loading)
    return <NoResultsDisplay body="That ad was not found" heading="Oops!" />
  return <ListingFormForCreateOrEdit isCreate={false} listing={listing} />
}

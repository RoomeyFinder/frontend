import { Suspense } from "react"
import ListingsSection, {
  FeaturesSection,
  Hero,
} from "./_components/HomepageComponents"
import appendSharedMetaData from "./_metadata"
import SkeletalLoading from "./_components/Skeletons/SkeletalLoader"
import { Listing } from "./_types/Listings"
import axios from "axios"

export async function generateMetadata() {
  return appendSharedMetaData({})
}

async function fetchListings<T>(): Promise<T> {
  const response = await axios.get<
    T,
    { data: T & { statusCode: number; status: "success" } }
  >(`/listings`, {
    baseURL: process.env.SERVER_URL,
  })
  return response.data
}

export default async function Home() {
  const listings = (await fetchListings<{ listings: Listing[] }>()).listings
  return (
    <>
      <Hero />
      <FeaturesSection />
      <Suspense fallback={<SkeletalLoading variant="rooms" />}>
        <ListingsSection listings={listings} />
      </Suspense>
    </>
  )
}

import { Suspense } from "react"
import appendSharedMetaData from "./_metadata"
import SkeletalLoading from "./_components/Skeletons/SkeletalLoader"
import { Box } from "@chakra-ui/react"
import FeaturesSection from "./_components/HomeComponents/FeaturesSection"
import Hero from "./_components/HomeComponents/Hero"
import ListingsWrapper from "./_components/HomeComponents/Listings"

export const dynamic = "force-dynamic"

export async function generateMetadata() {
  return appendSharedMetaData({})
}

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturesSection />
      <Box mx="auto" maxW="125rem" w={{ md: "90%" }}>
        <Suspense fallback={<SkeletalLoading variant="rooms" />}>
          <ListingsWrapper />
        </Suspense>
      </Box>
    </>
  )
}

import { icons } from "@/app/_data/adFeatures"
import { Listing } from "@/app/_types/Listings"
import {
  Box,
  Button,
  HStack,
  Heading,
  Show,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react"
import { useMemo, useState } from "react"
import { IoChevronForward } from "react-icons/io5"

export default function ListingFeatures({ listing }: { listing: Listing }) {
  const [showAll, setShowAll] = useState(
    listing?.features?.length && listing?.features?.length > 6 ? false : true
  )
  const firstSixFeatures = useMemo(
    () => listing?.features?.toSpliced(0, 5),
    [listing?.features]
  )
  if (!listing?.features) return null
  return (
    <>
      <VStack alignItems="start" px={{ base: "1rem", md: "0" }} w="full">
        <Heading fontSize="2.2rem" fontWeight="600" as="h3" mb="1.5rem">
          Features
        </Heading>
        <SimpleGrid
          columns={2}
          gridColumnGap="1.8rem"
          gridRowGap="1rem"
          flexWrap="wrap"
          columnGap={{ base: "2%", md: "1rem" }}
          rowGap={{ base: ".8rem", md: "1rem" }}
          w="full"
        >
          {(showAll ? listing.features : firstSixFeatures)?.map((feature) => (
            <ListingFeature key={feature} feature={feature} />
          ))}
        </SimpleGrid>
        <Button
          marginLeft={{ base: "auto", sm: "0", md: "auto" }}
          mt=".3rem"
          onClick={() => setShowAll((prev) => !prev)}
          bg="transparent"
          rounded=".8rem"
          h="unset"
          py=".6rem"
          px={{ base: "0", sm: ".8rem" }}
          gap=".8rem"
          display="flex"
          fontSize="1.4rem"
        >
          {showAll ? "Hide features" : "Show all features"} <IoChevronForward />
        </Button>
      </VStack>
    </>
  )
}

function ListingFeature({ feature }: { feature: string }) {
  return (
    <Box w="full" fontSize={{ base: "1.5rem" }}>
      <Show above="base">
        <HStack w="full" alignItems="center" gap=".8rem" as={Text}>
          {icons[feature as keyof typeof icons]}
          <Text as="span" flexGrow="1" textAlign="start">
            {feature}
          </Text>
        </HStack>
      </Show>
    </Box>
  )
}

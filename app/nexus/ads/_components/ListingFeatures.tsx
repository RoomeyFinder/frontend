import DotSeparator from "@/app/_components/DotSeparator"
import { icons } from "@/app/_data/adFeatures"
import { Listing } from "@/app/_types/Listings"
import {
  Box,
  Flex,
  HStack,
  Heading,
  Show,
  Text,
  VStack,
} from "@chakra-ui/react"

export default function ListingFeatures({ listing }: { listing: Listing }) {
  return (
    <>
      <Box px={{ base: "1rem", md: "0" }} w="full">
        <Heading fontSize="2.2rem" fontWeight="600" as="h3" mb="2rem">
          Features
        </Heading>
        <Flex
          flexWrap="wrap"
          columnGap={{ base: "2%", md: "1rem" }}
          rowGap={{ base: ".8rem", md: "1rem" }}
          w="full"
        >
          {listing.features?.map((feature) => (
            <ListingFeature key={feature} feature={feature} />
          ))}
        </Flex>
      </Box>
    </>
  )
}

function ListingFeature({ feature }: { feature: string }) {
  return (
    <Box
      w="48%"
      maxW={{ sm: "11rem" }}
      fontSize={{ base: "1.4rem", sm: "1.2rem" }}
    >
      <Show above="sm">
        <VStack
          border="1px solid"
          borderColor="gray.main"
          rounded="1.5rem"
          p=".5rem 1rem"
          h={{ sm: "6.6rem", md: "9.6rem" }}
          justifyContent="center"
          gap=".6rem"
          as={Text}
        >
          {icons[feature as keyof typeof icons]}
          <Text as="span">{feature}</Text>
        </VStack>
      </Show>
      <Show below="sm">
        <HStack alignItems="center" gap=".6rem" as={Text}>
          <DotSeparator />
          {icons[feature as keyof typeof icons]}
          <Text as="span">{feature}</Text>
        </HStack>
      </Show>
    </Box>
  )
}

import InterestButton from "@/app/_components/InterestButton"
import { Listing } from "@/app/_types/Listings"
import { rentDurationMapping } from "@/app/_utils"
import { VStack, HStack, Box, Text } from "@chakra-ui/react"

export default function ListingInfoCard({ listing }: { listing?: Listing }) {
  return (
    <>
      <VStack
        border="1px solid #ddd"
        rounded="1.2rem"
        boxShadow="rgba(0, 0, 0, 0.12) 0px 6px 16px"
        p="2.4rem"
        w={{ base: "96.5%", lg: "70%" }}
        gap="1.6rem"
        alignItems="start"
      >
        <HStack fontSize="1.5rem" alignItems="center">
          <Text as="span" color="brand.main" fontSize="2.4rem" fontWeight="700">
            {listing?.rentAmount?.toLocaleString("en-us", {
              style: "currency",
              currency: "ngn",
              currencyDisplay: "narrowSymbol",
              maximumFractionDigits: 0,
            })}
          </Text>
          <Text>per</Text>
          <Text fontWeight="600" textTransform="capitalize">
            {" "}
            roomey
          </Text>
          <Text>for</Text>
          <Text fontWeight="600" textTransform="capitalize">
            {" "}
            {listing &&
              rentDurationMapping[
                listing?.rentDuration as keyof typeof rentDurationMapping
              ]}
          </Text>
        </HStack>
        <HStack
          border="1px solid #b0b0b0"
          w="full"
          textTransform="uppercase"
          rounded=".8rem"
        >
          <VStack
            flexBasis="50%"
            py="1rem"
            px="1.2rem"
            alignItems="start"
            gap="0"
          >
            <Text fontWeight="700">Earliest Move-in</Text>
            <Text fontSize="1.25rem">
              {new Date(Date.now()).toLocaleDateString("en-us", {
                month: "2-digit",
                day: "2-digit",
                year: "numeric",
              })}
            </Text>
          </VStack>
          <VStack
            flexBasis="50%"
            py="1rem"
            px="1.2rem"
            alignItems="start"
            gap="0"
            borderLeft="1px solid #222"
          >
            <Text fontWeight="700">Current no. of occupants</Text>
            <Text fontSize="1.25rem">
              {listing?.currentOccupancyCount || 1}
            </Text>
          </VStack>
        </HStack>
        {listing && (
          <Box w="full">
            <InterestButton
              doc={listing?._id}
              docOwner={listing?.owner?._id || ""}
              docType="Listing"
              styleProps={{
                w: "full",
                py: "1.6rem",
              }}
            />
          </Box>
        )}
      </VStack>
    </>
  )
}

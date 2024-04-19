import HeartIcon from "@/app/_assets/SVG/HeartIcon"
import ShareIcon from "@/app/_assets/SVG/ShareIcon"
import { Listing } from "@/app/_types/Listings"
import { InterestButton } from "@/app/profile/_components/ProfileOverview"
import { Button, Flex } from "@chakra-ui/react"

export default function ListingCTAs({ isOwner, listing}: {
  isOwner: boolean
  listing: Listing
}) {
  return (
    <>
      <Flex
        pos="sticky"
        insetX="0"
        bottom={{ base: "0" }}
        alignItems="center"
        justifyContent="space-between"
        bg="white"
        py="1rem"
        px="1rem"
        boxShadow="0px -2px 2px #0000000f"
      >
        <Flex gap="1rem">
          <Button variant="brand-secondary" rounded="full" p="1rem">
            <ShareIcon />
          </Button>
          <Button variant="brand-secondary" rounded="full" p="1rem">
            <HeartIcon />
          </Button>
        </Flex>
        <InterestButton
          variant="brand-secondary"
          isOwner={isOwner}
          doc={listing?._id}
          docType={"Listing"}
          docOwner={listing.owner?._id as string} // hasSentInterest={false}
        />
      </Flex>
    </>
  )
}

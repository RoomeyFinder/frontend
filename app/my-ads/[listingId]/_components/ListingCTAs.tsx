import HeartIcon from "@/app/_assets/SVG/HeartIcon"
import ShareIcon from "@/app/_assets/SVG/ShareIcon"
import { InterestButton } from "@/app/profile/_components/ProfileOverview"
import { Box, Button, Flex } from "@chakra-ui/react"

export default function ListingCTAs() {
  return (
    <>
      <Flex
        pos="sticky"
        insetX="0"
        bottom={{ base: "0",}}
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
          variant="brand"
          isOwner={false}
          hasSentInterest={false}
        />
      </Flex>
    </>
  )
}

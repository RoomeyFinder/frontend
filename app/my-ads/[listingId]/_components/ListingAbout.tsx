import LeftChevron from "@/app/_assets/SVG/LeftChevron"
import { SmallTimesIcon } from "@/app/_assets/SVG/TimesIcon"
import { Listing } from "@/app/_types/Listings"
import {
  Box,
  Heading,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react"
import { useCallback, useMemo, useState } from "react"

export default function ListingAbout({ listing }: { listing: Listing }) {
  const [showMore, setShowMore] = useState(false)
  const previewOfDescription = useMemo(
    () => listing.description.slice(0, 600),
    [listing.description]
  )

  const getAboutDisplay = useCallback(
    ({ text, noOfLines }: { text: string; noOfLines?: number }) => {
      return (
        <>
          <Heading fontSize="2.2rem" fontWeight="600" as="h3" mb="2rem">
            About this space
          </Heading>
          <Text
            fontSize={{ base: "1.5rem", md: "1.9rem" }}
            lineHeight="3.2rem"
            flexWrap="wrap"
            columnGap={{ base: "2%", md: "1rem" }}
            rowGap={{ base: ".8rem", md: "1rem" }}
            w="full"
            noOfLines={noOfLines || undefined}
            color="gray.main"
          >
            {text}
          </Text>
        </>
      )
    },
    []
  )

  return (
    <>
      <Box px={{ base: "1rem", md: "0" }} w="full">
        {getAboutDisplay({ text: previewOfDescription, noOfLines: 7 })}
        {previewOfDescription.length === 600 && (
          <Text
            as="button"
            fontSize="1.9rem"
            display="flex"
            alignItems="center"
            mt="1.5rem"
            gap=".5rem"
            fontWeight="600"
            onClick={() => setShowMore(true)}
          >
            Show more
            <Text as="span" display="block" transform="rotate(180deg)">
              <LeftChevron />
            </Text>
          </Text>
        )}
      </Box>
      <Modal onClose={() => setShowMore(false)} isOpen={showMore} isCentered>
        <ModalOverlay />
        <ModalContent
          w="90dvw"
          maxW="120rem"
          bg="white"
          rounded="1.5rem"
          p={{ base: "2rem", md: "4rem" }}
        >
          <ModalHeader>
            <Text
              as="button"
              onClick={() => setShowMore(false)}
              color="black"
              display="flex"
              ml="auto"
            >
              <SmallTimesIcon />
            </Text>
          </ModalHeader>
          <ModalBody>
            {getAboutDisplay({ text: listing.description })}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

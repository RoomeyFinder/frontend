import Carousel from "@/app/_components/ListingCardImageCarousel"
import { Listing } from "@/app/_types/Listings"
import {
  Show,
  Flex,
  Image,
  Box,
  ImageProps,
  SimpleGrid,
  GridItem,
} from "@chakra-ui/react"
import { useCallback } from "react"

export default function ListingPhotos({
  photos,
}: {
  photos: Listing["photos"]
}) {
  const ImageItem = useCallback(({ src }: ImageProps) => {
    return (
      <Image
        w="100%"
        h="100%"
        borderRadius="xl"
        display="inline-block"
        objectFit="cover"
        src={src}
        alt="Alt"
      />
    )
  }, [])
  return (
    <>
      <Box w={{ base: "100dvw", sm: "100%" }} overflowX="hidden">
        <Show below="sm">
          <Carousel
            slides={photos}
            swiperSlideContent={({ slide }) => (
              <Image
                objectFit="cover"
                objectPosition="center"
                src={slide.secure_url}
                width="100%"
                height="100%"
                mx="auto"
                display="block"
                alt=""
              />
            )}
          />
        </Show>
        <Show above="sm">
          <Flex
            justifyContent="center"
            gap=".8rem"
            maxH="53.7rem"
            margin="0 auto"
          >
            <Flex
              flexGrow="1"
              flexShrink="0"
              maxW={{ sm: "50rem", md: "70rem", lg: "50%" }}
            >
              <Image
                w="100%"
                borderRadius="xl"
                display="inline-block"
                src={photos?.[0]?.secure_url}
                alt="Alt"
              />
            </Flex>

            <SimpleGrid
              flexGrow="1"
              maxW={"50%"}
              maxH="100%"
              overflow="auto"
              justifyContent="start"
              flexDir={{ md: "row", lg: "column" }}
              flexWrap="wrap"
              gap=".8rem"
              alignItems="stretch"
              columns={2}
            >
              {photos
                ?.filter((_, idx) => idx >= 0)
                .map((src) => (
                  <GridItem key={src.secure_url}>
                    <ImageItem src={src.secure_url} />
                  </GridItem>
                ))}
            </SimpleGrid>
          </Flex>
        </Show>
      </Box>
    </>
  )
}

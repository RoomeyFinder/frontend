import Carousel from "@/app/_components/ListingCardImageCarousel"
import { Listing } from "@/app/_types/Listings"
import { Show, Flex, Image, Box, ImageProps } from "@chakra-ui/react"
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
        maxH="24rem"
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
            gap="1.5rem"
            maxH="50rem"
            margin="0 auto"
          >
            <Flex
              flexGrow="1"
              flexShrink="0"
              maxW={{ sm: "50rem", md: "70rem", lg: "55%" }}
            >
              <Image
                w="100%"
                borderRadius="xl"
                display="inline-block"
                src={photos?.[0]?.secure_url}
                alt="Alt"
              />
            </Flex>

            <Flex
              flexGrow="1"
              maxW={"45%"}
              maxH="50rem"
              overflow="auto"
              justifyContent="center"
              flexDir={{ md: "row", lg: "column" }}
              flexWrap="wrap"
              gap="1.5rem"
            >
              {photos
                ?.filter((_, idx) => idx >= 0)
                .map((src) => (
                  <Flex key={src.secure_url} flexGrow="1">
                    <ImageItem src={src.secure_url} />
                  </Flex>
                ))}
            </Flex>
          </Flex>
        </Show>
      </Box>
    </>
  )
}

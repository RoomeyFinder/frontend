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
        src={src}
        alt="Alt"
      />
    )
  }, [])
  return (
    <>
      <Box w="100dvw" maxW={{ md: "100%" }}>
        <Show below="sm">
          <Carousel
            slides={photos}
            swiperSlideContent={({ slide }) => (
              <Image
                objectFit="contain"
                objectPosition="center"
                src={slide.secure_url}
                width="100%"
                height="auto"
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
            maxH={photos.length % 2 === 1 ? "50rem" : "30rem"}
            margin="0 auto"
          >
            {photos.length % 2 === 1 && (
              <Flex
                flexGrow="1"
                flexShrink="0"
                maxW={{ sm: "50rem", md: "70rem", lg: "55%" }}
              >
                <Image
                  w="100%"
                  borderRadius="xl"
                  display="inline-block"
                  src={photos[0]?.secure_url}
                  alt="Alt"
                />
              </Flex>
            )}

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
                .filter((_, idx) => idx >= 0)
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

import CarouselNavIcon from "@/app/_assets/SVG/CarouselNavIcon"
import TimesIcon from "@/app/_assets/SVG/TimesIcon"
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
  Text,
  Button,
} from "@chakra-ui/react"
import { useCallback, useState } from "react"
import Lightbox from "react-spring-lightbox"

export default function ListingPhotos({
  photos,
}: {
  photos: Listing["photos"]
}) {
  const [showPhotosInModal, setShowPhotosInModal] = useState(false)
  const [sourceIndex, setSourceIndex] = useState(0)

  const handleNext = useCallback(
    () =>
      sourceIndex + 1 < (photos || []).length &&
      setSourceIndex(sourceIndex + 1),
    [sourceIndex, photos]
  )

  const handlePrev = useCallback(
    () => sourceIndex > 0 && setSourceIndex(sourceIndex - 1),
    [sourceIndex]
  )
  const ImageItem = useCallback(
    ({ src, index }: { index: number } & ImageProps) => {
      return (
        <Box pos="relative" w="full" h="full">
          <Image
            w="100%"
            h="100%"
            display="inline-block"
            objectFit="cover"
            pos="relative"
            zIndex="1"
            src={src}
            alt="Alt"
            cursor="pointer"
            onClick={() => {
              setShowPhotosInModal((prev) => !prev)
              setSourceIndex(index)
            }}
          />
          <Box
            pos="absolute"
            bg="#dddddd48"
            className="pulse"
            h="full"
            w="full"
            zIndex="0"
            inset="0"
          />
        </Box>
      )
    },
    []
  )
  return (
    <>
      <Box w={{ base: "100dvw", sm: "100%" }} overflowX="hidden">
        <Show below="sm">
          <Carousel
            slides={photos}
            swiperSlideContent={({ slide, index }) => (
              <Box pos="relative" h="full" w="full">
                <Box
                  pos="absolute"
                  bg="#dddddd48"
                  className="pulse"
                  h="full"
                  w="full"
                  zIndex="0"
                  inset="0"
                />
                <Image
                  objectFit="cover"
                  objectPosition="center"
                  src={slide.secure_url}
                  width="100%"
                  height="100%"
                  mx="auto"
                  zIndex="1"
                  display="block"
                  pos="relative"
                  cursor="pointer"
                  alt=""
                  onClick={() => {
                    setShowPhotosInModal((prev) => !prev)
                    setSourceIndex(index)
                  }}
                />
              </Box>
            )}
          />
        </Show>
        <Show above="sm">
          <Flex
            justifyContent="center"
            gap=".8rem"
            maxH="53.7rem"
            h="45dvh"
            margin="0 auto"
            borderRadius={{ sm: "1.8rem" }}
            overflow="hidden"
          >
            <Flex
              flexGrow="1"
              flexShrink="0"
              h="full"
              maxW={{ sm: "50rem", md: "70rem", lg: "50%" }}
              pos="relative"
            >
              <Image
                w="100%"
                display="inline-block"
                src={photos?.[0]?.secure_url}
                alt=""
                cursor="pointer"
                objectFit="cover"
                onClick={() => {
                  setShowPhotosInModal((prev) => !prev)
                  setSourceIndex(0)
                }}
                pos="relative"
                zIndex="1"
              />
              <Box
                pos="absolute"
                bg="#dddddd48"
                className="pulse"
                h="full"
                w="full"
                zIndex="0"
                inset="0"
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
                .map((src, idx) => (
                  <GridItem key={src.secure_url}>
                    <ImageItem src={src.secure_url} index={idx} />
                  </GridItem>
                ))}
            </SimpleGrid>
          </Flex>
        </Show>
      </Box>
      <Lightbox
        isOpen={showPhotosInModal}
        onPrev={handlePrev}
        onNext={handleNext}
        images={(photos || [])?.map((p) => ({
          src: p.secure_url,
          loading: "lazy",
          alt: "",
        }))}
        currentIndex={sourceIndex}
        onClose={() => setShowPhotosInModal(false)}
        renderImageOverlay={() =>
          ImageOverlay({ onClick: () => setShowPhotosInModal(false) })
        }
        pageTransitionConfig={{
          from: { transform: "scale(0.75)", opacity: 0 },
          enter: { transform: "scale(1)", opacity: 1 },
          leave: { transform: "scale(0.75)", opacity: 0 },
          config: { mass: 1, tension: 320, friction: 32 },
        }}
        renderHeader={() => (
          <Box pos="absolute" right="4rem" top="4rem" zIndex="100">
            <Button
              h="unset"
              w="unset"
              bg="transparent"
              _hover={{ bg: "transparent" }}
              color="white.300"
              onClick={() => setShowPhotosInModal((prev) => !prev)}
            >
              <TimesIcon />
            </Button>
          </Box>
        )}
        renderPrevButton={() => (
          <Text
            as="button"
            pos="absolute"
            top="50%"
            transform="translateY(-50%) rotate(180deg)"
            zIndex="100"
            left="1.5rem"
            onClick={handlePrev}
          >
            <CarouselNavIcon />
          </Text>
        )}
        renderNextButton={() => (
          <Text
            as="button"
            pos="absolute"
            top="50%"
            transform="translateY(-50%) rotate(0)"
            zIndex="100"
            right="1.5rem"
            onClick={handleNext}
          >
            <CarouselNavIcon />
          </Text>
        )}
      />
    </>
  )

  // renderImageOverlay={() => (<ImageOverlayComponent >)}
  /* Add your own UI */
  // renderHeader={() => (<CustomHeader />)}
  // renderFooter={() => (<CustomFooter />)}
  // renderPrevButton={() => (<CustomLeftArrowButton />)}
  // renderNextButton={() => (<CustomRightArrowButton />)}

  /* Add styling */
  // className="cool-class"
  // style={{ background: "grey" }}

  /* Handle closing */
  // onClose={handleClose}

  /* Use single or double click to zoom */
  // singleClickToZoom

  /* react-spring config for open/close animation */
  // pageTransitionConfig={{
  //   from: { transform: "scale(0.75)", opacity: 0 },
  //   enter: { transform: "scale(1)", opacity: 1 },
  //   leave: { transform: "scale(0.75)", opacity: 0 },
  //   config: { mass: 1, tension: 320, friction: 32 }
  // }}
}

function ImageOverlay({ onClick }: { onClick: () => void }) {
  return (
    <Box
      bg="#000000a1"
      zIndex="-1"
      w="100dvw"
      h="100dvh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      position="fixed"
      inset="0"
      onClick={onClick}
    />
  )
}

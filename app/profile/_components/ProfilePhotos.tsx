import User from "@/app/_types/User"
import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  VStack,
} from "@chakra-ui/react"
import { useRef, useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Swiper as SwiperType } from "swiper"
import { Navigation, Pagination } from "swiper/modules"
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"

export default function ProfilePhotos({
  photos = [],
  name,
  onPhotoClick,
}: {
  photos?: User["photos"]
  name: string
  onPhotoClick: (idx: number) => void
}) {
  return (
    <VStack gap="3rem" alignItems="start">
      <Heading fontSize="2rem">More photos of {name}</Heading>
      <Flex gap="2rem">
        {photos.map((photo, idx) => (
          <Avatar
            onClick={() => onPhotoClick(idx)}
            key={photo._id}
            w={{ md: "6rem", lg: "10rem", xl: "13.8rem" }}
            h={{ md: "6rem", lg: "10rem", xl: "13.8rem" }}
            src={photo.secure_url}
            name={name}
          />
        ))}
      </Flex>
    </VStack>
  )
}

export function ProfilePhotosModal({
  show,
  activeIdx = 0,
  photos,
  close,
}: {
  show: boolean
  photos: User["photos"]
  activeIdx?: number
  close: () => void
}) {
  return (
    <>
      <Modal isOpen={show} onClose={close}>
        <ModalOverlay />
        <ModalContent
          bg="white"
          w="95dvw"
          h="min-content"
          maxW="50rem"
          display="flex"
          justifyContent="center"
          alignItems="center"
          pos="relative"
          rounded="1.2rem"
          py="8rem"
        >
          <ModalCloseButton size="4xl" />
          <ModalBody>
            <Box pos="relative" w={{ base: "28rem", md: "32rem" }}>
              <Swiper
                initialSlide={activeIdx}
                modules={[Pagination, Navigation]}
                pagination={{
                  clickable: true,
                }}
                loop
                spaceBetween={10}
              >
                {photos.map((photo) => (
                  <SwiperSlide key={photo._id} style={{ width: "fit-content" }}>
                    <Image
                      borderRadius="1.2rem"
                      objectFit="cover"
                      objectPosition="center"
                      src={photo.secure_url}
                      width={{ base: "28rem", md: "32rem" }}
                      height={277}
                      alt=""
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

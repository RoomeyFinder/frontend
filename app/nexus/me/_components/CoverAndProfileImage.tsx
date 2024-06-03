import CameraIcon from "@/app/_assets/SVG/CameraIcon"
import { Avatar, Button, Flex } from "@chakra-ui/react"

export default function CoverAndProfileImage({
  coverImage,
  profileImage,
  showCoverImageEditButton,
  showProfileImageEditButton,
  onProfileImageEditButtonClick,
  onCoverImageEditButtonClick,
}: {
  coverImage: string
  profileImage: string
  showCoverImageEditButton?: boolean
  showProfileImageEditButton?: boolean
  onProfileImageEditButtonClick?: () => void
  onCoverImageEditButtonClick?: () => void
}) {
  return (
    <Flex w="full" pos="relative">
      <Avatar
        w="100%"
        h={{ base: "20rem", sm: "25rem" }}
        src={coverImage}
        bgColor="white.300"
        borderRadius="0"
        objectFit="cover"
      />
      <Flex
        pos="absolute"
        top={{ base: "16.5rem", sm: "18.5rem" }}
        left={{ base: "2rem", sm: "8rem" }}
      >
        <Avatar
          w={{ base: "6rem", sm: "12rem" }}
          h={{ base: "6rem", sm: "12rem" }}
          src={profileImage}
          bgColor="white.500"
          border="2px solid white"
        />
        {showProfileImageEditButton && (
          <Button
            aria-label="change profile image"
            w="3.8rem"
            h="3.8rem"
            transform={{ base: "scale(.5)", sm: "scale(1)" }}
            onClick={onProfileImageEditButtonClick}
            pos="absolute"
            top={{ base: "45%", sm: "65%" }}
            right={{ base: "-15%", sm: "5%" }}
            bg="#e4e6ec"
            rounded="full"
          >
            <CameraIcon />
          </Button>
        )}
      </Flex>
      {showCoverImageEditButton && (
        <Button
          onClick={onCoverImageEditButtonClick}
          pos="absolute"
          top={{ base: "18rem", sm: "23rem" }}
          right={{ base: "2rem", sm: "10rem" }}
          variant="brand"
          fontSize={{ base: "1.3rem", sm: "1.6rem" }}
          fontWeight="700"
        >
          <CameraIcon /> Edit cover photo
        </Button>
      )}
    </Flex>
  )
}

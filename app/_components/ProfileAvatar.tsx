import { Avatar, AvatarProps, Box, Flex } from "@chakra-ui/react"
import PlaceHolderAvatar from "../_assets/SVG/PlaceHolderAvatar"
import VerifiedBadge from "../_assets/SVG/VerifiedBadge"

export default function ProfileAvatar({
  width,
  height,
  imageSrc,
}: {
  showVerifiedBadge: boolean
  imageSrc?: string
} & AvatarProps) {
  return (
    <Flex
      rounded="50%"
      position="relative"
      w="18rem"
      h="18rem"
      alignItems="center"
      justifyContent="center"
      boxShadow="0px 0px 3px 0px #00000029"
      border="3px solid"
      borderColor="white.200"
    >
      {imageSrc ? (
        <Avatar
          size="lg"
          fontSize="4rem"
          name="lorainee"
          width={width}
          height={height}
        />
      ) : (
        <PlaceHolderAvatar size="large" />
      )}
      <Box
        position="absolute"
        left="50%"
        transform="translateX(-50%)"
        top="calc(100% - 1rem)"
      >
        <VerifiedBadge />
      </Box>
    </Flex>
  )
}

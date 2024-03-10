import { Avatar, AvatarProps, Box, Flex, ResponsiveValue } from "@chakra-ui/react"
import PlaceHolderAvatar from "../_assets/SVG/PlaceHolderAvatar"
import VerifiedBadge from "../_assets/SVG/VerifiedBadge"

export default function ProfileAvatar({
  width,
  height,
  imageSrc,
  showVerifiedBadge,
  isDeletable = false,
  name,
  size,
  ...rest
}: {
  showVerifiedBadge?: boolean
  imageSrc?: string
  isDeletable?: boolean
  size?: ResponsiveValue<string | "small" | "large"> | "small" | "large"
} & AvatarProps) {

  return (
    <Flex
      rounded="50%"
      position="relative"
      alignItems="center"
      justifyContent="center"
      boxShadow={!isDeletable ? "0px 0px 3px 0px #00000029" : ""}
      border={!isDeletable ? "3px solid" : ""}
      borderColor={!isDeletable ? "white.200" : ""}
      // width={width}
      // height={height}
    >
      {imageSrc ? (
        <Avatar
          width={width}
          height={height}
          fontSize="4rem"
          name={name}
          src={imageSrc}
          {...rest}
        />
      ) : (
        <PlaceHolderAvatar size={(size as any) || "large"} />
      )}
      {showVerifiedBadge && (
        <Box
          position="absolute"
          left="50%"
          transform="translateX(-50%)"
          top="calc(100% - 1rem)"
        >
          <VerifiedBadge />
        </Box>
      )}
    </Flex>
  )
}

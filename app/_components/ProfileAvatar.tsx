import { Avatar, AvatarProps, Box, Flex, ResponsiveValue } from "@chakra-ui/react"
import PlaceHolderAvatar from "../_assets/SVG/PlaceHolderAvatar"
import VerifiedBadge from "../_assets/SVG/VerifiedBadge"
import { useState } from "react"
import TimesIcon from "../_assets/SVG/TimesIcon"

export default function ProfileAvatar({
  width,
  height,
  imageSrc,
  showVerifiedBadge,
  isDeletable = false,
  defaultShowRemoveIcon,
  name,
  size,
  ...rest
}: {
  showVerifiedBadge?: boolean
  imageSrc?: string
  isDeletable?: boolean
  defaultShowRemoveIcon?: boolean
  size?: ResponsiveValue<string | "small" | "large"> | "small" | "large"
} & AvatarProps) {
  const [showRemoveIcon, setShowRemoveIcon] = useState(false)

  return (
    <Flex
      rounded="50%"
      position="relative"
      // w="18rem"
      // h="18rem"
      alignItems="center"
      justifyContent="center"
      boxShadow={!isDeletable ? "0px 0px 3px 0px #00000029" : ""}
      border={!isDeletable ? "3px solid" : ""}
      borderColor={!isDeletable ? "white.200" : ""}
      onMouseOver={() => setShowRemoveIcon(true)}
      onMouseLeave={() => setShowRemoveIcon(false)}
    >
      {imageSrc ? (
        <Avatar
          fontSize="4rem"
          name={name}
          width={width}
          height={height}
          src={imageSrc}
          {...rest}
        />
      ) : (
        <PlaceHolderAvatar size={size as any || "large"} />
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
      {isDeletable && (
        <Flex
          cursor="pointer"
          as="button"
          type="button"
          name="remove this photo"
          pos="absolute"
          inset="0"
          justifyContent="center"
          alignItems="center"
          rounded="50%"
          transition="all 500ms ease"
          opacity={showRemoveIcon || defaultShowRemoveIcon ? 1 : 0}
          backdropFilter={
            showRemoveIcon || defaultShowRemoveIcon
              ? "brightness(.7)"
              : "brightness(1)"
          }
        >
          <TimesIcon />
        </Flex>
      )}
    </Flex>
  )
}

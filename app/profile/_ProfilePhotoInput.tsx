import { Flex, FormLabel, Show, Button, Text } from "@chakra-ui/react"
import FilledPlusIcon from "../_assets/SVG/FilledPlusIcon"
import PlaceHolderAvatar from "../_assets/SVG/PlaceHolderAvatar"
import ProfileAvatar from "../_components/ProfileAvatar"
import { useEffect, useMemo } from "react"

export default function ProfilePhotoInput({
  toggleShowAdditionalPhotos,
  file,
  updateFile,
  placeholder,
  name
}: {
  toggleShowAdditionalPhotos: () => void
  file?: File
  updateFile: (file?: File) => void
  placeholder?: string
  name: string
}) {
  const imageSrc = useMemo(
    () => (file ? URL.createObjectURL(file) :  placeholder || ""),
    [file, placeholder]
  )

  useEffect(() => {
    return () => {
      URL.revokeObjectURL(imageSrc)
    }
  }, [imageSrc])

  return (
    <Flex
      flexDir="column"
      w="fit-content"
      gap="1.8rem"
      mx={{ base: "auto", md: "0" }}
      alignItems={{ base: "center", md: "start" }}
    >
      <Flex as={FormLabel} position="relative" m="0" gap="0" w="fit-content">
        <input
          hidden
          accept="image/*"
          type="file"
          onChange={(e) => updateFile(e.target.files?.[0])}
        />
        {imageSrc ? (
          <ProfileAvatar
            width={120}
            height={120}
            isDeletable
            name={name}
            bg="brand.10"
            fontSize="2xl"
            fontWeight="600"
            color="white"
            imageSrc={imageSrc || placeholder}
          />
        ) : (
          <PlaceHolderAvatar size={"small"} />
        )}
        <Text
          top="calc(100% - 12px)"
          left="50%"
          transform="translateX(-50%)"
          position="absolute"
        >
          <FilledPlusIcon />
        </Text>
      </Flex>
      <Show below="md">
        <Button
          onClick={toggleShowAdditionalPhotos}
          type="button"
          textDecor="underline"
          bg="transparent"
          _focus={{ bg: "transparent" }}
        >
          Add more photos
        </Button>
      </Show>
    </Flex>
  )
}

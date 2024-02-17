import { Flex, FormLabel, Show, Button, Text } from "@chakra-ui/react"
import FilledPlusIcon from "../_assets/SVG/FilledPlusIcon"
import PlaceHolderAvatar from "../_assets/SVG/PlaceHolderAvatar"



export default function ProfilePhotoInput({ toggleShowAdditionalPhotos }: {
    toggleShowAdditionalPhotos: () => void
  }) {
  return (
    <Flex
      flexDir="column"
      w="fit-content"
      gap="1.8rem"
      mx={{ base: "auto", md: "0" }}
      alignItems={{ base: "center", md: "start" }}>
      <Flex as={FormLabel} position="relative" m="0" gap="0" w="fit-content">
        <input hidden type="file" />
        <PlaceHolderAvatar />
        <Text top="calc(100% - 12px)" left="50%" transform="translateX(-50%)" position="absolute"><FilledPlusIcon /></Text>
      </Flex>
      <Show below="md">
        <Button onClick={toggleShowAdditionalPhotos} type="button" textDecor="underline" bg="transparent" _focus={{ bg: "transparent" }}>Add more photos</Button></Show>
    </Flex>
  )
}

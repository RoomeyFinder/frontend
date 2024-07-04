import DragOverFileInput from "@/app/_components/DragOverFileInput"
import {
  Box,
  Button,
  Flex,
  GridItem,
  IconButton,
  Image,
  Popover,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  SimpleGrid,
  Text,
} from "@chakra-ui/react"
import { ChangeEventHandler, DragEventHandler, useRef } from "react"
import { IoCamera, IoTrash } from "react-icons/io5"

export type PreviewFile = {
  src: string
  id: string
  index: number
  type: "file" | "url"
}
export default function PhotoUploadSection({
  previews,
  handleChangeProps,
  handleDeleteImage,
}: {
  previews: PreviewFile[]
  handleDeleteImage: (file: PreviewFile) => void
  handleChangeProps: {
    handleDragEnter: DragEventHandler
    handleDragLeave: DragEventHandler
    handleChange: ChangeEventHandler
    handleDrop: DragEventHandler
    handleDragOver: DragEventHandler
    hasReachedUploadLimit: boolean
    dragActive: boolean
  }
}) {
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  return (
    <>
      <Box w="full">
        <Text
          fontSize="1.5rem"
          mb="1.5rem"
          fontWeight="500"
          mx="auto"
          textAlign="center"
          color={
            previews.length > 0 && previews.length <= 4 ? "red" : "gray.main"
          }
        >
          A minimum of 5 photos and a maximum 8
        </Text>
        {previews.length > 0 && (
          <Button
            isDisabled={previews.length >= 8}
            ml="auto"
            mb="2.5rem"
            variant="brand-secondary"
            onClick={() => {
              fileInputRef.current?.click()
            }}
            type="button"
          >
            <IoCamera /> Add More
          </Button>
        )}
        <Box
          w="full"
          opacity={previews.length === 0 ? 1 : 0}
          visibility={previews.length === 0 ? "visible" : "hidden"}
          height={previews.length === 0 ? "auto" : 0}
        >
          <DragOverFileInput
            fileTypePrefix={"image"}
            isDisabled={false}
            inputRef={fileInputRef}
            supportedFileTypes={["png", "webp", "jpg", "jpeg"]}
            openFileExplorer={() => {
              fileInputRef.current?.click()
            }}
            multiple
            {...handleChangeProps}
          />
        </Box>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} gap="1.5rem">
          {previews.map((preview) => (
            <PreviewImage
              key={preview.id}
              preview={preview}
              handleDeleteImage={handleDeleteImage}
            />
          ))}
        </SimpleGrid>
      </Box>
    </>
  )
}

function PreviewImage({
  handleDeleteImage,
  preview,
}: {
  handleDeleteImage: (file: PreviewFile) => void
  preview: PreviewFile
}) {
  return (
    <GridItem w="full" pos="relative">
      <Popover>
        <PopoverTrigger>
          <IconButton
            onClick={(e) => {
              if (preview.type === "file") {
                e.stopPropagation()
                handleDeleteImage(preview)
              }
            }}
            aria-label="delete"
            pos="absolute"
            rounded="1.5rem"
            bg="white"
            color="red.main"
            top="-1.25rem"
            right="1rem"
            w="2.5rem"
            h="2.5rem"
          >
            <IoTrash />
          </IconButton>
        </PopoverTrigger>
        <PopoverContent bg="white" px=".5rem" py=".5rem" rounded="1.2rem">
          <PopoverBody w="full">
            <Text fontSize="1.4rem" color="" fontWeight="500" mb="1.2rem">
              This image cannot be restored once you submit this form.
            </Text>
            <Flex w="full" gap="1.5rem">
              <PopoverCloseButton
                onClick={() => handleDeleteImage(preview)}
                pos="static"
                fontSize="1.2rem"
                fontWeight="600"
                lineHeight="2.4rem"
                color="red.main"
                bg="transparennt"
                px="1rem"
                py=".5rem"
                rounded="1rem"
                border="1px solid currentColor"
                h="unset"
                w="unset"
                _hover={{ bg: "#fe251b17" }}
              >
                Yes
              </PopoverCloseButton>
              <PopoverCloseButton
                pos="static"
                fontSize="1.2rem"
                fontWeight="600"
                lineHeight="2.4rem"
                color="gray.100"
                border="1px solid currentColor"
                bg="white"
                px="1rem"
                py=".5rem"
                rounded="1rem"
                h="unset"
                w="unset"
                _hover={{ bg: "gray.100", color: "white" }}
              >
                No
              </PopoverCloseButton>
            </Flex>
          </PopoverBody>
        </PopoverContent>
      </Popover>
      <Image
        alt=""
        src={preview.src}
        rounded="1.5rem"
        overflow="hidden"
        objectFit="cover"
        w="full"
        h="20rem"
      />
    </GridItem>
  )
}

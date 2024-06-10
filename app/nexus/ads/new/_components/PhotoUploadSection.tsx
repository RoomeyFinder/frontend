import { TimesIconSmall } from "@/app/_assets/SVG/TimesIcon"
import DragOverFileInput from "@/app/_components/DragOverFileInput"
import useHandleFilesUploadWithDragAndDrop from "@/app/_hooks/useHandleFilesUploadWithDragAndDrop"
import PhotosUploadSection from "@/app/ads/_components/PhotosUploadSection"
import {
  Box,
  Button,
  GridItem,
  Heading,
  IconButton,
  Image,
  SimpleGrid,
} from "@chakra-ui/react"
import { ChangeEventHandler, DragEvent, DragEventHandler, useRef } from "react"
import { IoCamera, IoTrash } from "react-icons/io5"

export default function PhotoUploadSection({
  previews,
  handleChangeProps,
}: {
  previews: {
    src: string
    id: string
  }[]
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
        {previews.length > 0 && (
          <Button
            isDisabled={previews.length >= 8}
            ml="auto"
            mb="2.5rem"
            variant="brand-secondary"
            onClick={() => fileInputRef.current?.click()}
          >
            <IoCamera /> Add More
          </Button>
        )}
        {previews.length === 0 && (
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
        )}
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} gap="1.5rem">
          {previews.map((preview) => (
            <GridItem w="full" key={preview.id} pos="relative">
              <IconButton
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
              <Image
                src={preview.src}
                rounded="1.5rem"
                overflow="hidden"
                objectFit="cover"
                w="full"
                h="20rem"
              />
            </GridItem>
          ))}
        </SimpleGrid>
      </Box>
    </>
  )
}

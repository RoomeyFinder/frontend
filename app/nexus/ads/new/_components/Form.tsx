import Stage from "@/app/signup/Stage"
import { Flex, Button, Box } from "@chakra-ui/react"
import BasicInfoSection from "./BasicInfoSection"
import DescriptionAndFeaturesSection from "./DescriptionAndFeaturesSection"
import PhotoUploadSection from "./PhotoUploadSection"
import { useMemo, useState } from "react"
import { Listing } from "@/app/_types/Listings"
import useHandleFilesUploadWithDragAndDrop from "@/app/_hooks/useHandleFilesUploadWithDragAndDrop"

export default function ListingForm({
  currentStage,
  goToNextStage,
  goToPrevStage,
  navigateToStage,
  uploadedPhotos = [],
}: {
  currentStage: number
  goToNextStage: () => void
  goToPrevStage: () => void
  navigateToStage: (stage: number) => void
  uploadedPhotos: Listing["photos"]
}) {
  const [photosToKeep, setPhotosToKeep] = useState(uploadedPhotos)
  const { files, removeFile, setFiles, ...rest } =
    useHandleFilesUploadWithDragAndDrop({
      maxFilesCount: 8,
    })
  const photosPreview = useMemo(() => {
    let preview: {
      src: string
      id: string
    }[] = []
    preview = [
      ...preview,
      ...files.map((photo) => ({
        src: URL.createObjectURL(photo),
        id: Math.random().toString(),
      })),
      ...photosToKeep.map((photo) => ({
        src: photo.secure_url,
        id: photo._id,
      })),
    ]
    return preview
  }, [files, photosToKeep])
  return (
    <>
      <Box w="full" my="auto">
        <Stage currentStage={currentStage} stage={0}>
          <PhotoUploadSection
            handleChangeProps={rest}
            previews={photosPreview}
          />
        </Stage>
        <Stage currentStage={currentStage} stage={1}>
          <BasicInfoSection />
        </Stage>
        <Stage currentStage={currentStage} stage={2}>
          <DescriptionAndFeaturesSection />
        </Stage>
      </Box>
      <Flex
        pos="sticky"
        bottom="0"
        justifyContent="space-between"
        mt="auto"
        pt="1.5rem"
        pb="2rem"
        w="full"
        bg="white"
      >
        {currentStage > 0 && (
          <Button
            onClick={() => goToPrevStage()}
            variant="brand-secondary"
            w="full"
            maxW="12rem"
          >
            Prev
          </Button>
        )}
        <Button
          variant="brand-secondary"
          bg="brand.main"
          color="white"
          _hover={{ filter: "brightness(105%)" }}
          ml="auto"
          w="full"
          maxW="12rem"
          onClick={() => {
            currentStage < 2 && goToNextStage()
          }}
        >
          {currentStage < 3 ? "Next" : "Done"}
        </Button>
      </Flex>
    </>
  )
}

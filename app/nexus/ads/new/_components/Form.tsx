import Stage from "@/app/signup/Stage"
import { Flex, Button, Box } from "@chakra-ui/react"
import BasicInfoSection from "./BasicInfoSection"
import DescriptionAndFeaturesSection from "./DescriptionAndFeaturesSection"
import PhotoUploadSection from "./PhotoUploadSection"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
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
  const [photosToKeep, setPhotosToKeep] = useState([...uploadedPhotos])
  const [photosToDelete, setPhotosToDelete] = useState<Listing["photos"]>([])
  const { files, removeFile, setFiles, ...rest } =
    useHandleFilesUploadWithDragAndDrop({
      maxFilesCount: 8,
    })
  const fileURLs = useRef(new Map())
  useEffect(() => {
    return () => {
      fileURLs.current.forEach((url) => URL.revokeObjectURL(url))
      fileURLs.current.clear()
    }
  }, [])
  const photosPreview = useMemo(() => {
    let preview: {
      src: string
      id: string
      index: number
      type: "file" | "url"
    }[] = []
    preview = [
      ...preview,
      ...files.map((photo, index) => {
        const url = fileURLs.current.get(photo) || URL.createObjectURL(photo)
        fileURLs.current.set(photo, url)
        return {
          src: url,
          id: Math.random().toString(),
          index,
          type: "file" as "file",
        }
      }),
      ...photosToKeep.map((photo, index) => ({
        src: photo.secure_url,
        id: photo._id,
        index,
        type: "url" as "url",
      })),
    ]
    return preview
  }, [files, photosToKeep])

  const handleDeleteImage = useCallback(
    (file: {
      src: string
      id: string
      index: number
      type: "file" | "url"
    }) => {
      if (file.type === "file") {
        const fileObj = files[file.index]
        const url = fileURLs.current.get(fileObj)
        URL.revokeObjectURL(url)
        fileURLs.current.delete(fileObj)
        removeFile(file.index)
      } else {
        const picToDelete = photosToKeep.find((it) => it._id === file.id)
        picToDelete &&
          setPhotosToDelete((prev) => [...(prev || []), picToDelete])
        setPhotosToKeep((prev) => prev.filter((it) => it._id !== file.id))
      }
    },
    [removeFile, fileURLs]
  )

  const isNextDisabled = useMemo(() => {
    if (currentStage === 0) return photosPreview.length <= 4
    // else if (currentStage === 1) return currentStage === 0
    else return currentStage !== 0
  }, [currentStage, photosPreview])

  return (
    <>
      <Box w="full" my={{ sm: "2rem" }}>
        <Stage currentStage={currentStage} stage={0}>
          <PhotoUploadSection
            handleChangeProps={rest}
            previews={photosPreview}
            handleDeleteImage={handleDeleteImage}
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
          isDisabled={isNextDisabled}
          bg="brand.main"
          color="white"
          _hover={{ filter: "brightness(105%)" }}
          ml="auto"
          w="full"
          maxW="12rem"
          boxShadow="lg"
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

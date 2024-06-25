import Stage from "@/app/signup/Stage"
import { Flex, Button, Box, VStack, HStack, Text } from "@chakra-ui/react"
import BasicInfoSection from "./BasicInfoSection"
import DescriptionAndFeaturesSection from "./DescriptionAndFeaturesSection"
import PhotoUploadSection from "./PhotoUploadSection"
import {
  ChangeEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import { Listing } from "@/app/_types/Listings"
import useHandleFilesUploadWithDragAndDrop from "@/app/_hooks/useHandleFilesUploadWithDragAndDrop"
import { getAddressComponents } from "@/app/_utils/google"
import toast from "react-hot-toast"
import { ProfileModal } from "@/app/nexus/me/_components/AccountSettingsModal"
import { useRouter } from "next/navigation"

export default function ListingForm({
  currentStage,
  goToNextStage,
  goToPrevStage,
  uploadedPhotos = [],
  listing,
  handleSubmit,
  isSubmitting,
  error,
  resetError,
  isSuccess,
  isCreate,
}: {
  currentStage: number
  handleSubmit: (data: any) => void
  goToNextStage: () => void
  goToPrevStage: () => void
  uploadedPhotos: Listing["photos"]
  listing?: Listing
  isSubmitting: boolean
  error: { message: string; statusCode: number }
  resetError: () => void
  isSuccess: boolean
  isCreate: boolean
}) {
  const router = useRouter()
  const [description, setDescription] = useState(listing?.description || "")
  const [features, setFeatures] = useState(listing?.features || [])

  const [location, setLocation] = useState<{ [x: string]: any }>({})
  const [isCheckingAddress, setIsCheckingAddress] = useState(false)
  const [listingInfo, setListingInfo] = useState({
    rentAmount: listing?.rentAmount || 0,
    rentDuration: listing?.rentDuration || ("" as Listing["rentDuration"]),
    numberOfBedrooms: listing?.numberOfBedrooms,
    apartmentType: listing
      ? listing.isStudioApartment
        ? "studio"
        : "bedroom"
      : "",
    currentOccupancyCount: listing?.currentOccupancyCount || 1,
    streetAddress: listing?.streetAddress || "",
    city: listing?.city || "",
    state: listing?.state || "",
    lookingFor: listing?.lookingFor || "",
  })

  console.log(listing?.state)
  console.log(listing?.city)
  const validateAddress = useCallback(async () => {
    setIsCheckingAddress(true)
    const response = await getAddressComponents({
      street: listingInfo.streetAddress,
      city: listingInfo.city,
      region: listingInfo.state,
    })
    setIsCheckingAddress(false)
    if (response.status !== "OK")
      return toast.error("Address could not be found.")
    setLocation(response.results[0].geometry.location)
    goToNextStage()
  }, [listingInfo, goToNextStage])

  const handleListingInfoChange: ChangeEventHandler<HTMLInputElement> =
    useCallback((e) => {
      setListingInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }, [])

  const listingInfoErrors = useMemo(() => {
    const { apartmentType, numberOfBedrooms, ...rest } = listingInfo
    const errors: { [x: string]: any } = {}
    let errorCount = 0
    Object.keys(rest).forEach((key) => {
      if (Boolean(rest[key as keyof typeof rest]) === false) {
        errors[key] = "This field is required!"
        errorCount += 1
      }
    })
    if (!apartmentType) {
      errorCount += 1
      errors.apartmentType = "This field is required"
    } else if (apartmentType === "bedroom" && !numberOfBedrooms) {
      errorCount += 1
      errors.numberOfBedrooms = "This field is required!"
    }
    return errorCount === 0 ? undefined : errors
  }, [listingInfo])

  const [photosToKeep, setPhotosToKeep] = useState([...uploadedPhotos])
  const [photosToDelete, setPhotosToDelete] = useState<Listing["photos"]>([])
  const { files, removeFile, setFiles, isUploading, ...rest } =
    useHandleFilesUploadWithDragAndDrop({
      maxFilesCount: 8 - photosToKeep.length,
    })
  const fileURLs = useRef(new Map())
  useEffect(() => {
    const fileUrlsCurrent = fileURLs.current
    return () => {
      fileUrlsCurrent.forEach((url) => URL.revokeObjectURL(url))
      fileUrlsCurrent.clear()
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
          type: "file" as const,
        }
      }),
      ...photosToKeep.map((photo, index) => ({
        src: photo.secure_url,
        id: photo._id,
        index,
        type: "url" as const,
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
    [removeFile, fileURLs, files, photosToKeep]
  )

  const isNextDisabled = useMemo(() => {
    if (currentStage === 0) return photosPreview.length <= 4
    else if (currentStage === 1) return listingInfoErrors !== undefined
    else
      return (
        description.trim().length < 50 ||
        description.trim().length > 1500 ||
        features.length < 10
      )
  }, [currentStage, photosPreview, listingInfoErrors, description, features])
  const finalSubmitData = useMemo(() => {
    return {
      ...listingInfo,
      location,
      files,
      photosToDelete,
      photosToKeep,
      description,
      features,
    }
  }, [
    location,
    files,
    photosToDelete,
    photosToKeep,
    description,
    features,
    listingInfo,
  ])
  useEffect(() => {
    if (isSuccess && features.length > 0) {
      setDescription("")
      setListingInfo({
        rentAmount: listing?.rentAmount || 0,
        rentDuration: listing?.rentDuration || ("" as Listing["rentDuration"]),
        numberOfBedrooms: listing?.numberOfBedrooms,
        apartmentType: listing
          ? listing.isStudioApartment
            ? "Studio"
            : "Bedroom"
          : "",
        currentOccupancyCount: listing?.currentOccupancyCount || 0,
        streetAddress: listing?.streetAddress || "",
        city: listing?.city || "",
        state: listing?.state || "",
        lookingFor: listing?.lookingFor || "",
      })
      setFiles([])
      setFeatures([])
    }
  }, [isSuccess, listing, setFiles, features])
  return (
    <>
      <Box
        w="full"
        as="form"
        onSubmit={(e) => {
          e.preventDefault()
          if (currentStage !== 2) return
          console.log(currentStage, "dkfjadjfkd")
          handleSubmit(finalSubmitData)
        }}
      >
        <Box w="full" my={{ sm: "2rem" }}>
          <Stage currentStage={currentStage} stage={0}>
            <PhotoUploadSection
              handleChangeProps={rest}
              previews={photosPreview}
              handleDeleteImage={handleDeleteImage}
            />
          </Stage>
          <Stage currentStage={currentStage} stage={1}>
            <BasicInfoSection
              listingInfo={listingInfo}
              handleChange={handleListingInfoChange}
            />
          </Stage>
          <Stage currentStage={currentStage} stage={2}>
            <DescriptionAndFeaturesSection
              description={description}
              handleDescriptionChange={(text) => setDescription(text)}
              selectedFeatures={features}
              handleFeaturesChange={(selection: string) => {
                setFeatures((prev) => {
                  if (prev.includes(selection))
                    return prev.filter((it) => it !== selection)
                  else return [...prev, selection]
                })
              }}
              isSubmitting={isSubmitting}
            />
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
              type="button"
              isDisabled={isSubmitting}
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
            type={currentStage === 2 ? "submit" : "button"}
            isLoading={isUploading || isCheckingAddress || isSubmitting}
            onClick={() => {
              if (currentStage === 1) validateAddress()
              else currentStage < 2 && goToNextStage()
            }}
          >
            {currentStage < 2 ? "Next" : "Done"}
          </Button>
        </Flex>
      </Box>
      <ProfileModal
        isOpen={error.statusCode > 0}
        onClose={() => resetError()}
        heading="Oops!"
      >
        <>
          <VStack alignItems="start" gap="2rem" mt="-1rem">
            <Text fontSize="1.6rem" color="gray.main">
              {error.message}
            </Text>
            <HStack gap="1.5rem" justifyContent="start">
              <Button
                type="button"
                fontSize="1.6rem"
                fontWeight="600"
                lineHeight="2.4rem"
                px="2rem"
                py="1rem"
                rounded="1rem"
                color="gray.100"
                border="1px solid currentColor"
                bg="white"
                h="unset"
                _hover={{ bg: "gray.100", color: "white" }}
                onClick={() => resetError()}
              >
                Ok
              </Button>
              {error.statusCode === 401 && (
                <Button
                  type="button"
                  variant="brand-secondary"
                  w="fit-content"
                  onClick={() => {
                    handleSubmit({ ...finalSubmitData, isDraft: true })
                    resetError()
                  }}
                >
                  Save as draft instead
                </Button>
              )}
            </HStack>
          </VStack>
        </>
      </ProfileModal>
      <ProfileModal
        isOpen={isSuccess}
        onClose={() => resetError()}
        heading="Done!"
      >
        <>
          <VStack alignItems="start" gap="2rem" mt="-1rem">
            <Text fontSize="1.6rem" color="gray.main">
              Ad {isCreate ? "created" : "edited"} successfully
            </Text>
            <HStack gap="1.5rem" justifyContent="start">
              <Button
                type="button"
                fontSize="1.6rem"
                fontWeight="600"
                lineHeight="2.4rem"
                px="2rem"
                py="1rem"
                rounded="1rem"
                color="brand.main"
                border="1px solid currentColor"
                bg="white"
                h="unset"
                _hover={{ bg: "gray.100", color: "white" }}
                variant="brand-secondary"
                w="fit-content"
                onClick={() => {
                  router.push("/nexus/ads")
                }}
              >
                View my ads
              </Button>
            </HStack>
          </VStack>
        </>
      </ProfileModal>
    </>
  )
}

"use client"
import {
  Box,
  Flex,
  GridItem,
  Heading,
  SimpleGrid,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  Text,
  VStack,
} from "@chakra-ui/react"
import { useCallback, useEffect, useState } from "react"
import useManageStageFlow from "@/app/_hooks/useManageStageFlow"
import ListingForm from "./Form"
import { Listing } from "@/app/_types/Listings"
import useAxios from "@/app/_hooks/useAxios"
import toast from "react-hot-toast"
import { useAppDispatch } from "@/app/_redux"
import { addOneListing } from "@/app/_redux/slices/listings.slice"

const steps = [
  { title: "Step 1", description: "Add photos" },
  { title: "Step 2", description: "Basic Info" },
  { title: "Step 3", description: "Describe your ad and add features" },
]

export default function ListingFormForCreateOrEdit({
  isCreate,
  listing,
}: {
  isCreate: boolean
  listing?: Listing
}) {
  const dispatch = useAppDispatch()
  const { fetchData, isFetching } = useAxios()
  const [isSuccess, setIsSuccess] = useState(false)
  const [, setPathToAdView] = useState("")
  const [error, setError] = useState({
    message: "",
    statusCode: 0,
  })
  const { goToNextStage, currentStage, goToPrevStage } = useManageStageFlow({
    maxStage: 3,
    start: 2,
    minStage: 0,
  })
  const handleSubmit = useCallback(
    async (
      data: Partial<Listing> & {
        photosToDelete: Listing["photos"]
        photosToKeep: Listing["photos"]
        location: { lat: number; lng: number }
        files: File[]
        apartmentType: "studio" | "bedroom"
        description: string
        features: string[]
        isDraft?: boolean
      }
    ) => {
      const formData = new FormData()
      const {
        location,
        files,
        photosToDelete,
        apartmentType,
        features,
        isDraft,
        photosToKeep,
        ...rest
      } = data
      const listingInfo = {
        ...(rest as any),
        country: "Nigeria",
        isStudioApartment: (apartmentType === "studio").toString(),
        longitude: location.lng,
        latitude: location.lat,
        isDraft: (listing?.isDraft || isDraft || false).toString(),
        isActivated: (listing?.isActivated || true).toString(),
      }
      Object.keys(listingInfo).forEach((key) => {
        const value = listingInfo[key as keyof typeof listingInfo]
        value && formData.set(key, value.toString())
      })
      features.forEach((feature) => formData.append("features", feature))
      files.forEach((file) => formData.append("photos", file))
      photosToKeep?.forEach((photo) =>
        formData.append("photosToKeep", JSON.stringify(photo))
      )
      photosToDelete?.forEach((photo) =>
        formData.append("photosToDelete", JSON.stringify(photo))
      )
      const response = await fetchData({
        url: isCreate ? "/listings" : `/listings/${listing?._id}`,
        method: isCreate ? "post" : "put",
        body: formData,
      })
      const successCode = isCreate ? 201 : 200
      if (response.statusCode === successCode) {
        toast.success(
          isCreate ? "Ad created successfully" : "Ad updated successfully",
          { duration: 3000 }
        )
        dispatch(addOneListing({ listing: response.listing, isNew: isCreate }))
        setIsSuccess(true)
        setPathToAdView(`/ads/${response.listing._id}`)
      } else {
        toast.error(
          response.message ||
            "Unable to complete request, something went wrong",
          { duration: 5000 }
        )
        setError({
          statusCode: response.statusCode,
          message: response.message || "Something went wrong!",
        })
      }
    },
    [isCreate, listing, fetchData, dispatch]
  )

  return (
    <SimpleGrid
      columns={12}
      h={{ sm: "calc(100vh - 9rem)" }}
      overflow="hidden"
      w="full"
      alignItems="center"
      px={{ base: "1.2rem", md: "3rem" }}
      gap="1.5rem"
      autoFlow={{ base: "row", sm: "column" }}
      pos="relative"
    >
      <GridItem
        pb={{ base: "2rem", sm: "0" }}
        pt={{ base: "4rem", sm: "0" }}
        colSpan={{ base: 12, sm: 2 }}
        h={{ sm: "full" }}
        my="auto"
        maxH={{ sm: "70rem" }}
        pos="sticky"
        top="0"
        pl={{ md: "" }}
      >
        <FormStepper currentStage={currentStage} />
      </GridItem>
      <GridItem
        // h="full"
        alignSelf="center"
        colSpan={{ base: 12, sm: 10 }}
        display="flex"
        flexDir="column"
        overflow="hidden"
        w="full"
        justifyContent="center"
      >
        <VStack
          w="full"
          pos="relative"
          h={{ base: "calc(100vh - 25rem)", sm: "calc(100vh - 9rem)" }}
          maxH={{ base: "70rem", sm: "85rem" }}
          overflow="auto"
          className="styled-scrollbar"
          pr={{ sm: "2rem", md: "8rem" }}
        >
          <Flex
            flexDir="column"
            mb={{ sm: "1rem" }}
            zIndex="10"
            bg="white"
            pos="sticky"
            pt={{ sm: "8%" }}
            top="0"
            w="full"
          >
            <Heading
              fontSize="3.2rem"
              fontWeight="500"
              textAlign="center"
              mb="1.2rem"
            >
              {isCreate ? "Create": "Edit"} Ad
            </Heading>
            <Text
              color="gray.main"
              fontSize="1.6rem"
              fontWeight="500"
              textAlign="center"
            >
              {steps[currentStage]?.description}
            </Text>
          </Flex>
          <ListingForm
            currentStage={currentStage}
            goToNextStage={goToNextStage}
            goToPrevStage={goToPrevStage}
            listing={listing}
            uploadedPhotos={listing?.photos || []}
            handleSubmit={handleSubmit}
            isSubmitting={isFetching}
            error={error}
            isSuccess={isSuccess}
            resetError={() => setError({ statusCode: 0, message: "" })}
            isCreate={isCreate}
          />
        </VStack>
      </GridItem>
    </SimpleGrid>
  )
}

function FormStepper({ currentStage }: { currentStage: number }) {
  const [stepOrientation, setStepOrientation] = useState<string | undefined>()

  useEffect(() => {
    if (window.innerWidth > 640) setStepOrientation("vertical")
    else setStepOrientation(undefined)
  }, [])

  const activeStepText = steps[currentStage].description
  return (
    <>
      <Stepper
        size="lg"
        orientation={stepOrientation as any}
        colorScheme="blue"
        index={currentStage}
        h="full"
      >
        {steps.map((step, index) => (
          <Step key={index}>
            <StepIndicator>
              <StepStatus
                complete={<StepIcon />}
                incomplete={<StepNumber />}
                active={<StepNumber />}
              />
            </StepIndicator>

            <Box flexShrink="0" display={{ base: "none", sm: "block" }}>
              <StepTitle>
                <Text
                  as="span"
                  w={{ base: "min-content", sm: "max-content" }}
                  fontSize={{ base: "1.4rem", sm: "1.6rem" }}
                >
                  {step.title}
                </Text>
              </StepTitle>
              <StepDescription>
                <Text
                  as="span"
                  display="block"
                  fontSize={{ base: "1.4rem" }}
                  maxW={{ sm: "13rem" }}
                >
                  {step.description}
                </Text>
              </StepDescription>
            </Box>

            <StepSeparator />
          </Step>
        ))}
      </Stepper>
      <Text mt="1.5rem" fontSize={{ base: "1.8rem" }} display={{ sm: "none" }}>
        Step {currentStage + 1}:{" "}
        <Text as="b" fontWeight="600">
          {activeStepText}
        </Text>
      </Text>
    </>
  )
}

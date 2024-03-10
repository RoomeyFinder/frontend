"use client"
import useHandleFilesUploadWithDragAndDrop from "@/app/_hooks/useHandleFilesUploadWithDragAndDrop"
import PhotosUploadSection from "./PhotosUploadSection"
import { VStack, Heading, Flex } from "@chakra-ui/react"
import {
  FormEventHandler,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react"
import FormDetailsSection from "./FormDetailsSection"
import PhotosPreviewSection from "./PhotosPreviewSection"
import { Listing } from "@/app/_types/Listings"
import { fetchLatLng, fetchZipCode } from "@/app/_utils"
import useAxios from "@/app/_hooks/useAxios"
import useAppToast from "@/app/_hooks/useAppToast"
import { useRouter } from "next/navigation"
import { PreviewablePhoto } from "@/app/_types"
import { ListingsContext } from "@/app/_providers/ListingsProvider"

const initialListingState: Listing = {
  photos: [],
  rentDuration: "",
  lookingFor: "",
  isStudioApartment: false,
  numberOfBedrooms: 0,
  streetAddress: "",
  apartmentType: "",
  city: "",
  state: "",
  country: "",
  rentAmount: 0,
  currentOccupancyCount: 0,
  description: "",
  viewsCount: "",
  likesCount: 0,
  features: [],
  isActive: false,
  isDraft: false,
}
export default function ListingForm({
  edit,
}: {
  edit: boolean
  listingId: string | null
}) {
  const router = useRouter()
  const { updateListings, listings } = useContext(ListingsContext)
  const toast = useAppToast()
  const { fetchData } = useAxios()
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [isSavingDraft, setIsSavingDraft] = useState(false)
  const [isSavingListing, setIsSavingListing] = useState(false)

  const {
    dragActive,
    handleDragEnter,
    handleChange,
    handleDragLeave,
    handleDragOver,
    handleDrop,
    openFileExplorer,
    hasReachedUploadLimit,
    files,
    removeFile,
  } = useHandleFilesUploadWithDragAndDrop({
    inputRef,
    maxFilesCount: 5,
    maxFileSizeInMegaBytes: 4,
  })
  const previewFiles = useMemo<PreviewablePhoto[]>(
    () => [
      ...files.map((file, index) => ({
        file,
        preview: URL.createObjectURL(file),
        id: Math.random().toString(),
        _id: Math.random().toString(),
        index,
      })),
    ],
    [files]
  )
  const [listingData, setListingData] = useState<Listing>(initialListingState)
  const [locationPlaceId, setLocationPlaceId] = useState("")
  const [features, setFeatures] = useState<Listing["features"]>([])

  const handleListingDataChange = useCallback(
    (name: keyof typeof listingData, value: any) => {
      setListingData((prev) => ({ ...prev, [name]: value }))
    },
    []
  )

  const hasEdits = useMemo(() => {
    return files.length > 0 ||
      listingData.lookingFor.length > 0 ||
      listingData.apartmentType?.length ||
      listingData.streetAddress.length > 0 ||
      listingData.isStudioApartment ||
      +listingData.numberOfBedrooms > 0 ||
      listingData.description.length > 0 ||
      +listingData.rentAmount > 0 ||
      Number(listingData.currentOccupancyCount) > 0 ||
      features.length > 0
      ? true
      : false
  }, [files, listingData, features])

  const canBeSubmitted = useMemo(() => {
    return files.length > 0 &&
      listingData.apartmentType &&
      listingData.streetAddress.length > 0 &&
      (listingData.isStudioApartment || +listingData.numberOfBedrooms > 0) &&
      listingData.description.length > 0 &&
      +listingData.rentAmount > 0 &&
      typeof Number(listingData.currentOccupancyCount) === "number" &&
      !isNaN(Number(listingData.currentOccupancyCount))
      ? true
      : false
  }, [listingData, files])

  const uploadListing = useCallback(
    async (isDraft: boolean) => {
      if (!isDraft && files.length < 3)
        return toast({
          status: "error",
          title: "At least 3 photos are required",
        })
      if ((isDraft === false && !canBeSubmitted) || isSavingDraft) return
      let body: { [x: string]: any } = {
        ...listingData,
        isDraft,
      }
      const formData = new FormData()
      if (locationPlaceId) {
        const { lat: latitude, lng: longitude } =
          await fetchLatLng(locationPlaceId)
        const zipcode = await fetchZipCode(locationPlaceId)
        body = { ...body, latitude, longitude, zipcode }
      }
      for (const key in body) {
        formData.set(key, body[key])
      }
      formData.set("isActive", (isDraft === false).toString())
      formData.set("isDrag", isDraft.toString())
      features.forEach((feature) =>
        formData.append("features", JSON.stringify(feature))
      )
      files.forEach((file) => formData.append("photos", file))
      if (isDraft) setIsSavingDraft(true)
      else setIsSavingListing(true)
      const res = await fetchData({
        url: "/listings",
        method: "post",
        body: formData,
      })
      if (res.statusCode === 201) {
        setListingData(initialListingState)
        toast({
          status: "success",
          title: isDraft ? "Draft saved!" : "Ad created successfully",
        })
        if (isDraft)
          updateListings({
            ...(listings || {}),
            drafts: [...(listings?.drafts || []), res.listing],
          } as any)
        else
          updateListings({
            ...(listings || {}),
            active: [...(listings?.active || []), res.listing],
          } as any)
        router.push(isDraft ? "/my-ads?filter=drafts" : "/my-ads?filter=active")
      } else {
        toast({
          title: res.message,
          status: "error",
        })
      }
      setIsSavingDraft(false)
      setIsSavingListing(false)
    },
    [
      canBeSubmitted,
      locationPlaceId,
      listingData,
      files,
      fetchData,
      isSavingDraft,
      isSavingListing,
      features,
      updateListings,
      listings,
      router,
      toast,
    ]
  )

  const handleSubmit: FormEventHandler = useCallback(
    (e) => {
      e.preventDefault()
      uploadListing(false)
    },
    [uploadListing]
  )

  return (
    <>
      <VStack
        alignItems="start"
        py="3rem"
        gap="4rem"
        w="95dvw"
        mx="auto"
        overflowX="hidden"
        as="form"
        onSubmit={handleSubmit}
        maxW={{ lg: "45%" }}
      >
        <Heading variant="large">{edit ? "Edit Ad" : "Create Ad"}</Heading>
        <Flex
          justifyContent="start"
          w="full"
          flexDir={{ base: "column", sm: "row", lg: "column" }}
          alignItems={{ base: "center", sm: "end", lg: "start" }}
          gap="4rem"
        >
          <Flex w="max-content" shrink="0">
            <PhotosUploadSection
              dragActive={dragActive}
              handleDragEnter={handleDragEnter}
              handleChange={handleChange}
              handleDragLeave={handleDragLeave}
              handleDragOver={handleDragOver}
              handleDrop={handleDrop}
              inputRef={inputRef}
              openFileExplorer={openFileExplorer}
              isDisabled={hasReachedUploadLimit}
            />
          </Flex>
          <PhotosPreviewSection removeFile={removeFile} files={previewFiles} />
        </Flex>
        <FormDetailsSection
          saveAsDraft={() => uploadListing(true)}
          listingData={listingData}
          handleChange={handleListingDataChange}
          features={features}
          addFeature={(item) => setFeatures((prev = []) => [...prev, item])}
          removeFeature={(item) =>
            setFeatures((prev) =>
              prev?.filter((val) => val.value !== item.value)
            )
          }
          updateLocationPlaceId={(placeId) => setLocationPlaceId(placeId)}
          canBeSubmitted={canBeSubmitted}
          hasEdits={hasEdits}
          isSavingDraft={isSavingDraft}
          isSavingListing={isSavingListing}
        />
      </VStack>
    </>
  )
}

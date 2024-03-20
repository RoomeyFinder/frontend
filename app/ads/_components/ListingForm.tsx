"use client"
import useHandleFilesUploadWithDragAndDrop from "@/app/_hooks/useHandleFilesUploadWithDragAndDrop"
import PhotosUploadSection from "./PhotosUploadSection"
import { VStack, Heading, Flex, list } from "@chakra-ui/react"
import {
  FormEventHandler,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import FormDetailsSection from "./FormDetailsSection"
import PhotosPreviewSection from "./PhotosPreviewSection"
import { Listing } from "@/app/_types/Listings"
import { fetchLatLng, fetchZipCode } from "@/app/_utils"
import useAxios, { FetchOptions } from "@/app/_hooks/useAxios"
import useAppToast from "@/app/_hooks/useAppToast"
import { useRouter } from "next/navigation"
import { PreviewablePhoto } from "@/app/_types"
import { ListingsContext } from "@/app/_providers/ListingsProvider"
import AdLimitModal from "@/app/_components/AdLimitModal"

const initialListingState: Listing = {
  photos: [],
  rentDuration: "",
  lookingFor: "",
  isStudioApartment: false,
  numberOfBedrooms: 0,
  streetAddress: "",
  city: "",
  state: "",
  country: "",
  rentAmount: 0,
  currentOccupancyCount: 0,
  description: "",
  viewsCount: "",
  likesCount: 0,
  features: [],
  isActivated: false,
  isDraft: false,
}
export default function ListingForm({
  edit,
  listing,
}: {
  edit: boolean
  listing?: Listing
}) {
  const router = useRouter()
  useEffect(() => {
    if (edit && !listing) router.back()
  }, [edit, listing])
  const { updateListing, listings, addNewListing } = useContext(ListingsContext)
  const [showAdLimitModal, setShowAdLimitModal] = useState(false)
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
  const [photosToDelete, setPhotosToDelete] = useState<Listing["photos"]>([])
  const [photosToKeep, setPhotosToKeep] = useState<Listing["photos"]>(
    listing?.photos || []
  )
  const previewFiles = useMemo<PreviewablePhoto[]>(
    () =>
      [
        ...files.map((file, index) => ({
          file,
          preview: URL.createObjectURL(file),
          id: Math.random().toString(),
          _id: Math.random().toString(),
          index,
        })),
        ...(edit && listing
          ? (photosToKeep || []).map((photo, index) => ({
              photo,
              preview: photo.secure_url,
              id: photo._id,
              _id: photo._id,
              index,
            }))
          : []),
      ].map((it, index) => ({ ...it, index })),
    [files, photosToKeep, edit, listing]
  )
  const [listingData, setListingData] = useState<Listing>(
    edit ? () => ({ ...listing }) as Listing : initialListingState
  )
  const [locationPlaceId, setLocationPlaceId] = useState("")
  const [features, setFeatures] = useState<Listing["features"]>(
    edit ? listing?.features || [] : []
  )

  const handleListingDataChange = useCallback(
    (name: keyof typeof listingData, value: any) => {
      setListingData((prev) => ({ ...prev, [name]: value }))
    },
    []
  )

  const hasEdits = useMemo(() => {
    return files.length > 0 ||
      Number(listingData.lookingFor?.length) > 0 ||
      Number(listingData.streetAddress?.length) > 0 ||
      listingData.isStudioApartment ||
      Number(listingData.numberOfBedrooms) > 0 ||
      Number(listingData.description?.length) > 0 ||
      Number(listingData.rentAmount) > 0 ||
      Number(listingData.currentOccupancyCount) > 0 ||
      Number(features?.length) > 0
      ? true
      : false
  }, [files, listingData, features])

  const canBeSubmitted = useMemo(() => {
    return (edit
      ? Number(photosToKeep?.length) > 0 || files.length > 0
      : files.length > 0) &&
      Number(listingData.streetAddress?.length) > 0 &&
      (listingData.isStudioApartment ||
        Number(listingData.numberOfBedrooms) > 0) &&
      Number(listingData.description?.length) > 0 &&
      Number(listingData.rentAmount) > 0 &&
      Number(listingData.lookingFor?.length) > 0 &&
      typeof Number(listingData.currentOccupancyCount) === "number" &&
      !isNaN(Number(listingData.currentOccupancyCount))
      ? true
      : false
  }, [listingData, files, edit, listing, photosToKeep?.length])

  const getFormDataForEditedListing = useCallback(
    async (isDraft: boolean) => {
      let body: { [x: string]: any } = {
        ...listingData,
        isDraft,
        longitude: listingData.location?.coordinates?.[0],
        latitude: listingData.location?.coordinates?.[1],
      }
      const formData = new FormData()
      if (locationPlaceId) {
        const { lat: latitude, lng: longitude } =
          await fetchLatLng(locationPlaceId)
        const zipcode = await fetchZipCode(locationPlaceId)
        body = { ...body, latitude, longitude, zipcode }
      }
      for (const key in body) {
        if (key !== "features" && key !== "photos") formData.set(key, body[key])
      }
      formData.set("isActivated", (isDraft === false).toString())
      formData.set("isDraft", isDraft.toString())
      features?.forEach((feature) => {
        formData.append("features", JSON.stringify(feature))
      })
      photosToDelete?.forEach((photo) =>
        formData.append("photosToDelete", JSON.stringify(photo))
      )
      files.forEach((file: string | Blob) => formData.append("photos", file))
      return formData
    },
    [
      files,
      listingData,
      previewFiles,
      photosToDelete,
      photosToKeep,
      features,
      locationPlaceId,
    ]
  )

  const getFormDataForNewListing = useCallback(
    async (isDraft: boolean) => {
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
      formData.set("isActivated", (isDraft === false).toString())
      formData.set("isDraft", isDraft.toString())
      features?.forEach((feature) =>
        formData.append("features", JSON.stringify(feature))
      )
      files.forEach((file: string | Blob) => formData.append("photos", file))
      return formData
    },
    [files, listingData, features, locationPlaceId]
  )

  const uploadListing = useCallback(
    async (isDraft: boolean) => {
      if (!isDraft && files.length + Number(photosToKeep?.length) < 3)
        return toast({
          status: "error",
          title: "At least 3 photos are required",
        })
      if (previewFiles.length > 10)
        return toast({
          status: "error",
          title: "A maximum 10 photos is allowed",
        })
      if ((isDraft === false && !canBeSubmitted) || isSavingDraft) return
      if (isDraft) setIsSavingDraft(true)
      else setIsSavingListing(true)
      let body
      if (edit === false) body = await getFormDataForNewListing(isDraft)
      else body = await getFormDataForEditedListing(isDraft)
      console.log(body.get("isDraft"), body.get("isActivated"), isDraft)
      // return
      const requestOptions: FetchOptions = {
        url: edit === true ? `/listings/${listing?._id}` : "/listings",
        method: edit === true ? `put` : "post",
        body,
      }
      const res = await fetchData(requestOptions)
      if (res.statusCode === 201 || res.statusCode === 200) {
        setListingData(initialListingState)
        toast({
          status: "success",
          title:
            res.message ||
            (isDraft ? "Draft saved!" : "Ad created successfully"),
        })
        res.statusCode === 200
          ? updateListing(res.listing)
          : addNewListing(res.listing)
        router.push(isDraft ? "/ads?filter=drafts" : "/ads?filter=active")
      } else if (res.statusCode === 403) {
        setShowAdLimitModal(true)
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
      updateListing,
      listings,
      router,
      toast,
      previewFiles,
      edit,
      photosToKeep,
      getFormDataForEditedListing,
      getFormDataForNewListing,
      listing?._id,
      addNewListing,
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
          <PhotosPreviewSection
            removeFile={(idx) => {
              const currentFile = previewFiles[idx].photo
              if (typeof currentFile?.secure_url === "string") {
                setPhotosToDelete((prev) => [...(prev || []), currentFile])
                setPhotosToKeep((prev) =>
                  prev?.filter(
                    (photo) => photo.secure_url !== currentFile?.secure_url
                  )
                )
              } else removeFile(idx)
            }}
            files={previewFiles}
          />
        </Flex>
        <FormDetailsSection
          saveAsDraft={() => !isSavingListing && uploadListing(true)}
          listingData={listingData}
          handleChange={handleListingDataChange}
          features={features || []}
          addFeature={(item) => setFeatures((prev = []) => [...prev, item])}
          removeFeature={(item) =>
            setFeatures((prev) =>
              prev?.filter((val) => val.value !== item.value)
            )
          }
          updateLocationPlaceId={(placeId) => setLocationPlaceId(placeId)}
          canBeSubmitted={
            (JSON.stringify(listing) !== JSON.stringify(listingData) ||
              JSON.stringify(listing?.features) !== JSON.stringify(features) ||
              listing?.photos?.length !== photosToKeep?.length ||
              files.length >= 3) &&
            canBeSubmitted &&
            !isSavingDraft
          }
          hasEdits={
            (JSON.stringify(listing) !== JSON.stringify(listingData) ||
              JSON.stringify(listing?.features) !== JSON.stringify(features) ||
              listing?.photos?.length !== photosToKeep?.length ||
              files.length > 0) &&
            hasEdits
          }
          isSavingDraft={isSavingDraft}
          isSavingListing={isSavingListing}
        />
      </VStack>
      <AdLimitModal
        show={showAdLimitModal}
        onClose={() => setShowAdLimitModal(false)}
      />
    </>
  )
}

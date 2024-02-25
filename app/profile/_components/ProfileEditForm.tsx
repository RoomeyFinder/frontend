import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  InputGroup,
  Text,
  Textarea,
} from "@chakra-ui/react"
import {
  FormEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import useHandleFilesUploadWithDragAndDrop from "../../_hooks/useHandleFilesUploadWithDragAndDrop"
import PhoneNumberInput from "../../_components/PhoneNumberInput"
import DobInput from "../../_components/DobInput"
import AddressInput from "../../_components/AddressInput"
import SearchableInput from "../../_components/SearchableInput"
import OccupationOrUniversityInput from "../../_components/OccupationOrUniversityInput"
import PhotosUploadSection from "./PhotosUploadSection"
import LifestyleInput from "./LifestyleInput"
import User from "../../_types/User"
import ProfilePhotoInput from "./ProfilePhotoInput"
import LinkToProfileSettings from "./LinkToProfileSettings"
import InputLabel from "../../_components/InputLabel"
import { PreviewablePhoto } from "../../_types"
import useAxios from "../../_hooks/useAxios"
import useAppToast from "../../_hooks/useAppToast"
import useWarnBeforeExit from "../../_hooks/useWarnBeforeExit"

export default function ProfileEditForm({
  userData,
  updateUser,
}: {
  userData: User
  updateUser: (data: User) => void
}) {
  const toast = useAppToast()
  const updatePendingUpdateData = useCallback(
    (update: {
      existingPhotos?: User["photos"]
      updatedUserData?: User
      lifestyleTags?: { value: string; category: string }[]
      files?: File[]
    }) => {
      let pendingUpdateData = localStorage.getItem("pendingUpdateData") || "{}"
      if (pendingUpdateData) {
        pendingUpdateData = JSON.parse(pendingUpdateData)
        let upd = { ...(pendingUpdateData as any), ...update }
        localStorage.setItem("pendingUpdateData", JSON.stringify(upd))
      }
    },
    []
  )
  const { isFetching, fetchData } = useAxios()
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [profileImage, setProfileImage] = useState<File | undefined>()
  const {
    files,
    openFileExplorer,
    handleChange,
    handleDragOver,
    handleDrop,
    handleDragLeave,
    handleDragEnter,
    removeFile,
    dragActive,
    isMaximumCount,
    setFiles,
  } = useHandleFilesUploadWithDragAndDrop(inputRef, 4 - userData.photos.length)
  const [existingPhotos, setExistingPhotos] = useState(userData.photos)
  const [showMobilePhotosUploader, setShowMobilePhotosUploader] =
    useState(false)
  const [updatedUserData, setUpdatedUserData] = useState<User>(userData)
  const removePhoto = useCallback(
    (url: string, fileName: string, _id?: string) => {
      if (url && url.startsWith("blob:")) {
        URL.revokeObjectURL(url)
        removeFile(fileName)
      } else {
        const updatedExistingPhotos = existingPhotos.filter(
          (it) => it.secure_url !== url
        )
        setExistingPhotos(updatedExistingPhotos)
        updatePendingUpdateData({ existingPhotos: updatedExistingPhotos })
      }
    },
    [existingPhotos, updatePendingUpdateData]
  )
  const previewFiles = useMemo<PreviewablePhoto[]>(
    () => [
      ...existingPhotos.map((photo) => ({
        file: null,
        preview: photo?.secure_url,
        id: photo?.id,
        _id: photo?._id,
      })),
      ...files.map((file) => ({
        file,
        preview: URL.createObjectURL(file),
        id: Math.random().toString(),
        _id: Math.random().toString(),
      })),
    ],
    [existingPhotos, files]
  )
  const [lifestyleTags, setLifestyleTags] = useState<User["lifestyleTags"]>(
    userData.lifestyleTags || []
  )

  const handleInputChange = useCallback(
    (name: string, value: string | boolean) => {
      const update = { ...updatedUserData, [name]: value }
      setUpdatedUserData(update)
      updatePendingUpdateData({ updatedUserData: update })
    },
    [updatedUserData, updatePendingUpdateData]
  )

  const handleSelectLifestyleTag = useCallback(
    (item: { value: string; category: string }) => {
      const update = [...(lifestyleTags || []), item]
      setLifestyleTags(update)
      updatePendingUpdateData({ lifestyleTags: update })
    },
    [lifestyleTags, updatePendingUpdateData]
  )

  useEffect(() => {
    const pendingUpdateData = localStorage.getItem("pendingUpdateData")
    if (pendingUpdateData) {
      const data = JSON.parse(pendingUpdateData)
      if (data) {
        setUpdatedUserData(data.updatedUserData || { ...userData })
        setLifestyleTags(data.lifestyleTags || userData.lifestyleTags || [])
        setExistingPhotos(data.existingPhotos || userData.photos || [])
        setFiles(data.files || [])
      }
    }
  }, [userData])

  const formHasChanges = useMemo(() => {
    const {
      isStudent: userDataIsStudent,
      occupation: userDataOccupation,
      school: userDataSchool,
      ...restOfUserData
    } = userData
    const {
      isStudent: updatedUserDataIsStudent,
      occupation: updatedUserDataOccupation,
      school: updatedUserDataSchool,
      ...restOfUpdatedUserData
    } = updatedUserData
    const hasUpdatedUserData =
      updatedUserDataIsStudent !== userDataIsStudent ||
      // updatedUserDataIsStudent !== userDataIsStudent
      userDataSchool !== updatedUserDataSchool ||
      userDataOccupation !== updatedUserDataOccupation
    //  ||
    JSON.stringify(restOfUserData) !== JSON.stringify(restOfUpdatedUserData)
    const hasUpdatedFiles = files.length > 0
    const hasUpdatedExistingPhotos =
      userData.photos.length !== existingPhotos.length
    const hasUpdatedLifestyleTags =
      userData.lifestyleTags !== undefined &&
      lifestyleTags?.length !== userData.lifestyleTags.length
    const hasUpdatedProfileImage = profileImage !== undefined

    return hasUpdatedFiles ||
      hasUpdatedLifestyleTags ||
      hasUpdatedExistingPhotos ||
      hasUpdatedProfileImage ||
      hasUpdatedUserData
      ? true
      : false
  }, [
    files,
    userData?.photos.length,
    existingPhotos.length,
    profileImage,
    userData,
    updatedUserData,
    lifestyleTags,
  ])

  useWarnBeforeExit(formHasChanges, () =>
    localStorage.removeItem("pendingUpdateData")
  )

  const canBeSubmtted = useMemo(() => {
    return updatedUserData.currentAddress.length > 0 &&
      updatedUserData.firstName.length > 0 &&
      updatedUserData.lastName.length > 0 &&
      (updatedUserData.isStudent
        ? updatedUserData.school.length > 0
        : updatedUserData.occupation.length > 0) &&
      updatedUserData.gender.length > 0 &&
      updatedUserData.dob.length > 0
      ? true
      : false
  }, [updatedUserData])

  const handleSubmit: FormEventHandler = useCallback(
    async (e) => {
      e.preventDefault()
      if (formHasChanges === false) {
        toast.closeAll()
        toast({ status: "info", title: "No changes to save" })
      }
      const body = new FormData()
      for (const key in updatedUserData) {
        if (
          key !== "lifestyleTags" &&
          key !== "photos" &&
          key !== "profileImage"
        )
          body.set(
            key,
            updatedUserData[key as keyof typeof updatedUserData] as any
          )
      }
      if (profileImage) body.set("profileImage", profileImage)
      if (lifestyleTags?.length)
        lifestyleTags?.forEach((tag) => {
          body.append("lifestyleTags", JSON.stringify(tag))
        })
      files.forEach((file) => {
        body.append("newPhotos", file)
      })
      existingPhotos.forEach((photo) => {
        body.append("photosToKeep", JSON.stringify(photo))
      })
      userData.photos
        .filter(
          (it) => JSON.stringify(existingPhotos).includes(it._id) === false
        )
        .forEach((photo) => {
          body.set("photosToDelete", JSON.stringify(photo))
        })
      const res = await fetchData({
        url: `/users/${userData._id}`,
        method: "put",
        body,
      })
      if (res.statusCode === 200) {
        toast({ title: "Saved successfully", status: "success" })
        localStorage.removeItem("pendingUpdateData")
        updateUser(res.user)
        setUpdatedUserData(res.user)
        setLifestyleTags(res.user.lifestyleTags)
        setExistingPhotos(res.user.photos)
        setFiles([])
        setProfileImage(undefined)
      } else toast({ status: "error", title: res.message })
    },
    [
      profileImage,
      updatedUserData,
      lifestyleTags,
      files,
      existingPhotos,
      formHasChanges,
    ]
  )

  return (
    <Flex
      flexDir="column"
      alignItems="start"
      gap="5rem"
      w={{ base: "90%", lg: "80%" }}
      mx="auto"
      py="5rem"
      as="form"
      onSubmit={handleSubmit}
    >
      <Flex
        gap={{ base: 0, md: "5rem" }}
        alignItems="start"
        position="relative"
        transition="all 250ms linear"
        w="full"
      >
        <Flex
          transition="all 250ms linear"
          gap={{ base: "2rem", md: "3rem" }}
          overflow="hidden"
          w={{ base: showMobilePhotosUploader ? ".001px" : "auto", md: "auto" }}
          h={{ base: showMobilePhotosUploader ? ".001px" : "auto", md: "auto" }}
          flexDir="column"
          flexGrow={{ base: showMobilePhotosUploader ? 0 : 1, md: 1 }}
          position="relative"
        >
          <ProfilePhotoInput
            placeholder={userData.profileImage?.secure_url}
            name={updatedUserData.firstName}
            file={profileImage}
            updateFile={async (f) => setProfileImage(f)}
            toggleShowAdditionalPhotos={() =>
              setShowMobilePhotosUploader((prev) => !prev)
            }
          />

          <Heading variant="md" textAlign={{ base: "center", md: "left" }}>
            Personal info
          </Heading>

          <InputGroup flexGrow="1" flexDir="column">
            <InputLabel>Full name</InputLabel>
            <Flex gap="4%" flexGrow="1">
              <Input
                flexBasis="48%"
                placeholder="First name"
                name="firstName"
                onChange={(e) =>
                  handleInputChange(e.target.name, e.target.value)
                }
                value={updatedUserData.firstName}
              />
              <Input
                flexBasis="48%"
                placeholder="Last name"
                name="lastName"
                onChange={(e) =>
                  handleInputChange(e.target.name, e.target.value)
                }
                value={updatedUserData.lastName}
              />
            </Flex>
          </InputGroup>

          <Flex flexGrow="1" flexDir="column">
            <InputLabel>Phone number</InputLabel>
            <PhoneNumberInput
              phoneNumber={updatedUserData.phoneNumber}
              error={[]}
              isDisabled={true}
              handleCountryCodeChange={(update) => {
                handleInputChange("countryCode", update)
              }}
              handlePhoneNumberChange={(update) => {
                handleInputChange("phoneNumber", update)
              }}
            />
          </Flex>

          <InputGroup flexGrow="1" flexDir="column">
            <InputLabel>Email address</InputLabel>
            <Input
              placeholder="Email address"
              readOnly
              isDisabled
              value={updatedUserData.email}
            />
          </InputGroup>

          <Flex flexGrow="1" flexDir="column">
            <InputLabel>Date of birth</InputLabel>
            <DobInput
              inputVariant="base"
              value={updatedUserData.dob}
              handleChange={(update) => {
                handleInputChange("dob", update)
              }}
              errorProps={{}}
            />
          </Flex>

          <Flex flexGrow="1" flexDir="column">
            <InputLabel>Gender</InputLabel>
            <SearchableInput
              inputVariant="base"
              handleChange={(selection) => {
                handleInputChange("gender", selection)
              }}
              value={updatedUserData.gender}
              errorProps={{}}
              options={["male", "female"]}
              inputName="gender"
              inputPlaceholder="Gender"
            />
          </Flex>

          <Flex flexGrow="1" flexDir="column">
            <InputLabel>Occupation</InputLabel>
            <OccupationOrUniversityInput
              columns={1}
              spacing={3}
              isStudent={updatedUserData.isStudent}
              inputVariant="base"
              inputName={updatedUserData.isStudent ? "school" : "occupation"}
              inputValue={
                updatedUserData.isStudent
                  ? updatedUserData.school
                  : updatedUserData.occupation
              }
              handleChange={(inputName, newValue) => {
                handleInputChange(inputName, newValue)
              }}
              errors={[]}
              toggleIsStudent={(update) => {
                handleInputChange("isStudent", update)
              }}
            />
          </Flex>

          <Flex flexGrow="1" flexDir="column">
            <InputLabel>Address</InputLabel>
            <AddressInput
              inputVariant="base"
              errorProps={{}}
              handleSelection={(option) => {
                handleInputChange("currentAddress", option.description)
              }}
              value={updatedUserData.currentAddress}
              reset={() => handleInputChange("currentAddress", "")}
            />
          </Flex>

          <InputGroup flexGrow="1" flexDir="column">
            <InputLabel>
              Lifestyle{" "}
              <Text as="small" fontSize="1.3rem" color="gray.100">
                Maximum of 10
              </Text>
            </InputLabel>
            <LifestyleInput
              handleSelectItem={handleSelectLifestyleTag}
              selectedItems={lifestyleTags || []}
              handleRemoveItem={(item) => {
                const updatedLifestyleTags = lifestyleTags?.filter(
                  (it) => it.value.toLowerCase() !== item.value.toLowerCase()
                )
                setLifestyleTags(updatedLifestyleTags)
                updatePendingUpdateData({ lifestyleTags: updatedLifestyleTags })
              }}
            />
          </InputGroup>

          <InputGroup flexGrow="1" flexDir="column">
            <InputLabel>About you</InputLabel>
            <Textarea
              value={updatedUserData.about}
              name="about"
              onChange={(e) => handleInputChange(e.target.name, e.target.value)}
              h="30rem"
              resize="none"
              p="2rem"
              fontSize={{ base: "1.6rem", md: "1.9rem" }}
              rounded="1.2rem"
              placeholder="About me"
            />
          </InputGroup>

          <Button
            isDisabled={!formHasChanges || !canBeSubmtted}
            isLoading={isFetching}
            loadingText={"Saving..."}
            type="submit"
            variant="brand-secondary"
            maxW="18.5rem"
          >
            Save Changes
          </Button>
        </Flex>

        <PhotosUploadSection
          removeFile={removePhoto}
          toggleShow={() => setShowMobilePhotosUploader(false)}
          show={showMobilePhotosUploader}
          dragActive={dragActive}
          handleDragOver={handleDragOver}
          handleDrop={handleDrop}
          handleDragLeave={handleDragLeave}
          handleDragEnter={handleDragEnter}
          handleChange={handleChange}
          inputRef={inputRef}
          openFileExplorer={openFileExplorer}
          photos={previewFiles}
          isDisabled={isMaximumCount}
        />
      </Flex>

      <Box
        display={{
          base: !showMobilePhotosUploader ? "block" : "none",
          md: "block",
        }}
      >
        <LinkToProfileSettings />
      </Box>
    </Flex>
  )
}

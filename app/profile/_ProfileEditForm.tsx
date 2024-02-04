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
import { useCallback, useRef, useState } from "react"
import useHandleFilesUploadWithDragAndDrop from "../_hooks/useHandleFilesUploadWithDragAndDrop"
import PhoneNumberInput from "../_components/PhoneNumberInput"
import DobInput from "../_components/DobInput"
import AddressInput from "../_components/AddressInput"
import SearchableInput from "../_components/SearchableInput"
import OccupationOrUniversityInput from "../_components/OccupationOrUniversityInput"
import PhotosUploadSection from "./PhotosUploadSection"
import LifestyleInput from "./_LifestyleInput"
import User from "../_types/User"
import ProfilePhotoInput from "./_ProfilePhotoInput"
import ProfileSettingsButton from "./_ProfileSettingsButton"
import InputLabel from "../_components/InputLabel"

export default function ProfileEditForm({ userData }: { userData: User }) {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const {
    files,
    openFileExplorer,
    handleChange,
    handleDragOver,
    handleDrop,
    handleDragLeave,
    handleDragEnter,
    dragActive,
  } = useHandleFilesUploadWithDragAndDrop(inputRef)
  const [showMobilePhotosUploader, setShowMobilePhotosUploader] =
    useState(false)
  const [formData, setFormData] = useState<User>(userData)
  const [lifestyleTags, setLifestyleTags] = useState(
    formData.lifestyleTags || []
  )

  const handleInputChange = useCallback(
    (name: string, value: string | boolean) => {
      setFormData((prev) => ({ ...prev, [name]: value }))
    },
    []
  )

  return (
    <Flex flexDir="column" alignItems="start" gap="5rem" w={{ base: "90%", lg: "80%" }} mx="auto" py="5rem">
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
            toggleShowAdditionalPhotos={() =>
              setShowMobilePhotosUploader((prev) => !prev)
            }
          />

          <Heading variant="700" size="md" textAlign={{ base: "center", md: "left"}}>Personal info</Heading>

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
                value={formData.firstName}
              />
              <Input
                flexBasis="48%"
                placeholder="Last name"
                name="lastName"
                onChange={(e) =>
                  handleInputChange(e.target.name, e.target.value)
                }
                value={formData.lastName}
              />
            </Flex>
          </InputGroup>

          <Flex flexGrow="1" flexDir="column">
            <InputLabel>Phone number</InputLabel>
            <PhoneNumberInput
              phoneNumber={formData.phoneNumber}
              error={[]}
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
              value={formData.email}
            />
          </InputGroup>

          <Flex flexGrow="1" flexDir="column">
            <InputLabel>Date of birth</InputLabel>
            <DobInput
              inputVariant="base"
              value={formData.dob}
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
              value={formData.gender}
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
              isStudent={formData.isStudent}
              inputVariant="base"
              inputName={formData.isStudent ? "school" : "occupation"}
              inputValue={
                formData.isStudent ? formData.school : formData.occupation
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
              value={formData.currentAddress}
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
              handleSelectItem={(item) =>
                setLifestyleTags((prev) => [...prev, item])
              }
              selectedItems={lifestyleTags}
              handleRemoveItem={(item) =>
                setLifestyleTags((prev) =>
                  prev?.filter(
                    (it) => it.value.toLowerCase() !== item.value.toLowerCase()
                  )
                )
              }
            />
          </InputGroup>

          <InputGroup flexGrow="1" flexDir="column">
            <InputLabel>About you</InputLabel>
            <Textarea
              value={formData.about}
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

          <Button variant="brand-secondary" maxW="18.5rem">
            Save Changes
          </Button>
        </Flex>

        <PhotosUploadSection
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
          files={files}
        />
      </Flex>

      <Box
        display={{
          base: !showMobilePhotosUploader ? "block" : "none",
          md: "block",
        }}
      >
        <ProfileSettingsButton />
      </Box>
    </Flex>
  )
}


"use client"
import InputLabel from "@/app/_components/InputLabel"
import {
  Button,
  Flex,
  HStack,
  Input,
  InputGroup,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react"
import CustomSelect from "./CustomSelect"
import AddressInput from "@/app/_components/AddressInput"
import FeatureInput from "./FeaturesInput"
import { Listing } from "@/app/_types/Listings"
import {
  rentDurationOptions,
  numberOfBedroomsOptions,
  apartmentTypeOptions,
  numberOfOccupantsOptions,
} from "./FormOptions"
import { Feature } from "@/app/_types"

export default function FormDetailsSection({
  listingData,
  features,
  handleChange,
  removeFeature,
  addFeature,
  updateLocationPlaceId,
  canBeSubmitted,
  saveAsDraft,
  hasEdits,
  isSavingDraft,
  isSavingListing
}: {
  listingData: Listing
  handleChange: (name: keyof typeof listingData, value: any) => void
  features: Feature[]
  addFeature: (feature: Feature) => void
  removeFeature: (feature: Feature) => void
  updateLocationPlaceId: (placeId: string) => void
  canBeSubmitted?: boolean
  saveAsDraft: () => void
  hasEdits: boolean
  isSavingDraft: boolean
  isSavingListing: boolean
}) {
  return (
    <VStack alignItems="start" gap="3rem" w="full">
      <InputGroup flexDir="column" w="100%" gap=".6rem">
        <InputLabel>What are you looking for?</InputLabel>
        <Flex
          w="100%"
          alignItems="center"
          borderBottom="1px solid"
          borderBottomColor="gray.100"
          gap="1rem"
          pb="1rem"
        >
          <Text
            as="span"
            maxW="9.8rem"
            rounded=".8rem"
            flexGrow="1"
            textAlign="center"
            px=".3rem"
            py=".4rem"
            bg="brand.main"
            color="white"
            fontWeight="700"
            fontSize={{ base: "1.3rem", md: "1.6rem" }}
          >
            Looking for
          </Text>
          <Input
            name="lookingFor"
            value={listingData.lookingFor}
            onChange={(e) => handleChange("lookingFor", e.target.value)}
            p="0 !important"
            flexGrow="1"
            w="min-content"
            border="0 !important"
            placeholder="Eg: Someone to share my self contain space with me"
            _placeholder={{ fontSize: { base: "1rem", md: "1.6rem" } }}
          />
        </Flex>
      </InputGroup>
      <Flex
        pos="relative"
        zIndex="3"
        w="full"
        gap={{ base: "1.5rem", md: "3rem" }}
      >
        <InputGroup flexDir="column">
          <InputLabel>Listing type</InputLabel>
          <CustomSelect
            name="Apartment type"
            matchWidth
            showTriggerContentAlways
            triggerStyles={{
              justifyContent: "space-between",
              py: "1.5rem",
              px: "1.8rem",
              borderColor: "#7070704D",
            }}
            options={apartmentTypeOptions}
            optionsContainerVariant="primary"
            showOptionDividers
            selectedValue={listingData.apartmentType || ""}
            handleSelect={(val) => {
              handleChange("isStudioApartment", val.toLowerCase() === "studio")
              handleChange("apartmentType", val)
            }}
          />
        </InputGroup>
        {!listingData.isStudioApartment && (
          <InputGroup flexDir="column" w="25%" maxW="20rem" zIndex="0">
            <InputLabel>Bedrooms</InputLabel>
            <CustomSelect
              name="1"
              showTriggerContentAlways
              triggerStyles={{
                justifyContent: "center",
                py: "1.5rem",
                px: "1.8rem",
                borderColor: "#7070704D",
                textAlign: "center",
              }}
              options={numberOfBedroomsOptions}
              selectedValue={
                listingData.numberOfBedrooms === 4
                  ? "4+"
                  : listingData.numberOfBedrooms
              }
              handleSelect={(val) => handleChange("numberOfBedrooms", val)}
              matchWidth
              optionsContainerVariant="primary"
              optionsStyle={{ textAlign: "center", justifyContent: "center" }}
            />
          </InputGroup>
        )}
      </Flex>
      <InputGroup flexDir="column" zIndex="2">
        <InputLabel>Rent Amount</InputLabel>
        <Flex
          bg="transparent"
          p="0"
          rounded="1.2rem"
          border="1px solid"
          borderColor="#7070704D"
          overflow="hidden"
        >
          <Input
            placeholder="Input rent amount"
            type="number"
            border="0 !important"
            value={listingData.rentAmount}
            onChange={(e) => handleChange("rentAmount", e.target.value)}
          />
          <CustomSelect
            name="Duration"
            showTriggerContentAlways
            triggerStyles={{
              justifyContent: "center",
              py: "1.5rem",
              px: "1.8rem",
              bg: "white.200",
              w: { base: "32%", md: "25%" },
              maxW: "11rem",
              rounded: "0",
            }}
            options={rentDurationOptions}
            optionsContainerVariant="primary"
            selectedValue={listingData.rentDuration}
            handleSelect={(val) => handleChange("rentDuration", val)}
          />
        </Flex>
      </InputGroup>
      <InputGroup flexDir="column" w="fit-content" zIndex="3">
        <InputLabel>Number of occupants</InputLabel>
        <CustomSelect
          name="Alone"
          showTriggerContentAlways
          triggerStyles={{
            justifyContent: "space-between",
            py: "1.5rem",
            px: "1.8rem",
            w: "full",
            rounded: "1.2rem",
            maxW: { md: "20rem" },
            borderColor: "#7070704D",
          }}
          options={numberOfOccupantsOptions}
          optionsContainerVariant="primary"
          optionsStyle={{ textAlign: "center", justifyContent: "center" }}
          matchWidth
          selectedValue={
            (listingData.currentOccupancyCount === 4
              ? "4+"
              : listingData.currentOccupancyCount) || ""
          }
          handleSelect={(val) => handleChange("currentOccupancyCount", val)}
        />
      </InputGroup>
      <InputGroup flexDir="column" zIndex="2">
        <InputLabel>Location</InputLabel>
        <AddressInput
          handleSelection={(val) => {
            handleChange("streetAddress", val.description)
            const [city, country] =
              val.structured_formatting.secondary_text.split(", ")
            handleChange("city", city)
            handleChange("country", country)
            updateLocationPlaceId(val.place_id)
          }}
          value={listingData.streetAddress}
          inputVariant="transparent"
          inputProps={{ borderColor: "#7070704D" }}
          errorProps={{}}
          reset={() => {
            handleChange("streetAddress", "")
            updateLocationPlaceId("")
          }}
        />
      </InputGroup>
      <FeatureInput
        selectedItems={features as []}
        handleSelectItem={addFeature}
        handleRemoveItem={removeFeature}
      />
      <InputGroup flexGrow="1" flexDir="column">
        <InputLabel>Describe your space</InputLabel>
        <Textarea
          value={listingData.description}
          onChange={(e) => handleChange("description", e.target.value)}
          name="about"
          h="30rem"
          resize="none"
          p="2rem"
          minLength={10}
          fontSize={{ base: "1.6rem", md: "1.9rem" }}
          rounded="1.2rem"
          placeholder="Tell roomey finders about your space"
        />
      </InputGroup>
      <HStack w="full" gap="1rem">
        <Button
          type="submit"
          isDisabled={canBeSubmitted === false}
          variant="brand-secondary"
          w="full"
          maxW="18.5rem"
          isLoading={isSavingListing}
        >
          Publish Your Ad
        </Button>
        {hasEdits && (
          <Text
            fontSize={{ base: "1.4rem", md: "1.6rem" }}
            w="max-content"
            as={Button}
            onClick={saveAsDraft}
            isLoading={isSavingDraft}
            bg="transparent"
            _hover={{ bg:"transparent", textDecor:"underline"}}
          >
            Save for later
          </Text>
        )}
      </HStack>
    </VStack>
  )
}

import {
  Radio,
  Input,
  VStack,
  Text,
  RadioGroup,
  Heading,
} from "@chakra-ui/react"
import { ReactNode, useEffect } from "react"
import toast from "react-hot-toast"

export default function SearchBar({
  handleCoordinatesChange,
}: {
  handleCoordinatesChange: (arg: { lat: number; lng: number } | null) => void
}) {
  useEffect(() => {
    const center = { lat: 9.082, lng: 8.6753 }
    // Create a bounding box with sides ~10km away from the center point
    const defaultBounds = {
      north: center.lat + 0.1,
      south: center.lat - 0.1,
      east: center.lng + 0.1,
      west: center.lng - 0.1,
    }
    const input = document.getElementById("pac-input") as HTMLInputElement
    const options = {
      bounds: defaultBounds,
      componentRestrictions: { country: "ng" },
      fields: ["address_components", "geometry", "icon", "name"],
      strictBounds: false,
      type: "(regions)",
    }
    const autocomplete =
      window.google?.maps?.places &&
      new window.google.maps.places.Autocomplete(input, options)
    autocomplete?.addListener("place_changed", () => {
      if (autocomplete?.getPlace().geometry?.location) {
        const coordinates = {
          lat: autocomplete.getPlace().geometry?.location?.lat(),
          lng: autocomplete.getPlace().geometry?.location?.lng(),
        }
        coordinates.lat !== undefined &&
          coordinates.lng !== undefined &&
          handleCoordinatesChange(coordinates as any)
      } else
        toast.error(
          "Unable to get the coordinates of that location. Please try another location."
        )
    })
  }, [handleCoordinatesChange])
  return (
    <>
      <Input
        variant="filled"
        py="1rem"
        px="1rem"
        rounded=".5rem"
        placeholder="Find location"
        maxW={{ md: "50rem" }}
        id="pac-input"
        onChange={(e) => e.target.value === "" && handleCoordinatesChange(null)}
      />
    </>
  )
}

export const NumberOfBedroomsFilter = ({
  handleSelection,
  value,
}: {
  handleSelection: (val: string) => void
  value: string
}) => {
  return (
    <RadioGroup
      name="numberOfBedrooms"
      value={value}
      onChange={(val) => handleSelection(val)}
    >
      <VStack alignItems="start" spacing={[2, 5]} direction={["column", "row"]}>
        <Heading as="h3" fontSize="1.6rem" fontWeight="700">
          Number of bedrooms
        </Heading>
        <Radio size="lg" value="studio" fontSize="1.6rem">
          <Text as="span" fontSize="1.6rem">
            Studio apartment
          </Text>
        </Radio>
        <Radio size="lg" value="1" fontSize="1.6rem">
          <Text as="span" fontSize="1.6rem">
            1
          </Text>
        </Radio>
        <Radio size="lg" value="2" fontSize="1.6rem">
          <Text as="span" fontSize="1.6rem">
            2
          </Text>
        </Radio>
        <Radio size="lg" value="3" fontSize="1.6rem">
          <Text as="span" fontSize="1.6rem">
            3
          </Text>
        </Radio>
        <Radio size="lg" value="4" fontSize="1.6rem">
          <Text as="span" fontSize="1.6rem">
            4+
          </Text>
        </Radio>
      </VStack>
    </RadioGroup>
  )
}
export const RentDurationFilter = ({
  handleSelection,
  value,
  heading,
}: {
  handleSelection: (val: string) => void
  value: string
  heading?: string
}) => {
  return (
    <RadioGroup
      name="rentDuration"
      value={value}
      onChange={(val) => handleSelection(val)}
    >
      <VStack alignItems="start" spacing={[2, 5]} direction={["column", "row"]}>
        <Heading as="h3" fontSize="1.6rem" fontWeight="700">
          {heading || "Rent Duration"}
        </Heading>
        <Radio size="lg" value="annually" fontSize="1.6rem">
          <Text as="span" fontSize="1.6rem">
            Annually
          </Text>
        </Radio>
        <Radio size="lg" value="biannually" fontSize="1.6rem">
          <Text as="span" fontSize="1.6rem">
            Biannually
          </Text>
        </Radio>
        <Radio size="lg" value="quarterly" fontSize="1.6rem">
          <Text as="span" fontSize="1.6rem">
            Quarterly
          </Text>
        </Radio>
        <Radio size="lg" value="monthly" fontSize="1.6rem">
          <Text as="span" fontSize="1.6rem">
            Monthly
          </Text>
        </Radio>
      </VStack>
    </RadioGroup>
  )
}

export const RentFilter = ({
  handleSelection,
  value,
  heading,
}: {
  handleSelection: (val: string) => void
  value: string
  heading?: ReactNode | ReactNode[]
}) => {
  return (
    <>
      <RadioGroup
        name="rentAmount"
        value={value}
        onChange={(val) => handleSelection(val)}
      >
        <VStack
          alignItems="start"
          spacing={[2, 5]}
          direction={["column", "row"]}
        >
          <Heading as="h3" fontSize="1.6rem" fontWeight="700">
            {heading}
          </Heading>
          <Radio size="lg" value="0-100000" fontSize="1.6rem">
            <Text as="span" fontSize="1.6rem">
              {"<= "}
              {"₦"}
              {(100000).toLocaleString("en-ng", {
                maximumFractionDigits: 0,
              })}
            </Text>
          </Radio>
          <Radio value="100001-200000" size="lg" fontSize="1.6rem">
            <Text as="span" fontSize="1.6rem">
              {"₦"}
              {(100001).toLocaleString("en-ng", {
                maximumFractionDigits: 0,
              })}{" "}
              -{" ₦"}
              {(200000).toLocaleString("en-ng", {
                maximumFractionDigits: 0,
              })}
            </Text>
          </Radio>
          <Radio value="200001-300000" size="lg" fontSize="1.6rem">
            <Text as="span" fontSize="1.6rem">
              {"₦"}
              {(200001).toLocaleString("en-ng", {
                maximumFractionDigits: 0,
              })}{" "}
              -{" ₦"}
              {(300000).toLocaleString("en-ng", {
                maximumFractionDigits: 0,
              })}
            </Text>
          </Radio>
          <Radio value="300001-400000" size="lg" fontSize="1.6rem">
            <Text as="span" fontSize="1.6rem">
              {"₦"}
              {(300001).toLocaleString("en-ng", {
                maximumFractionDigits: 0,
              })}{" "}
              -{" ₦"}
              {(400000).toLocaleString("en-ng", {
                maximumFractionDigits: 0,
              })}
            </Text>
          </Radio>
          <Radio value="400001-500000" size="lg" fontSize="1.6rem">
            <Text as="span" fontSize="1.6rem">
              {" "}
              {"₦"}
              {(400001).toLocaleString("en-ng", {
                maximumFractionDigits: 0,
              })}{" "}
              -{" ₦"}
              {(500000).toLocaleString("en-ng", {
                maximumFractionDigits: 0,
              })}
            </Text>
          </Radio>
          <Radio value="500000" size="lg" fontSize="1.6rem">
            <Text as="span" fontSize="1.6rem">
              {"> ₦"}
              {(500000).toLocaleString("en-ng", {
                maximumFractionDigits: 0,
              })}
            </Text>
          </Radio>
        </VStack>
      </RadioGroup>
    </>
  )
}

export const GenderFilter = ({
  handleSelection,
  value,
}: {
  handleSelection: (val: string) => void

  value: string
}) => {
  return (
    <RadioGroup
      name="gender"
      value={value}
      onChange={(val) => handleSelection(val)}
    >
      <VStack alignItems="start" spacing={[2, 5]} direction={["column", "row"]}>
        <Heading as="h3" fontSize="1.6rem" fontWeight="700">
          Gender
        </Heading>
        <Radio size="lg" value="male" fontSize="1.6rem">
          <Text as="span" fontSize="1.6rem">
            Male
          </Text>
        </Radio>
        <Radio size="lg" value="female" fontSize="1.6rem">
          <Text as="span" fontSize="1.6rem">
            Female
          </Text>
        </Radio>
        <Radio size="lg" value="both" fontSize="1.6rem">
          <Text as="span" fontSize="1.6rem">
            Both
          </Text>
        </Radio>
      </VStack>
    </RadioGroup>
  )
}

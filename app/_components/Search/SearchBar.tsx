import { Flex, Input, Select } from "@chakra-ui/react"
import { ChangeEventHandler, useEffect, useState } from "react"
import toast from "react-hot-toast"

export default function SearchBar({
  handleCoordinatesChange,
  handleBedroomChange,
  handleRentDurationChange,
  handleRentChange,
}: {
  handleCoordinatesChange: (arg: { lat: number; lng: number } | null) => void
  handleBedroomChange: ChangeEventHandler<HTMLSelectElement>
  handleRentDurationChange: ChangeEventHandler<HTMLSelectElement>
  handleRentChange: ChangeEventHandler<HTMLSelectElement>
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
    const autocomplete = new window.google.maps.places.Autocomplete(
      input,
      options
    )
    autocomplete.addListener("place_changed", () => {
      if (autocomplete.getPlace().geometry?.location) {
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
      <Flex
        w="full"
        flexWrap="wrap"
        justifyContent="space-between"
        alignItems="center"
        gap="1rem"
      >
        <Input
          variant="filled"
          py="1rem"
          px="1rem"
          rounded=".5rem"
          placeholder="Find location"
          maxW={{ md: "50rem" }}
          id="pac-input"
          onChange={(e) =>
            e.target.value === "" && handleCoordinatesChange(null)
          }
        />
        <Flex gap="1rem" flexGrow="1" maxW="60rem">
          <RentDurationFilter handleSelection={handleRentDurationChange} />
          <RentFilter handleSelection={handleRentChange} />
          <NumberOfBedroomsFilter handleSelection={handleBedroomChange} />
        </Flex>
      </Flex>
    </>
  )
}

const NumberOfBedroomsFilter = ({
  handleSelection,
}: {
  handleSelection: ChangeEventHandler
}) => {
  const [value, setValue] = useState("")
  return (
    <Input
      rounded=".5rem"
      fontSize="1.6rem"
      placeholder="Bedrooms"
      _focus={{
        borderColor: "brand.main",
      }}
      value={value}
      onChange={(e) => {
        handleSelection(e)
        setValue(e.target.value)
      }}
      py=".5rem"
      as={Select}
    >
      <option value="studio">Studio apartment</option>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4+</option>
    </Input>
  )
}
export const RentDurationFilter = ({
  handleSelection,
  placeholder,
}: {
  handleSelection: ChangeEventHandler
  placeholder?: string
}) => {
  const [value, setValue] = useState("")
  return (
    <Input
      rounded=".5rem"
      fontSize="1.6rem"
      placeholder={placeholder || "Duration"}
      value={value}
      onChange={(e) => {
        handleSelection(e)
        setValue(e.target.value)
      }}
      as={Select}
      py=".5rem"
    >
      <option value="annually">Annually</option>
      <option value="biannually">Biannually</option>
      <option value="quarterly">Quarterly</option>
      <option value="monthly">Monthly</option>
    </Input>
  )
}
export const RentFilter = ({
  handleSelection,
  placeholder,
}: {
  handleSelection: ChangeEventHandler
  placeholder?: string
}) => {
  const [value, setValue] = useState("")
  return (
    <Input
      rounded=".5rem"
      fontSize="1.6rem"
      placeholder={placeholder || "Rent"}
      onChange={(e) => {
        handleSelection(e)
        setValue(e.target.value)
      }}
      value={value}
      as={Select}
      py=".5rem"
    >
      <option value="0-100000">
        {"<= "}
        {"₦"}
        {(100000).toLocaleString("en-ng", {
          maximumFractionDigits: 0,
        })}
      </option>
      <option value="100001-200000">
        {"₦"}
        {(100001).toLocaleString("en-ng", {
          maximumFractionDigits: 0,
        })}{" "}
        -{" ₦"}
        {(200000).toLocaleString("en-ng", {
          maximumFractionDigits: 0,
        })}
      </option>
      <option value="200001-300000">
        {"₦"}
        {(200001).toLocaleString("en-ng", {
          maximumFractionDigits: 0,
        })}{" "}
        -{" ₦"}
        {(300000).toLocaleString("en-ng", {
          maximumFractionDigits: 0,
        })}
      </option>
      <option value="300001-400000">
        {"₦"}
        {(300001).toLocaleString("en-ng", {
          maximumFractionDigits: 0,
        })}{" "}
        -{" ₦"}
        {(400000).toLocaleString("en-ng", {
          maximumFractionDigits: 0,
        })}
      </option>
      <option value="400001-500000">
        {"₦"}
        {(400001).toLocaleString("en-ng", {
          maximumFractionDigits: 0,
        })}{" "}
        -{" ₦"}
        {(500000).toLocaleString("en-ng", {
          maximumFractionDigits: 0,
        })}
      </option>
      <option value="500000">
        {"> ₦"}
        {(500000).toLocaleString("en-ng", {
          maximumFractionDigits: 0,
        })}
      </option>
    </Input>
  )
}

export const GenderFilter = ({
  handleSelection,
  placeholder,
}: {
  handleSelection: ChangeEventHandler
  placeholder?: string
}) => {
  const [value, setValue] = useState("")
  return (
    <Input
      rounded=".5rem"
      fontSize="1.6rem"
      placeholder={placeholder || "Gender"}
      onChange={(e) => {
        handleSelection(e)
        setValue(e.target.value)
      }}
      value={value}
      as={Select}
      py=".5rem"
    >
      <option value="male">Male</option>
      <option value="female">Female</option>
      <option value="both">Both</option>
    </Input>
  )
}

export const LookingForFilter = ({
  handleSelection,
  placeholder,
}: {
  handleSelection: ChangeEventHandler
  placeholder?: string
}) => {
  const [value, setValue] = useState("")
  return (
    <Input
      rounded=".5rem"
      fontSize="1.6rem"
      placeholder={placeholder || "Looking for"}
      onChange={(e) => {
        handleSelection(e)
        setValue(e.target.value)
      }}
      value={value}
      as={Select}
      py=".5rem"
    >
      <option value="room">Room</option>
      <option value="roommate">Roommate</option>
      <option value="both">Both</option>
    </Input>
  )
}

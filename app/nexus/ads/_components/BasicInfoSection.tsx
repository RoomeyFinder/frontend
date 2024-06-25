import { Listing } from "@/app/_types/Listings"
import {
  FormLabel,
  HStack,
  Input,
  Select,
  VStack,
  Text,
} from "@chakra-ui/react"
import citiesInNigeria from "@/app/_data/citiesInNigeria.json"
import statesInNigeria from "@/app/_data/statesInNigeria.json"
import { ChangeEventHandler } from "react"

export default function BasicInfoSection({
  listingInfo,
  handleChange,
}: {
  listingInfo: Partial<Listing> & { apartmentType: string }
  handleChange: ChangeEventHandler<HTMLInputElement>
}) {
  return (
    <VStack
      w="full"
      alignItems="start"
      pb="3rem"
      pt="1rem"
      gap={{ base: "1rem", sm: "2rem" }}
    >
      <HStack w="full">
        <FormLabel w={{ base: "full" }}>
          <Text as="span" fontSize="1.4rem" fontWeight="500">
            I&apos;m looking for
          </Text>
          <Input
            name="lookingFor"
            placeholder="A roommate to share my apartment with"
            type="string"
            onChange={handleChange}
            variant="filled"
            w="full"
            value={listingInfo.lookingFor}
          />
        </FormLabel>
      </HStack>
      <HStack
        w="full"
        gap={{ base: "1rem", sm: "2rem" }}
        flexWrap={{ base: "wrap", sm: "nowrap" }}
      >
        <FormLabel w={{ base: "full", sm: "calc(100% - 20% - 2rem)" }}>
          <Text as="span" fontSize="1.4rem" fontWeight="500">
            Rent amount / roomey
          </Text>
          <Input
            name="rentAmount"
            placeholder="123,456"
            type="number"
            onChange={handleChange}
            variant="filled"
            value={listingInfo.rentAmount}
          />
        </FormLabel>
        <FormLabel w={{ base: "full", sm: "20%" }}>
          <Text as="span" fontSize="1.4rem" fontWeight="500">
            Rent duration
          </Text>
          <Input
            name="rentDuration"
            placeholder="-"
            variant="filled"
            onChange={handleChange}
            as={Select}
            value={listingInfo.rentDuration}
          >
            <option value="annually">Annually</option>
            <option value="biannually">Biannually</option>
            <option value="quarterly">Quarterly</option>
            <option value="monthly">Monthly</option>
          </Input>
        </FormLabel>
      </HStack>
      <HStack
        w="full"
        gap={{ base: "1rem", sm: "2rem" }}
        flexWrap={{ base: "wrap", sm: "nowrap" }}
      >
        <FormLabel w={{ base: "full" }}>
          <Text as="span" fontSize="1.4rem" fontWeight="500">
            Type of apartment
          </Text>
          <Input
            name="apartmentType"
            placeholder="-"
            variant="filled"
            onChange={handleChange}
            as={Select}
            value={listingInfo.apartmentType}
          >
            <option value="studio">Studio Apartment</option>
            <option value="bedroom">Bedroom</option>
          </Input>
        </FormLabel>
      </HStack>
      <HStack w="full" gap={{ base: "1rem", sm: "2rem" }}>
        <FormLabel w={{ base: "full", sm: "49%" }}>
          <Text as="span" fontSize="1.4rem" fontWeight="500">
            Number of rooms
          </Text>
          <Input
            name="numberOfBedrooms"
            placeholder="-"
            isDisabled={listingInfo.apartmentType !== "bedroom"}
            onChange={handleChange}
            variant="filled"
            as={Select}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4+</option>
          </Input>
        </FormLabel>
        <FormLabel w={{ base: "full", sm: "49%" }}>
          <Text as="span" fontSize="1.4rem" fontWeight="500">
            Current number of occupants
          </Text>
          <Input
            name="currentOccupancyCount"
            placeholder="-"
            type="number"
            onChange={handleChange}
            value={listingInfo.currentOccupancyCount}
            variant="filled"
            as={Select}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4+</option>
          </Input>
        </FormLabel>
      </HStack>
      <HStack
        w="full"
        gap={{ base: "1rem", sm: "2rem" }}
        flexWrap={{ base: "wrap", sm: "nowrap" }}
      >
        <FormLabel w={{ base: "full", sm: "32.2%" }}>
          <Text as="span" fontSize="1.4rem" fontWeight="500">
            Street address
          </Text>
          <Input
            name="streetAddress"
            placeholder="Street address"
            type="text"
            onChange={handleChange}
            variant="filled"
            value={listingInfo.streetAddress}
          />
        </FormLabel>
        <FormLabel w={{ base: "full", sm: "32.2%" }}>
          <Text as="span" fontSize="1.4rem" fontWeight="500">
            State
          </Text>
          <Input
            name="state"
            placeholder="-"
            variant="filled"
            onChange={handleChange}
            as={Select}
            value={listingInfo.state}
          >
            {statesInNigeria.map((state) => (
              <option key={state.code} value={state.name}>
                {state.name}
              </option>
            ))}
          </Input>
        </FormLabel>
        <FormLabel w={{ base: "full", sm: "32.2%" }}>
          <Text as="span" fontSize="1.4rem" fontWeight="500">
            City
          </Text>
          <Input
            name="city"
            placeholder="-"
            type="number"
            variant="filled"
            onChange={handleChange}
            as={Select}
            value={listingInfo.city}
          >
            {(
              citiesInNigeria[
                listingInfo.state as keyof typeof citiesInNigeria
              ] || []
            ).map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </Input>
        </FormLabel>
      </HStack>
    </VStack>
  )
}

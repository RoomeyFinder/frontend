import { GridItem, Input, Link, SimpleGrid, Text } from "@chakra-ui/react"
import AddressInput from "../_components/AddressInput"
import { getErrorProps } from "./utils"

export default function AddressForm({
  formData, sectionName, handleChange, error
}: {
  formData: { [x: string]: string | number | boolean }
  sectionName: string,
  handleChange: (stageName: string, name: string, value: string | number | boolean) => void
  error: string[]
}) {
  return (
    <SimpleGrid
      columns={{ base: 1, sm: 2 }}
      spacing={{ base: "1.8rem", sm: "3rem" }}
      pb="1rem"
    >
      <GridItem>
        <AddressInput
          reset={() => {
            handleChange(sectionName, "address", "")
            handleChange(sectionName, "placeId", "")
          }}
          handleSelection={(selection) => {
            console.log(selection)
            handleChange(sectionName, "address", selection.description)
            handleChange(sectionName, "placeId", selection.place_id)
          }}
          value={formData.address as string}
          errorProps={{ ...getErrorProps("address", error) }}
        />
      </GridItem>
      <GridItem>
        <Input
          variant="filled"
          placeholder="City *"
          type="text"
          onChange={(e) => handleChange(sectionName, "city", e.target.value)}
          {...getErrorProps("city", error)}
          name="city"
          value={formData.firstName as string}
        />
      </GridItem>
      <GridItem>
        <Input
          type="text"
          variant="filled"
          placeholder="State *"
          name="state"
          {...getErrorProps("state", error)}
          onChange={(e) => handleChange(sectionName, "state", e.target.value)}
          value={formData.firstName as string}
        />
      </GridItem>
      <GridItem>
        <Input
          variant="filled"
          placeholder="Country *"
          type="text"
          onChange={(e) => handleChange(sectionName, "country", e.target.value)}
          name="country"
          {...getErrorProps("country", error)}
          value={formData.firstName as string}
        />
      </GridItem>
      <GridItem colSpan={{ base: 1, sm: 2 }}>
        <Text textAlign="right" lineHeight="normal">
          By clicking complete, I agree to Roomeyfinder&apos;s
          <Link fontWeight="600" color="#0433FF" href="/terms-of-service">
            {" "}
            Terms of Service
          </Link>{" "}
          and
          <Link fontWeight="600" color="#0433FF" href="/privacy-policy">
            {" "}
            Privacy Policy
          </Link>
        </Text>
      </GridItem>
    </SimpleGrid>
  )
}
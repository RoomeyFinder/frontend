import { GridItem, Input, Link, SimpleGrid, Text } from "@chakra-ui/react"
import AddressInput from "./AddressInput"

export default function AddressForm({
  formData, sectionName, handleChange
}: {
  formData: { [x: string]: string | number | boolean }
  sectionName: string,
  handleChange: (stageName: string, name: string, value: string | number | boolean) => void
}) {
  console.log(formData, "here")
  return (
    <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={{ base: "1.8rem", sm: "3rem" }} pb="1rem">
      <GridItem>
        <AddressInput updateFormData={(fieldName: string, value: string) => {
          handleChange(sectionName, fieldName, value)
        }} formValue={formData.address as string} />
      </GridItem>
      <GridItem>
        <Input
          variant="filled"
          placeholder="City *"
          type="text"
          onChange={(e) => handleChange(sectionName, "city", e.target.value)}
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
          value={formData.firstName as string}
        />
      </GridItem>
      <GridItem colSpan={{ base: 1, sm: 2 }}>
        <Text textAlign="right" lineHeight="normal">
          By clicking complete, I agree to Roomeyfinder&apos;s 
          <Link fontWeight="600" color="#0433FF" href="/terms-of-service"> Terms of Service</Link> and  
          <Link fontWeight="600" color="#0433FF" href="/privacy-policy"> Privacy Policy</Link>
        </Text>
      </GridItem>
    </SimpleGrid>
  )
}
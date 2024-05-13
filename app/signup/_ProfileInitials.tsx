import { Box, GridItem, Input, SimpleGrid } from "@chakra-ui/react"
import DobInput from "../_components/DobInput"
import { getErrorProps } from "./utils"
import OccupationOrUniversityInput from "@/app/_components/OccupationOrUniversityInput"
import SearchableInput from "../_components/SearchableInput"

export default function ProfileInitialsForm({
  formData, sectionName, handleChange, error
}: {
  formData: { [x: string]: string | number | boolean, }
  sectionName: string,
  handleChange: (stageName: string, name: string, value: string | number | boolean) => void
  error: string[]
}) {

  return (
    <Box pb={{ base: "3rem", md: "5rem" }}>
      <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={{ base: "1.8rem", sm: "3rem" }}>
        <GridItem>
          <Input
            {...getErrorProps("firstName", error)}
            variant="filled"
            placeholder="First name *"
            min={4}
            name="firstName"
            value={formData.firstName as string}
            onChange={(e) => handleChange(sectionName, "firstName", e.target.value)} />
        </GridItem>
        <GridItem>
          <Input
            {...getErrorProps("lastName", error)}
            variant="filled"
            placeholder="Last name *"
            min={4}
            name="lastName" value={formData.lastName as string}
            onChange={(e) => { handleChange(sectionName, "lastName", e.target.value) }} />
        </GridItem>
        <GridItem>
          <DobInput
            errorProps={getErrorProps("dob", error)}
            value={formData.dob as string}
            handleChange={(newValue: string) => handleChange(sectionName, "dob", newValue)} />
        </GridItem>
        <GridItem>
          <SearchableInput
            inputName={"gender"}
            inputPlaceholder="Gender"
            inputVariant="filled"
            value={formData.gender as string}
            errorProps={getErrorProps("gender", error)}
            options={["Male", "Female"]}
            handleChange={(selection: string) => handleChange(sectionName, "gender", selection)} />
        </GridItem>
        <GridItem colSpan={{ base: 1, sm: 2 }}>
          <OccupationOrUniversityInput
            errors={error}
            inputName={formData.isStudent ? "school" : "occupation"}
            inputValue={(formData.isStudent ? formData.school : formData.occupation) as string}
            handleChange={(inputName, inputValue) => handleChange(sectionName, inputName, inputValue)}
            isStudent={formData.isStudent as boolean}
            toggleIsStudent={(newVal) => handleChange(sectionName, "isStudent", newVal)} />
        </GridItem>
      </SimpleGrid>
    </Box>
  )
}

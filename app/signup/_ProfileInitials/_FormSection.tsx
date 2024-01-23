import { Box, GridItem, Input, SimpleGrid } from "@chakra-ui/react"
import CustomRadioGroup from "../../_components/CustomRadio"
import { useState } from "react"
import occupations from "@/app/_data/occupations.json"
import universities from "@/app/_data/nigerian_universities.js"
import DobInput from "./DobInput"
import GenderInput from "./GenderInput"
import OccupationInput from "./OccupationInput"
import { getErrorProps } from "../utils"

export default function ProfileInitialsForm({
  formData, sectionName, handleChange, error
}: {
  formData: { [x: string]: string | number | boolean, }
  sectionName: string,
  handleChange: (stageName: string, name: string, value: string | number | boolean) => void
  error: string[]
}) {
  const [studentRadio, setStudentRadio] = useState("I am not a student")

  return (
    <Box pb={{ base: "3rem", md: "5rem" }}>
      <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={{ base: "1.8rem", sm: "3rem" }}>
        <GridItem>
          <Input
            {...getErrorProps("firstName", error)}
            variant="filled"
            placeholder="First name *"
            name="firstName"
            value={formData.firstName as string}
            onChange={(e) => handleChange(sectionName, "firstName", e.target.value)} />
        </GridItem>
        <GridItem>
          <Input
            {...getErrorProps("lastName", error)}
            variant="filled"
            placeholder="Last name *"
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
          <GenderInput 
            errorProps={getErrorProps("gender", error)}
            value={formData.gender as string} 
            handleChange={(selection: string) => handleChange(sectionName, "gender", selection)} />
        </GridItem>
        <GridItem alignSelf="center">
          <CustomRadioGroup
            name="isStudent"
            selectedValue={studentRadio}
            onChange={(val: string) => {
              setStudentRadio(val)
              handleChange(sectionName, "isStudent", val.toLowerCase() === "i am a student")
            }}
            options={["I am a student", "I am not a student"]} />
        </GridItem>
        <GridItem>
          <OccupationInput
            errorProps={{...getErrorProps("occupation", error), ...getErrorProps("university", error)}}
            options={formData.isStudent ? universities.map(x => x.name) : occupations}
            isStudent={formData.isStudent as boolean}
            value={(formData.isStudent ? formData.university : formData.occupation) as string}
            handleChange={
              (value: string) =>
                handleChange(sectionName, formData.isStudent ? "university" : "occupation", value)
            } />
        </GridItem>
      </SimpleGrid>
    </Box>
  )
}

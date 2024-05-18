import {
  Box,
  GridItem,
  Input,
  Select,
  SimpleGrid,
  Text,
} from "@chakra-ui/react"
import { getErrorPropsV1 } from "./utils"
import OccupationOrUniversityInput from "@/app/_components/OccupationOrUniversityInput"
import DownChevron from "../_assets/SVG/DownChevron"
import ErrorText from "../_components/Auth/ErrorText"

export default function ProfileInitialsForm({
  formData,
  sectionName,
  handleChange,
  error,
}: {
  formData: { [x: string]: string | number | boolean }
  sectionName: string
  handleChange: (
    stageName: string,
    name: string,
    value: string | number | boolean
  ) => void
  error: { [x: string]: string }
}) {
  return (
    <Box pb={{ base: "3rem", md: "5rem" }}>
      <SimpleGrid
        columns={{ base: 1, sm: 2 }}
        spacing={{ base: "1.8rem", sm: "3rem" }}
      >
        <GridItem>
          <Input
            {...getErrorPropsV1(error.firstName)}
            variant="filled"
            placeholder="First name *"
            min={4}
            name="firstName"
            value={formData.firstName as string}
            onChange={(e) =>
              handleChange(sectionName, "firstName", e.target.value)
            }
          />
          {error.firstName && <ErrorText>{error.firstName}</ErrorText>}
        </GridItem>
        <GridItem>
          <Input
            {...getErrorPropsV1(error.lastName)}
            variant="filled"
            placeholder="Last name *"
            min={4}
            name="lastName"
            value={formData.lastName as string}
            onChange={(e) => {
              handleChange(sectionName, "lastName", e.target.value)
            }}
          />
          {error.lastName && <ErrorText>{error.lastName}</ErrorText>}
        </GridItem>
        <GridItem pos="relative">
          <Input
            {...getErrorPropsV1(error.dob)}
            pos="relative"
            zIndex="2"
            variant="filled"
            placeholder="Date of birth *"
            name="dob"
            type="date"
            value={formData.dob as string}
            onChange={(e) => {
              handleChange(sectionName, "dob", e.target.value)
            }}
          />
          <Text
            pos="absolute"
            top="30%"
            left="2rem"
            // translateY="-50%"
            fontSize="1.4rem"
            color="gray.100"
            display={formData.dob ? "none" : "block"}
            zIndex="-1"
          >
            Date of birth *
          </Text>
          {error.dob && <ErrorText>{error.dob}</ErrorText>}
        </GridItem>
        <GridItem>
          <Input
            {...getErrorPropsV1(error.gender)}
            variant="filled"
            color="gray.100"
            placeholder="gender"
            min={4}
            name="gender"
            value={formData.gender as string}
            as={Select}
            onChange={(e) =>
              handleChange(sectionName, "gender", e.target.value)
            }
            _focusVisible={{
              outline: "none",
              boxShadow: "none",
            }}
            icon={<DownChevron />}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="nil">Prefer not to say</option>
          </Input>
          {error.gender && <ErrorText>{error.gender}</ErrorText>}
        </GridItem>
        <GridItem colSpan={{ base: 1, sm: 2 }}>
          <OccupationOrUniversityInput
            errorProps={getErrorPropsV1(
              formData.isStudent ? error.school : error.occupation
            )}
            inputName={formData.isStudent ? "school" : "occupation"}
            inputValue={
              (formData.isStudent
                ? formData.school
                : formData.occupation) as string
            }
            handleChange={(inputName, inputValue) =>
              handleChange(sectionName, inputName, inputValue)
            }
            isStudent={formData.isStudent as boolean}
            toggleIsStudent={(newVal) =>
              handleChange(sectionName, "isStudent", newVal)
            }
          />
          {error.school && <ErrorText>{error.school}</ErrorText>}
          {error.occupation && <ErrorText>{error.occupation}</ErrorText>}
        </GridItem>
      </SimpleGrid>
    </Box>
  )
}

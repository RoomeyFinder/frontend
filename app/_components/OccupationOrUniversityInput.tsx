import {
  GridItem,
  ResponsiveValue,
  SimpleGrid,
} from "@chakra-ui/react"
import CustomRadioGroup from "./CustomRadio"
import nigerian_universities from "@/app/_data/nigerian_universities"
import occupations from "@/app/_data/occupations.json"
import SearchableInput from "./SearchableInput"

export default function OccupationOrUniversityInput({
  isStudent,
  toggleIsStudent,
  inputName,
  inputValue,
  handleChange,
  errorProps,
  spacing,
  inputVariant,
  columns,
}: {
  errorProps?: { [x: string]: string }
  isStudent: boolean
  toggleIsStudent: (newValue: boolean) => void
  inputName: string
  inputValue: string
  handleChange: (inputName: string, newValue: string) => void
  spacing?: ResponsiveValue<
    | number
    | (string & Record<string, never>)
    | "-moz-initial"
    | "inherit"
    | "initial"
    | "revert"
    | "revert-layer"
    | "unset"
  >
  inputVariant?: string
  columns?: ResponsiveValue<number> | undefined
}) {
  const options = ["I am a student", "I am not a student"]

  return (
    <SimpleGrid
      alignItems="center"
      columns={columns || { base: 1, sm: 2 }}
      spacing={spacing || { base: "1.8rem", sm: "3rem" }}
    >
      <GridItem>
        <CustomRadioGroup
          containerProps={{
            spacing: { base: "1rem", md: "3rem" },
            flexWrap: "wrap",
            alignItems: "center",
          }}
          name="isStudent"
          selectedValue={isStudent ? options[0] : options[1]}
          onChange={(val: string) => {
            toggleIsStudent(
              val.toLowerCase() === options[0].toLocaleLowerCase()
            )
          }}
          options={options}
        />
      </GridItem>
      <GridItem>
        <SearchableInput
          inputName={inputName}
          inputPlaceholder={isStudent ? "School" : "Occupation"}
          errorProps={errorProps}
          options={
            isStudent ? nigerian_universities.map((x) => x.name) : occupations
          }
          value={inputValue}
          inputVariant={inputVariant}
          handleChange={(value: string) => handleChange(inputName, value)}
        />
      </GridItem>
    </SimpleGrid>
  )
}

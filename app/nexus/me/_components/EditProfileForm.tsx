import DownChevron from "@/app/_assets/SVG/DownChevron"
import ErrorText from "@/app/_components/Auth/ErrorText"
import InputLabel from "@/app/_components/InputLabel"
import OccupationOrUniversityInput from "@/app/_components/OccupationOrUniversityInput"
import User from "@/app/_types/User"
import { getErrorPropsV1 } from "@/app/signup/utils"
import {
  VStack,
  InputGroup,
  Flex,
  Input,
  Select,
  Textarea,
  Button,
  Text,
} from "@chakra-ui/react"
import { FormikErrors } from "formik"
import { ChangeEvent } from "react"
import statesInNigeria from "../../../_data/statesInNigeria.json"

export default function EditProfileForm({
  values,
  handleChange,
  errors,
  handleOccupationOrSchoolSelect,
  occupation,
  occupationError,
  isSubmitting,
}: {
  errors: FormikErrors<Partial<User>>
  values: Partial<User>
  handleChange: {
    (e: ChangeEvent<any>): void
    <T = string | ChangeEvent<any>>(
      field: T
    ): T extends ChangeEvent<any>
      ? void
      : (e: string | ChangeEvent<any>) => void
  }
  handleOccupationOrSchoolSelect: (
    name: keyof User,
    value: string | boolean
  ) => void
  occupation: {
    school: string
    occupation: string
    isStudent: boolean
  }
  occupationError: string
  isSubmitting: boolean
}) {
  return (
    <>
      <VStack w="85%" mx="auto" gap="4rem" pb="8rem">
        <Flex gap="4%" flexGrow="1" w="full" alignItems="start">
          <Flex flexGrow="1" flexDir="column">
            <InputLabel>First name</InputLabel>
            <Input
              flexBasis="48%"
              placeholder="First name"
              name="firstName"
              height="5.4rem"
              onChange={handleChange}
              value={values.firstName || ""}
              {...getErrorPropsV1(errors.firstName || "")}
            />
            {errors.firstName && <ErrorText>{errors.firstName}</ErrorText>}
          </Flex>
          <Flex flexGrow="1" flexDir="column">
            <InputLabel>Last name</InputLabel>
            <Input
              flexBasis="48%"
              placeholder="Last name"
              name="lastName"
              height="5.4rem"
              onChange={handleChange}
              value={values.lastName || ""}
              {...getErrorPropsV1(errors.lastName || "")}
            />
            {errors.lastName && <ErrorText>{errors.lastName}</ErrorText>}
          </Flex>
        </Flex>
        <Flex
          w="full"
          gap={{ base: "4rem", sm: "4%" }}
          flexGrow="1"
          flexDir={{ base: "column", sm: "row" }}
          alignItems="start"
        >
          <Flex flexBasis="48%" flexDir="column" w="full">
            <InputLabel>Date of birth</InputLabel>
            <Flex pos="relative" zIndex="10">
              <Input
                color={values.dob ? "black" : "gray.100"}
                zIndex="2"
                variant="filled"
                placeholder="Date of birth *"
                name="dob"
                type="date"
                height="5.4rem"
                value={values.dob as string}
                onChange={handleChange}
                {...getErrorPropsV1(errors.dob || "")}
              />
              {!values.dob && (
                <Text
                  pos="absolute"
                  top="50%"
                  left="2rem"
                  transform="translateY(-50%)"
                  fontSize="1.4rem"
                  color="gray.100"
                  display={{
                    base: values.dob ? "none" : "block",
                    md: "none",
                  }}
                  zIndex="300"
                >
                  Date of birth *
                </Text>
              )}
            </Flex>
            {errors.dob && <ErrorText>{errors.dob}</ErrorText>}
          </Flex>
          <Flex flexBasis="48%" flexDir="column">
            <InputLabel>Gender</InputLabel>
            <Input
              variant="filled"
              color={values.gender ? "black" : "gray.100"}
              placeholder="Gender"
              min={4}
              name="gender"
              value={values.gender as string}
              as={Select}
              onChange={handleChange}
              _focusVisible={{
                outline: "none",
                boxShadow: "none",
              }}
              {...getErrorPropsV1(errors.gender || "")}
              icon={<DownChevron />}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="nil">Prefer not to say</option>
            </Input>
            {errors.gender && <ErrorText>{errors.gender}</ErrorText>}
          </Flex>
        </Flex>
        <Flex flexGrow="1" flexDir="column" w="full">
          <InputLabel>State of origin</InputLabel>
          <Input
            flexBasis="48%"
            placeholder="State"
            name="stateOfOrigin"
            height="5.4rem"
            py="0"
            as={Select}
            onChange={handleChange}
            value={values.stateOfOrigin || ""}
            {...getErrorPropsV1(errors.stateOfOrigin || "")}
          >
            {statesInNigeria.map((state) => (
              <option key={state.code} value={state.name}>
                {state.name}
              </option>
            ))}
          </Input>
          {errors.stateOfOrigin && (
            <ErrorText>{errors.stateOfOrigin}</ErrorText>
          )}
        </Flex>
        <Flex w="100%" flexDir="column" gap="1rem">
          <InputLabel>Occupation</InputLabel>
          <OccupationOrUniversityInput
            inputName={true ? "school" : "occupation"}
            inputValue={
              occupation.isStudent
                ? occupation.school
                : (occupation.occupation as string)
            }
            handleChange={(inputName, value) => {
              handleOccupationOrSchoolSelect(inputName as keyof User, value)
            }}
            isStudent={occupation.isStudent}
            errorProps={getErrorPropsV1(occupationError || "")}
            toggleIsStudent={(newValue) => {
              handleOccupationOrSchoolSelect("isStudent", newValue)
            }}
            columns={1}
            spacing="1rem"
          />
          {occupationError && (
            <ErrorText mt="-.5rem">{occupationError}</ErrorText>
          )}
        </Flex>
        <InputGroup flexGrow="1" flexDir="column">
          <InputLabel>About me</InputLabel>
          <Textarea
            value={values.about || ""}
            name="about"
            onChange={handleChange as any}
            h="30rem"
            resize="none"
            p="2rem"
            fontSize={{ base: "1.6rem", md: "1.9rem" }}
            rounded="1.2rem"
            placeholder="About me"
            {...(getErrorPropsV1(errors.about || "") as any)}
          />
          {errors.about && <ErrorText>{errors.about}</ErrorText>}
        </InputGroup>
        <Button
          isDisabled={isSubmitting}
          isLoading={isSubmitting}
          loadingText={"Saving..."}
          type="submit"
          variant="brand-secondary"
          maxW="18.5rem"
          mr="auto"
        >
          Save Changes
        </Button>
      </VStack>
    </>
  )
}

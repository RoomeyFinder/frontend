"use client"
import { Box, Button, Heading, Text, VStack } from "@chakra-ui/react"
import LifestyleInputs from "./_components/LifestyleInputs"
import BudgetInput from "./_components/BudgetInput"
import EarliestMoveDateInput from "./_components/EarliestMoveDateInput"
import LookingForInput from "./_components/LookingForInput"
import PreferredGenderInput from "./_components/PreferredGenderInput"
import PreferredLocationInput from "./_components/PreferredLocationInput"
import PreferredRentDurationInput from "./_components/PreferredRentDurationInput"
import { Formik, FormikHelpers } from "formik"
import { useAppDispatch, useAppSelector } from "@/app/_redux"
import { ChangeEvent, useCallback, useState } from "react"
import User from "@/app/_types/User"
import { getAddressComponents } from "@/app/_utils/google"
import { updatePreferences } from "@/app/_redux/thunks/auth.thunk"
import { useRouter } from "next/navigation"
import BackButton from "@/app/_components/BackButton"

export default function PreferencesPage() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { user } = useAppSelector((store) => store.auth)
  const [leaseDurations, setLeaseDurations] = useState(
    Array.isArray(user?.preferences?.leaseDurations)
      ? [...user.preferences.leaseDurations]
      : []
  )
  const [lifestyle, setLifestyle] = useState(
    Array.isArray(user?.preferences?.lifestyle)
      ? [...user.preferences.lifestyle]
      : []
  )

  const validateCityAndStateIfExists = useCallback(
    async (values: Partial<User["preferences"]>) => {
      const errors: any = {}
      if (
        (values?.targetCity && !values?.targetState) ||
        (!values?.targetCity && values?.targetState)
      )
        errors.location = "City and state must be provided together"
      return errors
    },
    []
  )

  const handleSubmit = useCallback(
    async (values: any, { setSubmitting, setErrors }: FormikHelpers<any>) => {
      let formData = { ...values, lifestyle, leaseDurations }
      if (formData?.targetCity && formData.targetState) {
        const res = await getAddressComponents({
          street: "",
          city: formData.targetCity,
          region: formData.targetState,
        })
        if (res.status !== "OK")
          return setErrors({
            location:
              "The coordinates of the city and state you provided were not found!",
          })
        formData = {
          ...formData,
          longitude: res.results[0].geometry.location.lng,
          latitude: res.results[0].geometry.location.lat,
        }
      }
      dispatch(updatePreferences(formData)).then(() => {
        setSubmitting(false)
      })
    },
    [lifestyle, leaseDurations, dispatch]
  )
  return (
    <Box pt="3rem" pb="3rem" px={{ base: "2rem", md: "5rem" }} h="80dvh">
      <BackButton left="" />
      <VStack
        alignItems="start"
        pt="4rem"
        pb="2rem"
        borderBottom="1px solid #d2d2d244"
        gap="1rem"
      >
        <Heading fontSize={{ base: "2.8rem", sm: "3.2rem" }} fontWeight="500">
          Preferences
        </Heading>
        <Text fontSize="1.6rem" color="gray.main">
          Manage your account preferences and customize recommendations
        </Text>
      </VStack>
      <Formik
        validateOnBlur={false}
        validateOnChange={false}
        initialValues={{
          maxBudget: user?.preferences?.maxBudget || 0,
          minBudget: user?.preferences?.minBudget || 0,
          preferredRoomiesGender:
            user?.preferences?.preferredRoomiesGender || "",
          maxDistanceFromTargetLocationInMeters:
            user?.preferences?.maxDistanceFromTargetLocationInMeters || 0,
          targetCity: user?.preferences?.targetCity || "",
          targetState: user?.preferences?.targetState || "",
          earliestMoveDate: user?.preferences?.earliestMoveDate
            ? new Date(user?.preferences?.earliestMoveDate)
                .toISOString()
                .split("T")[0]
            : "",
          lookingFor: user?.preferences?.lookingFor || "",
        }}
        validate={validateCityAndStateIfExists as any}
        onSubmit={handleSubmit}
      >
        {({ values, errors, handleChange, handleSubmit, isSubmitting }) => (
          <VStack
            as="form"
            w="full"
            alignItems="start"
            maxW="60rem"
            gap="4rem"
            py="4rem"
            onSubmit={(e) => {
              e.preventDefault()
              handleSubmit()
            }}
          >
            <LookingForInput
              value={values.lookingFor}
              onChange={handleChange}
            />
            <PreferredGenderInput
              value={values.preferredRoomiesGender}
              onChange={handleChange}
            />
            <BudgetInput
              maxBudget={values.maxBudget}
              minBudget={values.minBudget}
              onChange={handleChange}
            />
            <PreferredLocationInput
              targetCity={values.targetCity}
              targetState={values.targetState}
              maxDistanceFromTargetLocationInMeters={
                values.maxDistanceFromTargetLocationInMeters
              }
              onChange={handleChange}
              error={(errors as any).location}
            />
            <PreferredRentDurationInput
              selectedValues={leaseDurations}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                console.log(e.target.value)
                const value = e.target.value as any
                if (leaseDurations.includes(value))
                  setLeaseDurations((prev) => prev.filter((it) => it !== value))
                else setLeaseDurations((prev) => [...prev, value])
              }}
            />
            <EarliestMoveDateInput
              value={values.earliestMoveDate}
              onChange={handleChange}
            />
            <LifestyleInputs
              selectedValues={lifestyle}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                console.log(e.target.value)
                const value = e.target.value as any
                if (leaseDurations.includes(value))
                  setLifestyle((prev) => prev.filter((it) => it !== value))
                else setLifestyle((prev) => [...prev, value])
              }}
            />
            <Button
              type="submit"
              variant="brand-secondary"
              bg="brand.main"
              color="white"
              fontSize="1.6rem"
              _hover={{ filter: "brightness(115%)" }}
              isLoading={isSubmitting}
            >
              Save Changes
            </Button>
          </VStack>
        )}
      </Formik>
    </Box>
  )
}

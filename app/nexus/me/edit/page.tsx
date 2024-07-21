"use client"
import { Box, Input, VStack, VisuallyHidden } from "@chakra-ui/react"
import { useAppDispatch, useAppSelector } from "@/app/_redux"
import CoverAndProfileImage from "../_components/CoverAndProfileImage"
import { useCallback, useRef, useState } from "react"
import EditProfileForm from "../_components/EditProfileForm"
import User from "@/app/_types/User"
import { Formik, FormikHelpers } from "formik"
import { isUnderage } from "@/app/_utils"
import useAxios from "@/app/_hooks/useAxios"
import toast from "react-hot-toast"
import { updateUser } from "@/app/_redux/slices/auth.slice"
import { useRouter } from "next/navigation"

export default function ProfileEdit() {
  const dispatch = useAppDispatch()
  const { user } = useAppSelector((store) => store.auth)
  const profileImageInputRef = useRef<HTMLInputElement | null>(null)
  const coverImageInputRef = useRef<HTMLInputElement | null>(null)
  const [occupation, setOccupation] = useState({
    school: user?.school || "",
    occupation: user?.occupation || "",
    isStudent: user?.isStudent || false,
  })
  const [occupationError, setOccupationError] = useState("")

  const [selectedProfileImage, setSelectedProfileImage] = useState<File | null>(
    null
  )
  const [selectedCoverImage, setSelectedCoverImage] = useState<File | null>(
    null
  )
  const [profileImagePreview, setProfileImagePreview] = useState<string>(
    user?.profileImage?.secure_url || ""
  )
  const [coverImagePreview, setCoverImagePreview] = useState<string>(
    user?.coverImage?.secure_url || ""
  )

  const validateForm = useCallback(
    (values: Partial<User>) => {
      const errors: Partial<User> = {}
      if (!values.firstName) errors.firstName = "Required"
      if (!values.lastName) errors.lastName = "Required"
      if (!values.dob) errors.dob = "Required"
      if (values.dob && isUnderage(values.dob || ""))
        errors.dob = "You must be 16 years or older"
      if (!values.about) errors.about = "Required"
      else if (values.about.length < 50) errors.about = "Too short"
      else if (values.about.length > 1500) errors.about = "Too long"
      if (!values.stateOfOrigin) errors.stateOfOrigin = "Required"
      if (
        (!occupation.isStudent && !occupation.occupation) ||
        (occupation.isStudent && !occupation.school)
      )
        setOccupationError("Required")
      return errors
    },
    [occupation]
  )
  const { fetchData } = useAxios()
  const router = useRouter()
  const handleSubmit = useCallback(
    async (
      values: Partial<User>,
      { setSubmitting }: FormikHelpers<Partial<User>>
    ) => {
      const formData = new FormData()
      Object.keys({ ...values, ...occupation }).forEach((key) => {
        const value =
          values[key as keyof User] ||
          occupation[key as keyof typeof occupation]
        if (value !== undefined) formData.set(key, value?.toString() as string)
      })
      if (selectedCoverImage) formData.append("coverImage", selectedCoverImage)
      if (selectedProfileImage)
        formData.append("profileImage", selectedProfileImage)
      const res = await fetchData({
        url: `/users/${user?._id}`,
        method: "put",
        body: formData,
      })
      if (res.statusCode === 200) {
        dispatch(updateUser(res.user))
        res.message && toast(res.message)
        toast.success("Profile updated successfully")
        router.push("/nexus/me")
      } else
        toast.error(res.message || "Something went wrong 😔 , Pleae try again.")
      setSubmitting(false)
    },
    [
      occupation,
      selectedCoverImage,
      selectedProfileImage,
      fetchData,
      user,
      dispatch,
      router,
    ]
  )

  return (
    <>
      <>
        <Formik
          initialValues={
            {
              firstName: user?.firstName || "",
              lastName: user?.lastName || "",
              dob: user?.dob
                ? new Date(user?.dob || "").toISOString().split("T")[0]
                : "",
              gender: user?.gender || "",
              stateOfOrigin: user?.stateOfOrigin || "",
              about: user?.about || "" || "",
            } as Partial<User>
          }
          validate={validateForm}
          onSubmit={handleSubmit}
        >
          {({ values, errors, handleChange, handleSubmit, isSubmitting }) => (
            <VStack
              as="form"
              onSubmit={(e) => {
                e.preventDefault()
                handleSubmit()
              }}
              w="full"
              pos="relative"
            >
              <Box mb="8.5rem" w="full">
                <Box h={{ lg: "28rem" }}>
                  <CoverAndProfileImage
                    coverImage={coverImagePreview}
                    profileImage={profileImagePreview}
                    showCoverImageEditButton
                    showProfileImageEditButton
                    onProfileImageEditButtonClick={() =>
                      profileImageInputRef.current?.click()
                    }
                    onCoverImageEditButtonClick={() =>
                      coverImageInputRef.current?.click()
                    }
                  />
                </Box>
              </Box>
              <VisuallyHidden>
                <Input
                  type="file"
                  ref={profileImageInputRef}
                  name="profileImage"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) {
                      setSelectedProfileImage(file)
                      const reader = new FileReader()

                      reader.onload = function (e) {
                        if (typeof e.target?.result === "string")
                          setProfileImagePreview(e.target?.result)
                      }
                      reader.readAsDataURL(file)
                    }
                  }}
                />
              </VisuallyHidden>
              <VisuallyHidden>
                <Input
                  type="file"
                  ref={coverImageInputRef}
                  name="coverImage"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) {
                      setSelectedCoverImage(file)
                      const reader = new FileReader()

                      reader.onload = function (e) {
                        console.log(e.target?.result)
                        if (typeof e.target?.result === "string")
                          setCoverImagePreview(e.target?.result)
                      }
                      reader.readAsDataURL(file)
                    }
                  }}
                />
              </VisuallyHidden>
              <EditProfileForm
                values={values}
                handleChange={handleChange}
                errors={errors}
                occupation={occupation}
                handleOccupationOrSchoolSelect={(name, value) => {
                  setOccupation((prev) => ({ ...prev, [name]: value }))
                }}
                occupationError={occupationError}
                isSubmitting={isSubmitting}
              />
            </VStack>
          )}
        </Formik>
      </>
    </>
  )
}

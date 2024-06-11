import { Button, FormLabel, VStack } from "@chakra-ui/react"
import { ProfileModal } from "./AccountSettingsModal"
import { FormEvent, useCallback, useState } from "react"
import { PasswordInput } from "@/app/_components/Auth/SignupInputs"
import { useAppDispatch, useAppSelector } from "@/app/_redux"
import { changePassword } from "@/app/_redux/thunks/auth.thunk"
import { logout } from "@/app/_redux/slices/auth.slice"
import toast from "react-hot-toast"
import ErrorText from "@/app/_components/Auth/ErrorText"

export default function ChangePasswordModal({
  onClose,
  isOpen,
}: {
  isOpen: boolean
  onClose: () => void
}) {
  const [mainError, setMainError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const dispatch = useAppDispatch()
  const { user } = useAppSelector((store) => store.auth)
  const [passwords, setPasswords] = useState({
    old: "",
    new: "",
    confirmNew: "",
  })
  const [passwordErrors, setPasswordErrors] = useState<{ [x: string]: string }>(
    {}
  )
  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault()
      const errors: { [x: string]: string } = {}
      Object.keys(passwords).forEach((key) => {
        if (
          key !== "old" &&
          passwords[key as keyof typeof passwords].length === 0
        )
          errors[key] = "This field is required!"
      })
      if (!user?.ssoProvider && user?.password)
        errors.old = "This field is required"
      if (Object.keys(errors).length > 0) return setPasswordErrors(errors)
      if (passwords.new !== passwords.confirmNew)
        return setPasswordErrors((prev) => ({
          ...prev,
          new: "Passwords not matched",
          confirmNew: "Passwords not matched",
        }))
      const response = await dispatch(
        changePassword({
          oldPassword: passwords.old,
          newPassword: passwords.new,
        })
      )
      setIsSubmitting(false)
      const payload = response.payload as any
      if (payload?.statusCode === 403) {
        toast.error("You are not allowed to perform this action")
        return dispatch(logout())
      } else if (payload?.statusCode !== 200) {
        return setMainError(payload?.message || "")
      } else {
        setPasswordErrors({})
        setPasswords({ old: "", new: "", confirmNew: "" })
        onClose()
      }
    },
    [passwords, dispatch, user?.ssoProvider, user?.password, onClose]
  )
  return (
    <>
      <ProfileModal
        isOpen={isOpen}
        onClose={() => {
          setPasswordErrors({})
          setMainError("")
          setPasswords({
            old: "",
            new: "",
            confirmNew: "",
          })
          onClose()
        }}
        heading={"Change password"}
      >
        <VStack
          gap="1.5rem"
          alignItems="start"
          as="form"
          onSubmit={handleSubmit}
        >
          {mainError && (
            <ErrorText mx="auto" fontSize="1.6rem" textAlign="center">
              {mainError}
            </ErrorText>
          )}
          {!user?.ssoProvider && user?.password && (
            <VStack alignItems="start" w="full" justifyContent="space-between">
              <FormLabel htmlFor="old" fontSize="1.4rem" m="0" fontWeight="600">
                Old password
              </FormLabel>
              <PasswordInput
                id="old"
                type="password"
                value={passwords.old}
                onChange={(e) => {
                  setPasswords((prev) => ({ ...prev, old: e.target.value }))
                  setMainError("")
                }}
                py=".8rem"
                error={passwordErrors.old}
              />
            </VStack>
          )}
          <VStack alignItems="start" w="full" justifyContent="space-between">
            <FormLabel fontSize="1.4rem" m="0" fontWeight="600">
              New password
            </FormLabel>
            <PasswordInput
              id="new"
              type="password"
              value={passwords.new}
              onChange={(e) => {
                setPasswords((prev) => ({ ...prev, new: e.target.value }))
                setMainError("")
              }}
              py=".8rem"
              error={passwordErrors.new}
            />
          </VStack>
          <VStack alignItems="start" w="full" justifyContent="space-between">
            <FormLabel fontSize="1.4rem" m="0" fontWeight="600">
              Confirm new password
            </FormLabel>
            <PasswordInput
              id="confirmNew"
              type="password"
              value={passwords.confirmNew}
              onChange={(e) => {
                setPasswords((prev) => ({
                  ...prev,
                  confirmNew: e.target.value,
                }))
                setMainError("")
              }}
              py=".8rem"
              error={passwordErrors.confirmNew}
            />
          </VStack>
          <Button
            isLoading={isSubmitting}
            mt="2rem"
            variant="brand-secondary"
            type="submit"
            loadingText="Hang on..."
          >
            Change password
          </Button>
        </VStack>
      </ProfileModal>
    </>
  )
}

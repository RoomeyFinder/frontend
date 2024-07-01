"use client"
import InputLabel from "@/app/_components/InputLabel"
import PinInputElement from "@/app/_components/PinInputElement"
import useAxios, { RequestBody } from "@/app/_hooks/useAxios"
import useManageStageFlow from "@/app/_hooks/useManageStageFlow"
import Stage from "@/app/signup/Stage"
import { getErrorProps } from "@/app/signup/utils"
import {
  Flex,
  Heading,
  InputGroup,
  Input,
  Button,
  HStack,
  Text,
} from "@chakra-ui/react"
import {
  ChangeEventHandler,
  FormEventHandler,
  useCallback,
  useMemo,
  useState,
} from "react"

const initialState = {
  oldPassword: "",
  newPassword: "",
  confirmNewPassword: "",
}

export default function PasswordChangeForm() {
  const { fetchData } = useAxios()
  const { currentStage, navigateToStage } = useManageStageFlow({
    maxStage: 3,
    minStage: 1,
    start: 1,
  })
  const [error, setError] = useState(false)
  const [{ oldPassword, newPassword, confirmNewPassword }, setPasswords] =
    useState(initialState)
  const [passwordResetCode, setPasswordResetCode] = useState("")
  const [loading, setLoading] = useState(false)

  const isSubmitDisabled = useMemo(() => {
    if (currentStage === 1) return !oldPassword
    if (currentStage === 2) return !newPassword || !confirmNewPassword
    else return !newPassword || !passwordResetCode
  }, [
    currentStage,
    oldPassword,
    newPassword,
    confirmNewPassword,
    passwordResetCode,
  ])

  const submitButtonText = useMemo(() => {
    if (currentStage === 1) return <>Change Password</>
    else if (currentStage === 2) return <>Next</>
    else return <>Save Changes</>
  }, [currentStage])

  const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      setPasswords((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    },
    []
  )

  const sendRequest = useCallback(
    async (body: {
      oldPassword: string
      newPassword?: string
      passwordResetCode?: string
    }) =>
      await fetchData({
        url: "/users/change-password",
        body: body as RequestBody,
        method: "post",
      }),
    [fetchData]
  )

  const handleSubmitNewPassword: FormEventHandler = useCallback(
    async (e) => {
      e.preventDefault()
      if (newPassword.length <= 0) return setError(true)
      if (newPassword !== confirmNewPassword) return setError(true)
      navigateToStage(3)
    },
    [confirmNewPassword, newPassword, navigateToStage]
  )

  const handleSubmitNewPasswordAndConfirmationCode: FormEventHandler =
    useCallback(
      async (e) => {
        e.preventDefault()
        if (newPassword.length <= 0) return setError(true)
        if (newPassword !== confirmNewPassword) return setError(true)
        setLoading(true)
        const res = await sendRequest({
          oldPassword,
          newPassword,
          passwordResetCode,
        })
        if (res.statusCode === 200) {
          alert(res.message)
          setPasswords(initialState)
          navigateToStage(1)
          setPasswordResetCode("")
          setError(false)
        }
        setLoading(false)
      },
      [
        newPassword,
        oldPassword,
        sendRequest,
        passwordResetCode,
        confirmNewPassword,
        navigateToStage,
      ]
    )

  const handleSubmitOldPassword: FormEventHandler = useCallback(
    async (e) => {
      e.preventDefault()
      if (oldPassword.length === 0) return
      setLoading(true)
      const res = await sendRequest({ oldPassword })
      setError(res.isValidPassword === false)
      if (res.isValidPassword === true) {
        navigateToStage(2)
        setError(false)
      } else setError(true)
      setLoading(false)
    },
    [oldPassword, sendRequest, navigateToStage]
  )

  const handleSubmit: FormEventHandler = useCallback(
    (e) => {
      if (currentStage === 1) return handleSubmitOldPassword(e)
      if (currentStage === 2) return handleSubmitNewPassword(e)
      if (currentStage === 3)
        return handleSubmitNewPasswordAndConfirmationCode(e)
    },
    [
      currentStage,
      handleSubmitOldPassword,
      handleSubmitNewPassword,
      handleSubmitNewPasswordAndConfirmationCode,
    ]
  )

  return (
    <Flex
      maxW="85.5rem"
      gap={{ base: "1.5rem", lg: "3rem" }}
      flexDir="column"
      as="form"
      onSubmit={handleSubmit}
    >
      <Heading variant="md" as="h2">
        Password
      </Heading>
      <Stage currentStage={currentStage} stage={2}>
        <NewPasswordInputSection
          newPassword={newPassword}
          confirmNewPassword={confirmNewPassword}
          onChange={handleChange}
          error={error}
        />
      </Stage>
      <Stage stage={1} currentStage={currentStage}>
        <OldPasswordInputSection
          value={oldPassword}
          onChange={handleChange}
          error={error}
        />
      </Stage>
      <Stage currentStage={currentStage} stage={3}>
        <ChangePasswordTokenInputSection
          newPassword={newPassword}
          error={error}
          value={passwordResetCode}
          onChange={setPasswordResetCode}
        />
      </Stage>
      <HStack gap="3rem" mt="2.5rem">
        <Button
          isLoading={loading}
          type="submit"
          variant="brand-secondary"
          fontWeight="400"
          maxW={{ base: "15rem", md: "18.5rem" }}
          flexGrow="1"
          flexShrink="0"
          isDisabled={isSubmitDisabled}
        >
          {submitButtonText}
        </Button>
        <Stage stage={3} currentStage={currentStage}>
          <Button
            type="button"
            variant="brand-secondary"
            border="1px solid #7070704D"
            color="gray.main"
            _hover={{ bg: "#7070701D" }}
            bg="transparent"
            fontWeight="400"
            maxW={{ base: "15rem", md: "18.5rem" }}
            flexGrow="1"
            flexShrink="0"
            onClick={() => {
              setPasswords(initialState)
              navigateToStage(1)
            }}
          >
            Cancel
          </Button>
        </Stage>
      </HStack>
    </Flex>
  )
}

function NewPasswordInputSection({
  newPassword,
  confirmNewPassword,
  onChange,
  error,
}: {
  newPassword: string
  confirmNewPassword: string
  onChange: ChangeEventHandler<HTMLInputElement>
  error: boolean
}) {
  return (
    <>
      <InputGroup flexDir="column" gap="1rem">
        <InputLabel>New password</InputLabel>
        <Input
          placeholder="00000000"
          onChange={onChange}
          name="newPassword"
          value={newPassword}
          {...(error ? getErrorProps("newPassword", ["newPassword"]) : {})}
        />
      </InputGroup>
      <InputGroup flexDir="column" gap="1rem">
        <InputLabel>Confirm password</InputLabel>
        <Input
          placeholder="00000000"
          onChange={onChange}
          name="confirmNewPassword"
          value={confirmNewPassword}
          {...(error
            ? getErrorProps("confirmNewPassword", ["confirmNewPassword"])
            : {})}
        />
      </InputGroup>
    </>
  )
}

function OldPasswordInputSection({
  value,
  onChange,
  error,
}: {
  value: string
  onChange: ChangeEventHandler<HTMLInputElement>
  error: boolean
}) {
  return (
    <>
      <InputGroup flexDir="column">
        <InputLabel>Current password</InputLabel>
        <Input
          {...(error ? getErrorProps("oldPassword", ["oldPassword"]) : {})}
          placeholder="00000000"
          name="oldPassword"
          onChange={onChange}
          value={value}
        />
      </InputGroup>
    </>
  )
}

function ChangePasswordTokenInputSection({
  value,
  onChange,
  error,
  newPassword,
}: {
  value: string
  onChange: (val: string) => void
  error: boolean
  newPassword: string
}) {
  return (
    <>
      <InputGroup flexDir="column" gap="1rem">
        <InputLabel>New password</InputLabel>
        <Input readOnly isDisabled name="newPassword" value={newPassword} />
      </InputGroup>
      <InputGroup display="block" mt="1rem">
        <InputLabel>Code</InputLabel>
        <Text
          fontWeight="400"
          fontSize={{ base: "1.4rem", md: "1.6rem" }}
          lineHeight="2.4rem"
          color="gray.100"
          mb="1rem"
        >
          Enter the code from your email
        </Text>
        <PinInputElement
          hasError={error}
          handleChange={(val) => onChange(val)}
          value={value}
        />
      </InputGroup>
    </>
  )
}

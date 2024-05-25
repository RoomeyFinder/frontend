"use client"
import InputLabel from "@/app/_components/InputLabel"
import PinInputElement from "@/app/_components/PinInputElement"
import useAxios, { RequestBody } from "@/app/_hooks/useAxios"
import useManageStageFlow from "@/app/_hooks/useManageStageFlow"
import { UserContext } from "@/app/_providers/UserProvider"
import { useAppDispatch, useAppSelector } from "@/app/_redux"
import { updateUser } from "@/app/_redux/slices/auth.slice"
import Stage from "@/app/signup/Stage"
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
  useContext,
  useMemo,
  useState,
} from "react"
import toast from "react-hot-toast"

export default function EmailChangeForm() {
  const { fetchData } = useAxios()
  const { currentStage, navigateToStage, goToNextStage } = useManageStageFlow({
    maxStage: 3,
    minStage: 1,
    start: 1,
  })
  const { user } = useAppSelector((store) => store.auth)
  const dispatch = useAppDispatch()
  const [error, setError] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [newEmail, setNewEmail] = useState("")
  const [emailVerificationCode, setEmailConfirmationCode] = useState("")
  const [loading, setLoading] = useState(false)

  const isSubmitDisabled = useMemo(() => {
    if (currentStage === 1) return false
    if (currentStage === 2) return !newEmail
    else return !newEmail || !emailVerificationCode
  }, [currentStage, newEmail, emailVerificationCode])

  const submitButtonText = useMemo(() => {
    if (currentStage === 1) return <>Change email address</>
    else if (currentStage === 2) return <>Next</>
    else return <>Save Changes</>
  }, [currentStage])

  const sendRequest = useCallback(
    async (body: { newEmail?: string; emailVerificationCode?: string }) =>
      await fetchData({
        url: body.emailVerificationCode
          ? "/users/confirm-email-change"
          : "/users/request-email-change",
        body: body as RequestBody,
        method: "post",
      }),
    [fetchData]
  )
  const handleSubmitNewEmailAndConfirmationCode = useCallback(async () => {
    if (newEmail.length <= 0)
      return toast.error("Please provide your new email address")
    setLoading(true)
    const res = await sendRequest({
      newEmail,
      emailVerificationCode,
    })
    setError(res.statusCode !== 200)
    if (res.statusCode === 200) {
      toast.success(res.message)
      navigateToStage(1)
      setEmailConfirmationCode("")
      setError(false)
      dispatch(updateUser(res.user))
    }
    setLoading(false)
  }, [newEmail, sendRequest, emailVerificationCode, navigateToStage])

  const handleSubmitNewEmail = useCallback(async () => {
    if (newEmail.length === 0) return
    if (newEmail.toLowerCase() === user?.email.toLowerCase())
      return toast.error(
        "Your new email address must be different from your old email address"
      )
    setLoading(true)
    const res = await sendRequest({ newEmail })
    setError(res.statusCode !== 200)
    if (res.statusCode === 200) {
      navigateToStage(3)
      setError(false)
      toast.success(res.message)
    } else {
      setError(true)
      toast.error(res.message)
    }
    setLoading(false)
  }, [newEmail, sendRequest, navigateToStage, user])

  const handleSubmit: FormEventHandler = useCallback(
    (e) => {
      e.preventDefault()
      if (currentStage === 1) {
        goToNextStage()
        setIsEditing(true)
        return
      }
      if (currentStage === 2) return handleSubmitNewEmail()
      if (currentStage === 3) return handleSubmitNewEmailAndConfirmationCode()
    },
    [
      currentStage,
      handleSubmitNewEmailAndConfirmationCode,
      handleSubmitNewEmail,
      goToNextStage,
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
      <Heading as="h2" mt={{ base: "1.5rem", lg: "3rem" }} variant="large">
        Email
      </Heading>
      <Stage currentStage={currentStage} stage={1}>
        <NewEmailInputSection
          value={user?.email || ""}
          onChange={() => {}}
          error={error}
          isEditing={false}
        />
      </Stage>
      <Stage currentStage={currentStage} stage={2}>
        <NewEmailInputSection
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
          error={error}
          isEditing={isEditing}
        />
      </Stage>
      <Stage currentStage={currentStage} stage={3}>
        <CodeInputSection
          newEmail={newEmail}
          error={error}
          value={emailVerificationCode}
          onChange={setEmailConfirmationCode}
        />
      </Stage>
      <HStack gap="3rem" mt="2.5rem">
        <Button
          isLoading={loading}
          type="submit"
          variant="brand-secondary"
          fontWeight="400"
          maxW={{ base: "22rem", md: "20rem" }}
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
              setIsEditing(false)
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

function NewEmailInputSection({
  value,
  onChange,
  isEditing,
}: {
  value: string
  onChange: ChangeEventHandler<HTMLInputElement>
  error: boolean
  isEditing: boolean
}) {
  return (
    <>
      <InputGroup flexDir="column" gap="1rem">
        {isEditing && <InputLabel>New email</InputLabel>}
        {value}mnnbnbn
        <Input
          placeholder="new@email.com"
          onChange={onChange}
          name="email"
          type="email"
          readOnly={!isEditing}
          isDisabled={!isEditing}
          value={value}
        />
      </InputGroup>
    </>
  )
}

function CodeInputSection({
  error,
  onChange,
  value,
  newEmail,
}: {
  value: string
  onChange: (value: string) => void
  error: boolean
  newEmail: string
}) {
  return (
    <>
      <InputGroup flexDir="column" gap="1rem">
        <InputLabel>New email address</InputLabel>
        <Input readOnly isDisabled name="newEmail" value={newEmail} />
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

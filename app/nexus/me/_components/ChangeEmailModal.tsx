import { Button, FormLabel, Heading, Input, VStack } from "@chakra-ui/react"
import { ProfileModal } from "./AccountSettingsModal"
import useManageStageFlow from "@/app/_hooks/useManageStageFlow"
import { useAppSelector } from "@/app/_redux"
import Stage from "@/app/signup/Stage"
import { ChangeEvent, ChangeEventHandler, useCallback, useState } from "react"
import PinInputElement from "@/app/_components/PinInputElement"
import useAxios from "@/app/_hooks/useAxios"
import { useDispatch } from "react-redux"
import { logout } from "@/app/_redux/slices/auth.slice"
import toast from "react-hot-toast"
import ErrorText from "@/app/_components/Auth/ErrorText"
import { DotLottieReact } from "@lottiefiles/dotlottie-react"
import { PasswordInput } from "@/app/_components/Auth/SignupInputs"

export default function ChangeEmailModal({
  onClose,
  isOpen,
}: {
  isOpen: boolean
  onClose: () => void
}) {
  const { user } = useAppSelector((store) => store.auth)
  const { goToNextStage, currentStage, navigateToStage } = useManageStageFlow({
    maxStage: 2,
    minStage: 1,
    start: !user?.ssoProvider && user?.password ? 1 : 2,
  })

  return (
    <>
      <ProfileModal
        maxWidth="60rem"
        isOpen={isOpen}
        onClose={() => {
          onClose()
          navigateToStage(1)
        }}
        heading={"Change email"}
      >
        <Stage currentStage={currentStage} stage={1}>
          <ValidatePasswordForm onSuccess={goToNextStage} />
        </Stage>
        <Stage currentStage={currentStage} stage={2}>
          <NewEmailForm onClose={onClose} />
        </Stage>
      </ProfileModal>
    </>
  )
}

function ValidatePasswordForm({ onSuccess }: { onSuccess: () => void }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const dispatch = useDispatch()
  const { fetchData } = useAxios()
  const handleSubmit = useCallback(async () => {
    if (!password) return setError("This field is required!")
    setIsSubmitting(true)
    const res = await fetchData({
      url: "/users/validate-password",
      method: "post",
      body: { password },
    })
    setIsSubmitting(false)
    if (res.statusCode === 403) {
      toast.error(res.message)
      return dispatch(logout())
    }
    if (res.statusCode !== 200) return setError(res.message)
    else onSuccess()
  }, [onSuccess, password, dispatch, fetchData])

  return (
    <VStack
      gap="1.5rem"
      alignItems="start"
      as="form"
      onSubmit={(e) => {
        e.preventDefault()
        handleSubmit()
      }}
    >
      <VStack alignItems="start" w="full" justifyContent="space-between">
        <FormLabel fontSize="1.4rem" m="0" fontWeight="600">
          Enter password
        </FormLabel>
        <PasswordInput
          error={error}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          py=".8rem"
          type="password"
        />
      </VStack>
      <Button
        mt="1rem"
        variant="brand-secondary"
        type="submit"
        isLoading={isSubmitting}
        loadingText="Checking..."
      >
        Continue
      </Button>
    </VStack>
  )
}

function NewEmailForm({ onClose }: { onClose: () => void }) {
  const { goToNextStage, currentStage } = useManageStageFlow({
    maxStage: 3,
    minStage: 1,
    start: 1,
  })
  const [email, setEmail] = useState("")
  const [verificationCode, setVerificationCode] = useState("")
  return (
    <>
      <Stage currentStage={currentStage} stage={1}>
        <NewEmailCheckForm
          email={email}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
          onSuccess={goToNextStage}
        />
      </Stage>
      <Stage currentStage={currentStage} stage={2}>
        <VerificationForm
          email={email}
          verificationCode={verificationCode}
          onChange={(val: string) => setVerificationCode(val)}
          onSuccess={goToNextStage}
        />
      </Stage>
      <Stage currentStage={currentStage} stage={3}>
        <Success onClose={onClose} />
      </Stage>
    </>
  )
}

function NewEmailCheckForm({
  email,
  onChange,
  onSuccess,
}: {
  email: string
  onChange: ChangeEventHandler<HTMLInputElement>
  onSuccess: () => void
}) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  const dispatch = useDispatch()
  const { fetchData } = useAxios()
  const handleSubmit = useCallback(async () => {
    if (!email) return setError("This field is required!")
    setIsSubmitting(true)
    const res = await fetchData({
      url: "/users/request-email-change",
      method: "post",
      body: { newEmail: email },
    })
    setIsSubmitting(false)
    if (res.statusCode === 403) {
      toast.error(res.message)
      return dispatch(logout())
    }
    if (res.statusCode !== 200) return setError(res.message)
    else onSuccess()
  }, [onSuccess, email, dispatch, fetchData])

  return (
    <VStack
      gap="1.5rem"
      alignItems="start"
      as="form"
      onSubmit={(e) => {
        e.preventDefault()
        handleSubmit()
      }}
    >
      <VStack alignItems="start" w="full" justifyContent="space-between">
        <FormLabel fontSize="1.4rem" m="0" fontWeight="600">
          New email
        </FormLabel>
        <Input py=".8rem" type="email" value={email} onChange={onChange} />
        {error && <ErrorText fontSize="1.4rem">{error}</ErrorText>}
      </VStack>
      <Button
        isLoading={isSubmitting}
        mt="1rem"
        variant="brand-secondary"
        type="submit"
      >
        Continue
      </Button>
    </VStack>
  )
}
function VerificationForm({
  verificationCode,
  onChange,
  onSuccess,
  email,
}: {
  verificationCode: string
  onChange: (val: string) => void
  onSuccess: () => void
  email: string
}) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  const dispatch = useDispatch()
  const { fetchData } = useAxios()
  const handleSubmit = useCallback(async () => {
    console.log("here", verificationCode)
    setIsSubmitting(true)
    if (!verificationCode || verificationCode.length <= 5)
      return setError("This field is required!")
    const res = await fetchData({
      url: "/users/confirm-email-change",
      method: "post",
      body: { emailVerificationCode: verificationCode, newEmail: email },
    })
    setIsSubmitting(false)
    if (res.statusCode === 403) {
      toast.error(res.message)
      return dispatch(logout())
    }
    if (res.statusCode !== 200) return setError(res.message)
    else onSuccess()
  }, [onSuccess, email, verificationCode, fetchData, dispatch])

  return (
    <VStack
      gap="1.5rem"
      alignItems="start"
      as="form"
      onSubmit={(e) => {
        e.preventDefault()
        handleSubmit()
      }}
    >
      <VStack alignItems="start" w="full" justifyContent="space-between">
        <FormLabel fontSize="1.4rem" m="0" fontWeight="600">
          Verification code
        </FormLabel>
        <PinInputElement
          handleChange={(val) => onChange(val)}
          hasError={error.length > 0}
          value={verificationCode}
        />
        {error && <ErrorText>{error}</ErrorText>}
      </VStack>
      {verificationCode}
      <Button
        mt="1rem"
        variant="brand-secondary"
        type="submit"
        loadingText="Hang on..."
        isLoading={isSubmitting}
      >
        Continue
      </Button>
    </VStack>
  )
}

function Success({ onClose }: { onClose: () => void }) {
  return (
    <VStack gap=".5rem">
      <Heading p="0" mb="3rem" fontSize="2rem">
        Email changed successfully
      </Heading>
      <iframe
        style={{ display: "none" }}
        src="https://lottie.host/embed/be4d6a34-b38c-42b6-b9ae-6853a88c2817/0Cq18RxMyP.json"
      ></iframe>
      <DotLottieReact
        src="https://lottie.host/be4d6a34-b38c-42b6-b9ae-6853a88c2817/0Cq18RxMyP.json"
        loop={!true}
        autoplay
      />
      <Button variant="brand" onClick={onClose}>
        Done
      </Button>
    </VStack>
  )
}

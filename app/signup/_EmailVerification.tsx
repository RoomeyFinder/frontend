import { Box, HStack, Text } from "@chakra-ui/react"
import Countdown, { CountdownRendererFn } from "react-countdown"
import { PinInput, PinInputField } from "@chakra-ui/react"
import { useCallback, useEffect, useRef, useState } from "react"

export default function EmailVerficationForm({
  formData, sectionName, handleChange, error, resendVerificationEmail
}: {
  formData: { [x: string]: string | number | boolean, }
  sectionName: string,
  handleChange: (stageName: string, name: string, value: string | number | boolean) => void
  error: string[],
  resendVerificationEmail: () => void
}) {
  const handleResendClick = useCallback(() => {
    resendVerificationEmail()
  }, [resendVerificationEmail])

  return (
    <Box pb={{ base: "3rem", md: "4.7rem" }}>
      <Text color="gray.100" fontSize={{ base: "1.4rem", md: "1.6rem" }}>Enter the code from your email</Text>
      <HStack mt="2rem">
        <PinInput onChange={(value) => handleChange(sectionName, "verificationToken", value)} value={formData.verificationToken as string} autoFocus placeholder="" aria-label="Please enter the code sent to your email">
          <PinInputField borderColor={error.includes("verificationToken") ? "red" : "gray.100"} mr={{ base: ".8rem", md: "2rem" }} w={{ base: "5rem", md: "6.5rem" }} h={{ base: "5rem", md: "6.5rem" }} rounded="1.2rem" bg="white.300" fontSize="2rem" />
          <PinInputField borderColor={error.includes("verificationToken") ? "red" : "gray.100"} mr={{ base: ".8rem", md: "2rem" }} w={{ base: "5rem", md: "6.5rem" }} h={{ base: "5rem", md: "6.5rem" }} rounded="1.2rem" bg="white.300" fontSize="2rem" />
          <PinInputField borderColor={error.includes("verificationToken") ? "red" : "gray.100"} mr={{ base: ".8rem", md: "2rem" }} w={{ base: "5rem", md: "6.5rem" }} h={{ base: "5rem", md: "6.5rem" }} rounded="1.2rem" bg="white.300" fontSize="2rem" />
          <PinInputField borderColor={error.includes("verificationToken") ? "red" : "gray.100"} mr={{ base: ".8rem", md: "2rem" }} w={{ base: "5rem", md: "6.5rem" }} h={{ base: "5rem", md: "6.5rem" }} rounded="1.2rem" bg="white.300" fontSize="2rem" />
          <PinInputField borderColor={error.includes("verificationToken") ? "red" : "gray.100"} mr={{ base: ".8rem", md: "2rem" }} w={{ base: "5rem", md: "6.5rem" }} h={{ base: "5rem", md: "6.5rem" }} rounded="1.2rem" bg="white.300" fontSize="2rem" />
          <PinInputField borderColor={error.includes("verificationToken") ? "red" : "gray.100"} mr={{ base: ".8rem", md: "2rem" }} w={{ base: "5rem", md: "6.5rem" }} h={{ base: "5rem", md: "6.5rem" }} rounded="1.2rem" bg="white.300" fontSize="2rem" />
        </PinInput>
      </HStack>
      <ResendCodeButton onClick={handleResendClick} />

    </Box>
  )
}

function ResendCodeButton({ onClick }: {
  onClick: () => void
}) {
  const countRef = useRef<Countdown | null>(null)
  const [time, setTime] = useState(Date.now() + 180000)
  const renderer: CountdownRendererFn = ({ completed, minutes, seconds }) => {
    return (
      <Text as="button" disabled={!completed} onClick={() => { 
        setTime(Date.now() + 180000)
        onClick() 
      }} mt="3rem" color="black" _disabled={{ cursor: "text", }} fontSize={{ base: "1.4rem", md: "1.6rem" }}>
        {
          completed ?
            <>Resend Code</> :
            <><Text color="gray.100" as="span">Resend Code ( {minutes}:{seconds} )</Text></>
        }
      </Text>
    )
  }
  useEffect(() => {
    countRef?.current?.start()
  }, [time])

  return (
    <Countdown
      renderer={renderer}
      date={time}
      zeroPadTime={2}
      ref={countRef}
    />
  )
}
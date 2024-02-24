import { Box, Text } from "@chakra-ui/react"
import Countdown, { CountdownRendererFn } from "react-countdown"
import { useCallback, useEffect, useRef, useState } from "react"
import PinInputElement from "../_components/PinInputElement"

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
      <Text color="gray.100" fontSize={{ base: "1.4rem", md: "1.6rem" }} mb="2rem">
        Enter the code from your email
      </Text>
      <PinInputElement
        hasError={error.includes("verificationToken")}
        handleChange={val => handleChange(sectionName, "verificationToken", val)}
        value={formData.verificationToken as string}
      />
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
import { Box, Text } from "@chakra-ui/react"
import Countdown, { CountdownRendererFn } from "react-countdown"
import { useCallback, useEffect, useRef, useState } from "react"
import PinInputElement from "../_components/PinInputElement"
import ErrorText from "../_components/Auth/ErrorText"
import { formatNumberToTwoDigits } from "../_utils"

export default function EmailVerficationForm({
  formData,
  sectionName,
  handleChange,
  error,
  resendVerificationEmail,
}: {
  formData: { [x: string]: string | number | boolean }
  sectionName: string
  handleChange: (
    stageName: string,
    name: string,
    value: string | number | boolean
  ) => void
  error: { [x: string]: string }
  resendVerificationEmail: () => void
}) {
  const handleResendClick = useCallback(() => {
    resendVerificationEmail()
  }, [resendVerificationEmail])

  return (
    <Box pb={{ base: "3rem", md: "4.7rem" }}>
      <Text
        color="gray.100"
        fontSize={{ base: "1.4rem", md: "1.6rem" }}
        mb="2rem"
      >
        Enter the code from your email
      </Text>
      <PinInputElement
        hasError={error.verificationToken?.length > 0}
        handleChange={(val) =>
          handleChange(sectionName, "verificationToken", val)
        }
        value={formData.verificationToken as string}
      />
      {error.verificationToken && (
        <ErrorText>{error.verificationToken}</ErrorText>
      )}
      <br />
      <ResendCodeButton onClick={handleResendClick} />
    </Box>
  )
}

export function ResendCodeButton({ onClick }: { onClick: () => void }) {
  const countRef = useRef<Countdown | null>(null)
  const [time, setTime] = useState(Date.now() + 180000)
  const renderer: CountdownRendererFn = ({ completed, minutes, seconds }) => {
    return (
      <Text
        as="button"
        type="button"
        cursor="pointer"
        disabled={!completed}
        _disabled={{
          cursor: "not-allowed",
        }}
        onClick={() => {
          setTime(Date.now() + 180000)
          onClick()
        }}
        color="#222222"
        fontSize={{ base: "1.4rem", md: "1.6rem" }}
      >
        {completed ? (
          <>Resend Code</>
        ) : (
          <>
            <Text color="gray.100" as="span">
              Resend Code ( {formatNumberToTwoDigits(minutes)}:
              {formatNumberToTwoDigits(seconds)} )
            </Text>
          </>
        )}
      </Text>
    )
  }
  useEffect(() => {
    countRef?.current?.start()
  }, [time])

  return (
    <Countdown renderer={renderer} date={time} zeroPadTime={2} ref={countRef} />
  )
}

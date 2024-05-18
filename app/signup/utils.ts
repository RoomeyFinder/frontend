import { BoxProps, InputProps } from "@chakra-ui/react"

export const getErrorProps = (
  name: string,
  errorList: string[]
): { [x: string]: string } => {
  if (errorList.includes(name))
    return {
      borderColor: "red",
      invalid: "true",
      "aria-errormessage": `${name} is required`,
    }
  else return {}
}
export const getErrorPropsV1 = (
  errorMsg: string,
): BoxProps & InputProps => {
  if (errorMsg)
    return {
      borderColor: "red",
      isInvalid: true,
    }
  else return {}
}

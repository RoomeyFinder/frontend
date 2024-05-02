

export const getErrorProps = (name: string, errorList: string[]): { [x: string]: string } => {
  if (errorList.includes(name)) return { borderColor: "red", "invalid": "true", "aria-errormessage": `${name} is required` }
  else return {}
}
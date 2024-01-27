


export default interface User {
  firstName: string
  lastName: string
  dob: string
  phoneNumber: string
  countryCode: string
  gender: string
  email: string
  isStudent: boolean
  school: string
  occupation: string
  currentAddress: string
  lifestyleTags?: {value: string, category: string}[]
  about: string
}
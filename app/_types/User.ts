


export default interface User {
  profileImage: {
    secure_url: string
    id: string
    _id: string
  }
  firstName: string
  lastName: string
  dob: string
  phoneNumber: string
  countryCode: string
  gender: "male" | "female"
  email: string
  isStudent: boolean
  school: string
  occupation: string
  stateOfOrigin: string
  countryOfOrigin: string
  currentAddress: string
  lifestyleTags?: { value: string; category: string }[]
  about: string
  interestCount: number
  photos: {
    secure_url: string
    id: string
    _id: string
  }[]
  _id: string
  isVisible: boolean
}
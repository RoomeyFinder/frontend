


export default interface User {
  profileImage: {
    secure_url: string
    id: string
    _id: string
  },
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
  lifestyleTags?: { value: string; category: string }[]
  about: string
  photos: {
    secure_url: string
    id: string
    _id: string
  }[]
  _id: string
}
import appendSharedMetaData from "../_metadata"
import SignupClient from "./SignupClient"

export async function generateMetadata() {
  return appendSharedMetaData({
    title: "Join Roomeyfinder • Roomeyfinder",
    description:
      "Join Roomeyfinder today! Create an account to find your perfect living arrangement, connect with potential roommates, and list your property with ease.",
  })
}

export default function SignupPage() {
  return <SignupClient />
}

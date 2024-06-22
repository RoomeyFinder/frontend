import appendSharedMetaData from "../_metadata"
import SignupClient from "./SignupClient"

export async function generateMetadata() {
  return appendSharedMetaData({
    title: "Join Roomeyfinder - Roomeyfinder"
  })
}

export default function SignupPage() {
  return <SignupClient />
}

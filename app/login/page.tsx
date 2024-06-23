import appendSharedMetaData from "../_metadata"
import LoginClient from "./LoginClient"

export async function generateMetadata() {
  return appendSharedMetaData({
    title: "Sign in to Roomeyfinder • Roomeyfinder",
    description:
      "Access your Roomeyfinder account to find your perfect living arrangement. Sign in now to connect with potential roommates, browse available rooms, and manage your listings.",
  })
}

export default function Login() {
  return (
    <>
      <LoginClient />
    </>
  )
}

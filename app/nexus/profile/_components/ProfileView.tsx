import { VStack } from "@chakra-ui/react"
import User from "../../../_types/User"
import ProfileOverview from "./ProfileOverview"
import LifeStyleOverview from "./LifestyleOverview"
import AboutOverview from "./AboutOverview"
import ProfileVisibilityOverview from "./ProfileVisibilityOverview"
import BackButton from "@/app/_components/BackButton"

export default function ProfileView({
  userData,
  isOwner,
}: {
  userData: User
  isOwner: boolean
}) {
  return (
    <VStack
      py="4rem"
      alignItems="start"
      gap="4rem"
      w={{ base: "95dvw", sm: "75%", md: "64%" }}
      mx="auto"
    >
      <BackButton />
      <ProfileOverview
        userData={userData}
        isOwner={isOwner}
        hasSentInterest={false}
      />
      <LifeStyleOverview userData={userData} />
      <AboutOverview userData={userData} />
      {isOwner && <ProfileVisibilityOverview />}
    </VStack>
  )
}

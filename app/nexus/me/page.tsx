"use client"
import { Flex, Grid, GridItem, Spinner } from "@chakra-ui/react"
import { Suspense, useState } from "react"
import { useAppSelector } from "../../_redux"
import ProfileInfoSection from "./_components/ProfileInfoSection"
import AccountSection from "./_components/ProfileAccountSection"
import ProfileSettings from "./_components/ProfileSettings"
import ProfileSettingsModal from "./_components/AccountSettingsModal"
import DeleteAcountModal from "./_components/DeleteAccountModal"
import ChangePasswordModal from "./_components/ChangePasswordModal"
import ChangeEmailModal from "./_components/ChangeEmailModal"
import PageLoader from "@/app/_components/PageLoader"

export default function Profile() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Renderer />
    </Suspense>
  )
}

function Renderer() {
  const { user } = useAppSelector((store) => store.auth)
  const [showProfileSettings, setShowProfileSettings] = useState(false)
  const [showDeleteAccount, setShowDeleteAccount] = useState(false)
  const [showChangeEmail, setShowChangeEmail] = useState(false)
  const [showChangePassword, setShowChangePassword] = useState(false)

  return (
    <>
      <Grid
        overflow="auto"
        templateRows={{ sm: "repeat(2, 1fr)" }}
        templateColumns={{ sm: "repeat(4, 1fr)" }}
        gap={{ base: 6, md: 12 }}
        w="98%"
        mx="auto"
        bg="#3a86ff0d"
        h="calc(100dvh - 8.5rem)"
        rounded="1.2rem"
        px={{ base: "1rem", md: "2.4rem" }}
        py={{ base: "1rem", md: "2.4rem" }}
        pos="relative"
      >
        <GridItem
          pos="relative"
          zIndex={1}
          rowSpan={2}
          colSpan={2}
          bg="white"
          rounded="2.5rem"
          shadow="sm"
        >
          <ProfileInfoSection user={user} />
        </GridItem>
        <GridItem
          colSpan={2}
          bg="white"
          rounded="2.5rem"
          shadow="sm"
          py="3rem"
          px={{ base: "1.2rem" }}
          pos="relative"
          zIndex={1}
        >
          <AccountSection
            handleChangeEmailClick={() => setShowChangeEmail(true)}
            handleChangePasswordClick={() => setShowChangePassword(true)}
          />
        </GridItem>
        <GridItem
          colSpan={2}
          bg="white"
          rounded="2.5rem"
          shadow="sm"
          py="3rem"
          px={{ base: "1.2rem" }}
          pos="relative"
          zIndex={1}
        >
          <ProfileSettings
            user={user}
            handleProfileSettingsClick={() => setShowProfileSettings(true)}
            handleDeleteAccountClick={() => setShowDeleteAccount(true)}
          />
        </GridItem>
      </Grid>
      <ProfileSettingsModal
        isOpen={showProfileSettings}
        onClose={() => setShowProfileSettings(false)}
      />
      <DeleteAcountModal
        isOpen={showDeleteAccount}
        onClose={() => setShowDeleteAccount(false)}
      />
      <ChangePasswordModal
        isOpen={showChangePassword}
        onClose={() => setShowChangePassword(false)}
      />
      <ChangeEmailModal
        isOpen={showChangeEmail}
        onClose={() => setShowChangeEmail(false)}
      />
    </>
  )
}

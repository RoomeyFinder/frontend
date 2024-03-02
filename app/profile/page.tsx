"use client"
import { useSearchParams } from "next/navigation"
import ProfileEditForm from "./_components/ProfileEditForm"
import { Box, Flex, Spinner } from "@chakra-ui/react"
import { Suspense, useContext } from "react"
import { UserContext } from "../_providers/UserProvider"
import ProfileView from "./_components/ProfileView"

export default function Profile() {
  return (
    <Suspense
      fallback={
        <Flex justifyContent="center" alignItems="center">
          <Spinner size="xl" thickness=".4rem" />
        </Flex>
      }
    >
      <Renderer />
    </Suspense>
  )
}

function Renderer() {
  const { loading, user, updateUser } = useContext(UserContext)
  const searchParams = useSearchParams()
  if (loading) {
    return (
      <Flex justifyContent="center" alignItems="center">
        <Spinner size="xl" thickness=".4rem" />
      </Flex>
    )
  }
  if (searchParams.get("edit") === "true" && user !== null) {
    return (
      <Box>
        <ProfileEditForm updateUser={updateUser} userData={user} />
      </Box>
    )
  }
  if (user)
    return (
      <>
        <ProfileView userData={user} isOwner={true} />
      </>
    )
  return (
    <Flex justifyContent="center" alignItems="center">
      <Spinner size="xl" thickness=".4rem" />
    </Flex>
  )
}

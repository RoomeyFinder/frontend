"use client"
import { useSearchParams } from "next/navigation"
import ProfileEditForm from "./_components/ProfileEditForm"
import { Box, Flex, Spinner } from "@chakra-ui/react"
import { Suspense } from "react"
import ProfileView from "./_components/ProfileView"
import { useAppDispatch, useAppSelector } from "../../_redux"
import { updateUser } from "../../_redux/slices/auth.slice"
import User from "../../_types/User"

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
  const { loading, user } = useAppSelector((store) => store.auth)
  const dispatch = useAppDispatch()
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
        <ProfileEditForm
          updateUser={(data: User) => dispatch(updateUser(data))}
          userData={user}
        />
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

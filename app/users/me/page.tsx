"use client"
import { useAppSelector } from "@/app/_redux"
import UserOverview from "../_components/UserOverview"
import { Flex } from "@chakra-ui/react"
import Loading from "@/app/_assets/SVG/Loading"

export default function UserViewPage() {
  const { user, loading } = useAppSelector((store) => store.auth)
  const { listings } = useAppSelector((store) => store.listings)
  if (loading)
    return (
      <Flex w="full" justifyContent="center" alignItems="center">
        <Loading />
      </Flex>
    )
  return (
    <>
      {user && (
        <UserOverview
          isOwnProfile
          isLoggedIn
          usersListings={listings}
          user={user}
        />
      )}
    </>
  )
}

"use client"
import UserOverview from "../_components/UserOverview"
import { Heading, Text, VStack } from "@chakra-ui/react"
import { useParams } from "next/navigation"
import { useCallback, useEffect, useMemo, useState } from "react"
import useAxios from "@/app/_hooks/useAxios"
import User from "@/app/_types/User"
import { Listing } from "@/app/_types/Listings"
import NoResults from "@/app/_assets/SVG/NoResults"
import { useAppSelector } from "@/app/_redux"
import PageLoader from "@/app/_components/PageLoader"

export default function UserViewPage() {
  const { user: userInState } = useAppSelector((store) => store.auth)
  const params = useParams()
  const userId = useMemo(() => params.userId, [params])
  const { fetchData } = useAxios()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<(User & { listings: Listing[] }) | null>(
    null
  )
  const fetchUserById = useCallback(async () => {
    const res = await fetchData({
      url: `/users/${userId}`,
      method: "get",
    })
    if (res.statusCode === 200) {
      setUser(res.user)
    } else {
      setError(res.message || "User not found")
    }
    setLoading(false)
  }, [userId, fetchData])
  useEffect(() => {
    fetchUserById()
  }, [fetchUserById])
  if (loading) return <PageLoader />
  if (!user)
    return (
      <VStack w="full" maxW="50rem" mx="auto">
        <Heading
          mx="auto"
          textAlign="center"
          pt="2rem"
          fontSize="2.8rem"
          fontWeight="600"
        >
          Oops!
        </Heading>
        <NoResults />
        <Text
          mx="auto"
          textAlign="center"
          pt="2rem"
          fontSize="2rem"
          fontWeight="600"
        >
          {error}
        </Text>
      </VStack>
    )
  return (
    <>
      {user && (
        <UserOverview
          isOwnProfile={userInState?._id === user._id}
          isLoggedIn
          usersListings={user?.listings}
          user={user}
        />
      )}
    </>
  )
}

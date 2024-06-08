"use client"
import UserOverview from "../_components/UserOverview"
import { Flex, Heading, Text, VStack } from "@chakra-ui/react"
import Loading from "@/app/_assets/SVG/Loading"
import { useParams } from "next/navigation"
import { useCallback, useEffect, useMemo, useState } from "react"
import useAxios from "@/app/_hooks/useAxios"
import User from "@/app/_types/User"
import { Listing } from "@/app/_types/Listings"
import NoResults from "@/app/_assets/SVG/NoResults"

export default function UserViewPage() {
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
  }, [])
  if (loading)
    return (
      <Flex w="full" justifyContent="center" alignItems="center">
        <Loading />
      </Flex>
    )
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
        <UserOverview isLoggedIn usersListings={user?.listings} user={user} />
      )}
    </>
  )
}

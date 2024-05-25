"use client"
import { useParams } from "next/navigation"
import { Flex, Spinner } from "@chakra-ui/react"
import { Suspense, useContext, useMemo } from "react"
import ProfileView from "../_components/ProfileView"
import { SearchContext } from "../../../_providers/SearchProvider"
import { UserContext } from "@/app/_providers/UserProvider"
import { FavoritesContext } from "@/app/_providers/FavoritesProvider"
import User from "@/app/_types/User"
import Empty from "@/app/_components/Empty"
import NotFound from "@/app/_assets/SVG/NotFound"

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
  const { roomies, loadingRoomies } = useContext(SearchContext)
  const { user: loggedInUser } = useContext(UserContext)
  const { favorites } = useContext(FavoritesContext)
  const params = useParams()
  const user = useMemo(() => {
    return (
      roomies.find((it) => it._id === params.userId) ||
      (favorites?.find((it) => it.doc?._id === params.userId)?.doc as User)
    )
  }, [favorites, params.userId, roomies])

  if (loadingRoomies) {
    return (
      <Flex justifyContent="center" alignItems="center">
        <Spinner size="xl" thickness=".4rem" />
      </Flex>
    )
  }
  if (!user)
    return (
      <>
        <Empty icon={<NotFound />} heading="Oops" text="User was not found" />
      </>
    )
  return (
    <>
      <ProfileView userData={user} isOwner={loggedInUser?._id === user?._id} />
    </>
  )
}

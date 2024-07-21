"use client"
import { useAppSelector } from "@/app/_redux"
import UserOverview from "../_components/UserOverview"
import PageLoader from "@/app/_components/PageLoader"

export default function UserViewPage() {
  const { user, loading } = useAppSelector((store) => store.auth)
  const { listings } = useAppSelector((store) => store.listings)
  if (loading) return <PageLoader />
  return (
    <>
      {user && (
        <UserOverview
          isOwnProfile
          isLoggedIn
          usersListings={listings.filter((it) => it.isActivated && !it.isDraft)}
          user={user}
        />
      )}
    </>
  )
}

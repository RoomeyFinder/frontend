"use client"
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
} from "react"
import useGetFromStorage from "../_hooks/useGetFromStorage"
import useAxios from "../_hooks/useAxios"
import Interest from "../_types/Interest"
import { AuthContext } from "./AuthContext"

export const InterestsContext = createContext<{
  interests: Interest[] | null
  addNewInterest: (interest: Interest) => void
  unsendInterest: (interestId: string) => Promise<void>
  acceptInterest: (interestId: string) => Promise<void>
  declineInterest: (interestId: string) => Promise<void>
  loading: boolean
}>({
  interests: [],
  addNewInterest: () => {},
  unsendInterest: async () => {},
  acceptInterest: async () => {},
  declineInterest: async () => {},
  loading: false,
})

export default function InterestsProvider({
  children,
}: {
  children: ReactNode[] | ReactNode
}) {
  const { isAuthorized } = useContext(AuthContext)
  const {
    data: interests,
    deleteData: deleteAllInterests,
    updateData: updateInterests,
    updateLoading,
    loading,
  } = useGetFromStorage<Interest[]>("RF_USER_INTERESTS")

  const { fetchData } = useAxios()

  const fetchInterests = useCallback(async () => {
    if (loading || !isAuthorized) return
    updateLoading(true)
    const res = await fetchData({
      url: "/interests",
      method: "get",
    })
    if (res.statusCode === 200) {
      updateInterests(res.interests, false)
    }
    updateLoading(false)
  }, [fetchData, updateInterests, interests, isAuthorized])

  const addNewInterest = useCallback(
    (newInterest: Interest) => {
      updateInterests([
        newInterest,
        ...(interests || []).filter(
          (interest) => interest._id !== newInterest._id
        ),
      ])
    },
    [updateInterests, interests]
  )

  const unsendInterest = useCallback(
    async (interestId: string) => {
      if (loading || !isAuthorized) return
      updateLoading(true)
      const res = await fetchData({
        url: `/interests/${interestId}`,
        method: "delete",
      })
      if (res.statusCode === 200) {
        updateInterests(
          interests?.filter((interest) => interest._id !== interestId)
        )
      }
      updateLoading(false)
    },
    [fetchData, updateInterests, interests, isAuthorized]
  )
  const acceptInterest = useCallback(
    async (interestId: string) => {
      if (loading || !isAuthorized) return
      updateLoading(true)
      const res = await fetchData({
        url: `/interests/${interestId}`,
        method: "put",
        body: { accepted: true, seen: true },
      })
      if (res.statusCode === 200) {
        updateInterests(
          (interests || [])?.map((interest) =>
            interest._id === interestId ? res.interest : interest
          )
        )
      }
      updateLoading(false)
    },
    [fetchData, updateInterests, interests, isAuthorized]
  )
  const declineInterest = useCallback(
    async (interestId: string) => {
      if (loading || !isAuthorized) return
      updateLoading(true)
      const res = await fetchData({
        url: `/interests/${interestId}`,
        method: "put",
        body: { declined: true, seen: true },
      })
      if (res.statusCode === 200) {
        updateInterests(
          (interests || [])?.map((interest) =>
            interest._id === interestId ? res.interest : interest
          )
        )
      }
      updateLoading(false)
    },
    [fetchData, updateInterests, interests, isAuthorized]
  )

  useEffect(() => {
    if (!loading && interests === null) fetchInterests()
  }, [interests, loading])
  return (
    <InterestsContext.Provider
      value={{
        interests,
        addNewInterest,
        unsendInterest,
        loading,
        acceptInterest,
        declineInterest,
      }}
    >
      {children}
    </InterestsContext.Provider>
  )
}

"use client"
import { ReactNode, createContext, useCallback, useContext, useEffect } from "react"
import useGetFromStorage from "../_hooks/useGetFromStorage"
import useAxios from "../_hooks/useAxios"
import Interest from "../_types/Interest"
import { AuthContext } from "./AuthContext"

export const InterestsContext = createContext<{
  interests: Interest[] | null
  addNewInterest: (interest: Interest) => void
}>({
  interests: [],
  addNewInterest: () => {},
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
    if(loading || !isAuthorized) return
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

  useEffect(() => {
    if (!loading && interests === null) fetchInterests()
  }, [interests, loading])
  return (
    <InterestsContext.Provider value={{ interests, addNewInterest }}>
      {children}
    </InterestsContext.Provider>
  )
}

"use client"
import { ReactNode, createContext, useCallback, useEffect } from "react"
import useGetFromStorage from "../_hooks/useGetFromStorage"
import useAxios from "../_hooks/useAxios"

export const InterestsContext = createContext<{ interests: any[] | null }>({
  interests: [],
})

export default function InterestsProvider({
  children,
}: {
  children: ReactNode[] | ReactNode
}) {
  const {
    data: interests,
    deleteData: deleteAllInterests,
    updateData: updateInterests,
    updateLoading,
    loading,
  } = useGetFromStorage<any[]>("RF_USER_INTERESTS")

  const { fetchData } = useAxios()

  const fetchInterests = useCallback(async () => {
    const res = await fetchData({
      url: "/interests",
      method: "get",
    })
    if(res.statusCode === 200){
      updateInterests(res.interests)
    }
    console.log(res)
  }, [fetchData, updateInterests, interests])

  useEffect(() => {
    fetchInterests()
  }, [])
  return (
    <InterestsContext.Provider value={{ interests }}>
      {children}
    </InterestsContext.Provider>
  )
}

"use client"
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react"
import useGetFromStorage from "../_hooks/useGetFromStorage"
import useAxios from "../_hooks/useAxios"
import Interest from "../_types/Interest"
import { AuthContext } from "./AuthContext"

export const InterestsContext = createContext<{
  interests: Interest[] | null
  addNewInterest: (interest: Interest) => void
  reloadInterests: () => void
  unsendInterest: (interestId: string) => Promise<void>
  acceptInterest: (interestId: string) => Promise<void>
  declineInterest: (interestId: string) => Promise<void>
  failedToFetch: boolean
  loading: boolean
}>({
  interests: [],
  reloadInterests: () => {},
  addNewInterest: () => {},
  unsendInterest: async () => {},
  acceptInterest: async () => {},
  declineInterest: async () => {},
  loading: false,
  failedToFetch: false,
})

export default function InterestsProvider({
  children,
}: {
  children: ReactNode[] | ReactNode
}) {
  const [failedToFetch, setFailedToFetch] = useState(false)
  const { resetAuthorization, isAuthorized } = useContext(AuthContext)
  const { data: storedInterests, updateData: updateInterests } =
    useGetFromStorage<Interest[]>("RF_USER_INTERESTS")
  const [interests, setInterests] = useState<Interest[]>([])
  const { fetchData, isFetching } = useAxios()

  const fetchInterests = useCallback(async () => {
    // if (isFetching || !isAuthorized) return
    const res = await fetchData({
      url: "/interests",
      method: "get",
    })
    if (res.statusCode === 200) {
      updateInterests(res.interests, false)
      setInterests(res.interests)
    } else if (res.statusCode === 403) resetAuthorization()
    else setFailedToFetch(true)
  }, [fetchData, updateInterests, isAuthorized, isFetching, resetAuthorization])

  const addNewInterest = useCallback(
    (newInterest: Interest) => {
      const update = [
        newInterest,
        ...(interests || []).filter(
          (interest) => interest._id !== newInterest._id
        ),
      ]
      updateInterests([...update])
      setInterests([...update])
    },
    [updateInterests, interests]
  )

  const unsendInterest = useCallback(
    async (interestId: string) => {
      if (isFetching || !isAuthorized) return
      const res = await fetchData({
        url: `/interests/${interestId}`,
        method: "delete",
      })
      if (res.statusCode === 200) {
        const update = interests?.filter(
          (interest) => interest._id !== interestId
        )
        updateInterests([...update])
        setInterests([...update])
      }
    },
    [fetchData, updateInterests, interests, isAuthorized, isFetching]
  )
  const acceptInterest = useCallback(
    async (interestId: string) => {
      if (isFetching || !isAuthorized) return
      const res = await fetchData({
        url: `/interests/${interestId}`,
        method: "put",
        body: { accepted: true, seen: true },
      })
      if (res.statusCode === 200) {
        const update = (interests || [])?.map((interest) =>
          interest._id === interestId ? res.interest : interest
        )
        updateInterests([...update])
        setInterests([...interests])
      }
    },
    [fetchData, updateInterests, interests, isAuthorized, isFetching]
  )
  const declineInterest = useCallback(
    async (interestId: string) => {
      if (isFetching || !isAuthorized) return
      const res = await fetchData({
        url: `/interests/${interestId}`,
        method: "put",
        body: { declined: true, seen: true },
      })
      if (res.statusCode === 200) {
        const update = (interests || [])?.map((interest) =>
          interest._id === interestId ? res.interest : interest
        )
        updateInterests([...update])
        setInterests([...update])
      }
    },
    [fetchData, updateInterests, interests, isAuthorized, isFetching]
  )

  useEffect(() => {
    fetchInterests()
  }, [fetchInterests])

  useEffect(() => {
    if (failedToFetch && !isFetching && storedInterests !== null) {
      setInterests(storedInterests)
    }
  }, [failedToFetch, isFetching, storedInterests])
  return (
    <InterestsContext.Provider
      value={{
        interests,
        addNewInterest,
        unsendInterest,
        loading: isFetching,
        acceptInterest,
        declineInterest,
        failedToFetch,
        reloadInterests: fetchInterests,
      }}
    >
      {children}
    </InterestsContext.Provider>
  )
}

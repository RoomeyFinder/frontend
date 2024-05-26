"use client"
import {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useState,
} from "react"
import useGetFromStorage from "../_hooks/useGetFromStorage"
import useAxios from "../_hooks/useAxios"
import Interest from "../_types/Interest"
import { useAppDispatch, useAppSelector } from "../_redux"
import { logout } from "../_redux/slices/auth.slice"

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
  const dispatch = useAppDispatch()
  const { user } = useAppSelector((store) => store.auth)
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
    } else if (res.statusCode === 403) dispatch(logout())
    else setFailedToFetch(true)
  }, [fetchData, updateInterests, dispatch])

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
      if (isFetching || !user) return
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
    [fetchData, updateInterests, interests, user, isFetching]
  )
  const acceptInterest = useCallback(
    async (interestId: string) => {
      if (isFetching || !user) return
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
    [fetchData, updateInterests, interests, user, isFetching]
  )
  const declineInterest = useCallback(
    async (interestId: string) => {
      if (isFetching || !user) return
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
    [fetchData, updateInterests, interests, user, isFetching]
  )

  useEffect(() => {
    fetchInterests()
    //  eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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

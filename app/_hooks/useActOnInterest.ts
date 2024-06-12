"use client"
import { useCallback, useState } from "react"
import Interest from "../_types/Interest"
import { useAppDispatch } from "../_redux"
import {
  acceptInterest,
  declineInterest,
  unsendInterest,
} from "../_redux/thunks/interests.thunk"

export default function useActOnInterest(interest: Interest) {
  const [loading, setLoading] = useState(false)
  const dispatch = useAppDispatch()
  const handleUnsend = useCallback(async () => {
    if (loading) return
    setLoading(true)
    dispatch(unsendInterest(interest)).then(() => setLoading(false))
  }, [loading, dispatch])

  const handleAccept = useCallback(async () => {
    if (loading) return
    setLoading(true)
    dispatch(acceptInterest(interest)).then(() => setLoading(false))
  }, [loading, dispatch])

  const handleDecline = useCallback(async () => {
    if (loading) return
    setLoading(true)
    dispatch(declineInterest(interest)).then(() => setLoading(false))
  }, [loading, dispatch])

  return { handleAccept, handleDecline, handleUnsend, loading }
}

"use client"
import { useContext, useCallback, useState } from "react"
import { InterestsContext } from "../_providers/InterestsProvider"
import Interest from "../_types/Interest"

export default function useActOnInterest(interest: Interest) {
  const [loading, setLoading] = useState(false)
  const { unsendInterest, acceptInterest, declineInterest } =
    useContext(InterestsContext)
  const handleUnsend = useCallback(async () => {
    if (loading) return
    setLoading(true)
    await unsendInterest(interest?._id)
    setLoading(false)
  }, [interest, unsendInterest, loading])

  const handleAccept = useCallback(async () => {
    if (loading) return
    setLoading(true)
    await acceptInterest(interest?._id)
    setLoading(false)
  }, [interest, acceptInterest, loading])

  const handleDecline = useCallback(async () => {
    if (loading) return
    setLoading(true)
    await declineInterest(interest?._id)
    setLoading(false)
  }, [interest, declineInterest, loading])

  return { handleAccept, handleDecline, handleUnsend, loading }
}

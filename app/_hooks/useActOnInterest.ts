"use client"
import { useCallback, useState } from "react"
// import Interest from "../_types/Interest"

export default function useActOnInterest(
  // interest: Interest
) {
  const [loading, setLoading] = useState(false)
  // const { unsendInterest, acceptInterest, declineInterest } =
  //   useContext(InterestsContext)
  const handleUnsend = useCallback(async () => {
    if (loading) return
    setLoading(true)
    // await unsendInterest(interest?._id)
    setLoading(false)
  }, [loading])

  const handleAccept = useCallback(async () => {
    if (loading) return
    setLoading(true)
    // await acceptInterest(interest?._id)
    setLoading(false)
  }, [loading])

  const handleDecline = useCallback(async () => {
    if (loading) return
    setLoading(true)
    // await declineInterest(interest?._id)
    setLoading(false)
  }, [loading])

  return { handleAccept, handleDecline, handleUnsend, loading }
}

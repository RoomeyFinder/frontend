"use client"
import { ReactNode, useEffect } from "react"
import { useAppDispatch } from "../_redux"
import { checkAuthStatus } from "../_redux/thunks/auth.thunk"

export default function LayoutDispatchProvider({
  children,
}: {
  children: ReactNode | ReactNode[]
}) {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(checkAuthStatus())
  }, [dispatch])
  return <>{children}</>
}

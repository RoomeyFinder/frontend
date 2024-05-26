"use client"
import { ReactNode, useEffect } from "react"
import { useAppDispatch } from "../_redux"
import { checkAuthStatus } from "../_redux/thunks/auth.thunk"
import useProtectRoutes from "../_hooks/useProtectRoutes"

export default function LayoutDispatchProvider({
  children,
}: {
  children: ReactNode | ReactNode[]
}) {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(checkAuthStatus())
  }, [dispatch])
  useProtectRoutes()
  
  return <>{children}</>
}

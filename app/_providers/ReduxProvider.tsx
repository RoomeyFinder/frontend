"use client"
import { Provider } from "react-redux"
import store from "../_redux"
import { ReactNode } from "react"

export default function ReduxProvider({
  children,
}: {
  children: ReactNode | ReactNode[]
}) {
  return <Provider store={store}>{children}</Provider>
}

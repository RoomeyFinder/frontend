"use client"

import { useState, useCallback, useContext } from "react"
import axios, { AxiosHeaders, AxiosRequestConfig } from "axios"
import localforage from "localforage"
import { AuthContext } from "../_providers/AuthContext"

axios.defaults.baseURL = process.env.NEXT_PUBLIC_SERVER_URL

export type RequestBody = AxiosRequestConfig["data"]
export type FetchOptions = {
  url: string
  method: "get" | "post" | "put" | "delete"
  headers?: AxiosHeaders
  baseURL?: string
  body?: RequestBody
}

export default function useAxios() {
  const [isFetching, setIsFetching] = useState(false)
  const { token } = useContext(AuthContext)
  const fetchData = useCallback(
    async ({ url, method, body, headers, baseURL }: FetchOptions) => {
      setIsFetching(true)
      const bearerToken =
        JSON.parse(sessionStorage.getItem("RF_TOKEN") || "null") ||
        (await localforage.getItem("RF_TOKEN"))
      axios.defaults.headers.common["Authorization"] = `Bearer ${bearerToken}`
      try {
        const response = await axios[method](url, body, {
          headers: {
            ...headers,
            authorization: `Bearer ${token || bearerToken}`,
          },
          baseURL: baseURL || process.env.NEXT_PUBLIC_SERVER_URL,
        })
        return await response.data
      } catch (err: any) {
        if (err.message === "Network Error") {
          return {
            message: err.message,
            statusCode: 503,
          }
        }
        console.log(err)
        return err.response.data
      } finally {
        setIsFetching(false)
      }
    },
    [token]
  )

  return { isFetching, fetchData }
}

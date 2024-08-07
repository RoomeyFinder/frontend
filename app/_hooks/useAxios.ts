"use client"

import { useState, useCallback } from "react"
import axios, { AxiosRequestConfig } from "axios"
import { getTokenFromStorage } from "../_utils"

axios.defaults.baseURL = process.env.NEXT_PUBLIC_SERVER_URL

export type RequestBody = AxiosRequestConfig["data"]
export type FetchOptions = {
  url: string
  method: "get" | "post" | "put" | "delete"
  headers?: { [x: string]: string }
  baseURL?: string
  body?: RequestBody
}

export default function useAxios() {
  const [isFetching, setIsFetching] = useState(false)
  const fetchData = useCallback(
    async ({ url, method, body, headers, baseURL }: FetchOptions) => {
      setIsFetching(true)
      try {
        axios.defaults.headers.common["Authorization"] =
          `Bearer ${await getTokenFromStorage()}`
        const response = await axios[method](url, body, {
          ...headers,
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
        return err.response?.data
      } finally {
        setIsFetching(false)
      }
    },
    []
  )

  return { isFetching, fetchData }
}

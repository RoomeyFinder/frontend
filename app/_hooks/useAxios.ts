"use client"

import { useState, useCallback } from "react"
import axios, { AxiosHeaders, AxiosRequestConfig } from "axios"
import useCheckAuthentication from "./useCheckAuthentication"

axios.defaults.baseURL = process.env.NEXT_PUBLIC_SERVER_URL

export type RequestBody = AxiosRequestConfig["data"]

export default function useAxios() {
  const { token } = useCheckAuthentication()
  const [isFetching, setIsFetching] = useState(false)
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
  const fetchData = useCallback(
    async ({
      url,
      method,
      body,
      headers,
      baseURL,
    }: {
      url: string
      method: "get" | "post" | "put" | "delete"
      headers?: AxiosHeaders
      baseURL?: string
      body?: RequestBody
    }) => {
      setIsFetching(true)
      try {
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
        return err.response.data
      } finally {
        setIsFetching(false)
      }
    },
    []
  )

  return { isFetching, fetchData }
}

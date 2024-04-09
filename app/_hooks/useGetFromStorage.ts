/* eslint-disable @typescript-eslint/no-explicit-any */

import localforage from "localforage"
import { useCallback, useEffect, useState } from "react"

export default function useGetFromStorage<T>(key: string) {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<T | null>(null)
  const [isSessionStorage, setIsSessionStorage] = useState<undefined | boolean>(
    undefined
  )

  const updateData = useCallback(
    async (update: any, useSessionStorage?: boolean) => {
      if (isSessionStorage === true || useSessionStorage === true) {
        sessionStorage.setItem(key, JSON.stringify(update))
        setData(update)
        return true
      } else if (isSessionStorage === false || useSessionStorage === false) {
        try {
          localforage.ready(() => {
            localforage.setItem(key, update).then((val) => {
              setData(val)
            })
          })
          return true
        } catch (err) {
          return false
        }
      }
    },
    [isSessionStorage, key]
  )

  const deleteData = useCallback(async () => {
    if (isSessionStorage === true) {
      sessionStorage.removeItem(key)
      setData(null)
      return true
    } else if (isSessionStorage === false) {
      localforage.ready(() => {
        localforage.removeItem(key).then(() => {
          setData(null)
        })
      })
      return true
    }
  }, [isSessionStorage, key])

  const getDataFromWebStore = useCallback(() => {
    const dataInSessionStorage = sessionStorage.getItem(key)
    if (dataInSessionStorage) {
      setIsSessionStorage(true)
      setData(JSON.parse(dataInSessionStorage))
      setLoading(false)
    } else {
      localforage.ready(() =>
        localforage
          .getItem(key)
          .then((val) => {
            setData(val as T)
            setIsSessionStorage(false)
          })
          .catch((err) => {
            console.log(err)
          })
          .finally(() => {
            setLoading(false)
          })
      )
    }
  }, [key])

  useEffect(() => {
    getDataFromWebStore()
  }, [getDataFromWebStore])

  return {
    data,
    updateData,
    deleteData,
    loading,
    isSessionStorage,
    updateLoading: (val?: boolean) =>
      setLoading((prev) => (val !== undefined ? val : !prev)),
  }
}

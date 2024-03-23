"use client"
import { useCallback, useEffect, useState } from "react"
import useAxios, { RequestBody } from "./useAxios"

export default function useManageFetchListings<T>({
  url,
  method,
  resultKey = "results",
  limit = 100,
}: {
  url: string
  method: RequestBody["method"]
  resultKey?: string
  limit?: number
}) {
  const [fetchedPages, setFetchedPages] = useState<number[]>([])
  const [page, setPage] = useState(1)
  const [hasFetchedAll, setHasFetchedAll] = useState(false)
  const [loading, setLoading] = useState(true)
  const [results, setResults] = useState<T[]>([])
  const { fetchData } = useAxios()

  const goToNextPage = useCallback(() => {
    if (hasFetchedAll) return
    setPage((prev) => prev + 1)
  }, [hasFetchedAll])

  const goToPrevPage = useCallback(() => {
    setPage((prev) => (prev > 1 ? prev - 1 : prev))
  }, [])

  const concatQueryObjectToSearchString = useCallback(
    (pathnameWithSearchQuery: string, query: { [x: string]: any }) => {
      const url = new URL(`https://roomeyfinder.com${pathnameWithSearchQuery}`)
      let searchStr = url.search
      Object.entries(query).forEach(([key, value], idx) => {
        if (searchStr.length === 0 && idx === 0)
          searchStr = searchStr + `?${key}=${value}`
        else searchStr = searchStr + `&${key}=${value}`
      })
      return { searchStr, pathname: url.pathname }
    },
    []
  )

  const fetchResults = useCallback(
    async (page: number) => {
      if (fetchedPages.includes(page) || hasFetchedAll) return
      setLoading(true)
      const { searchStr, pathname } = concatQueryObjectToSearchString(url, {
        page,
        limit: limit,
      })
      const res = await fetchData({
        url: `${pathname}${searchStr}`,
        method,
      })
      console.log("fetched")
      if (res.statusCode === 200) {
        setFetchedPages((prev) => [...prev, page])
        const stringifiedResultList = JSON.stringify(res[resultKey])
        setResults((prev) => [
          ...res[resultKey],
          ...prev.filter(
            (it) => !stringifiedResultList.includes((it as any)._id)
          ),
        ])
        if (res[resultKey].length < limit) setHasFetchedAll(true)
      }
      setLoading(false)
    },
    [
      method,
      fetchedPages,
      fetchData,
      url,
      resultKey,
      concatQueryObjectToSearchString,
      hasFetchedAll,
    ]
  )

  useEffect(() => {
    if (fetchedPages.includes(page) === false) fetchResults(page)
  }, [page, fetchedPages, fetchResults])

  return {
    [resultKey]: results,
    loading,
    goToNextPage,
    goToPrevPage,
    hasMore: hasFetchedAll === false,
  }
}

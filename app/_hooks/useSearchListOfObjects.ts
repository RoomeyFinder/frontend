"use client"
import { useState, useCallback, useMemo } from "react"
import { flatten } from "../_utils"

export default function useSearchListOfObjects(
  list: { [x: string]: string }[]
) {
  const [searchText, setSearchText] = useState("")
  const updateSearchText = useCallback(
    (value: string) => setSearchText(value),
    []
  )
  const filteredList = useMemo(() => {
    return flatten(list).filter(
      (it: { [s: string]: unknown } | ArrayLike<unknown>) =>
        JSON.stringify(Object.values(it))
          .toLowerCase()
          .includes(searchText.toLowerCase())
    )
  }, [list, searchText])
  return { updateSearchText, searchText, filteredList }
}

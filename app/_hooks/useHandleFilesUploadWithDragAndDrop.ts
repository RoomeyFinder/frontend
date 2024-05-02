import {
  useState,
  MutableRefObject,
  useCallback,
  DragEventHandler,
  ChangeEventHandler,
  useMemo,
} from "react"

const ONE_MEGABYTE_IN_BYTES = 1048576

export default function useHandleFilesUploadWithDragAndDrop({
  inputRef,
  maxFilesCount,
  maxFileSizeInMegaBytes = 5,
}: {
  inputRef: MutableRefObject<HTMLInputElement | null>
  maxFilesCount: number
  maxFileSizeInMegaBytes?: number
}) {
  const [dragActive, setDragActive] = useState<boolean>(false)
  const [files, setFiles] = useState<File[]>([])
  const hasReachedUploadLimit = useMemo(
    () => files.length >= maxFilesCount,
    [files.length, maxFilesCount]
  )
  const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      e.preventDefault()
      const eventFiles = e.target.files
      if (eventFiles && eventFiles[0]) {
        const currentFiles = [...files]
        for (let i = 0; i < eventFiles["length"]; i++) {
          if (currentFiles.length >= maxFilesCount) {
            break
          }
          if (
            eventFiles[i].size <=
            maxFileSizeInMegaBytes * ONE_MEGABYTE_IN_BYTES
          )
            currentFiles.push(eventFiles[i])
        }
        setFiles(currentFiles)
      }
    },
    [maxFilesCount, files, maxFileSizeInMegaBytes]
  )

  const handleDrop: DragEventHandler = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      for (let i = 0; i < e.dataTransfer.files["length"]; i++) {
        setFiles((prevState: File[]) => [...prevState, e.dataTransfer.files[i]])
      }
    }
  }, [])

  const handleDragLeave: DragEventHandler = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
  }, [])

  const handleDragOver: DragEventHandler = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(true)
  }, [])

  const handleDragEnter: DragEventHandler = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(true)
  }, [])

  const removeFile = useCallback((index: number) => {
    setFiles((prev) => prev.filter((it, idx) => index !== idx))
  }, [])

  const openFileExplorer = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.value = ""
      inputRef.current.click()
    }
  }, [inputRef])

  return {
    dragActive,
    files,
    handleChange,
    handleDrop,
    handleDragLeave,
    handleDragOver,
    handleDragEnter,
    removeFile,
    openFileExplorer,
    hasReachedUploadLimit,
    setFiles: (files: File[]) => setFiles(files),
  }
}

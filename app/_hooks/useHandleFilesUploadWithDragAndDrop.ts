import {
  useState,
  useCallback,
  DragEventHandler,
  ChangeEventHandler,
  useMemo,
} from "react"

const ONE_MEGABYTE_IN_BYTES = 1048576

export default function useHandleFilesUploadWithDragAndDrop({
  maxFilesCount,
  maxFileSizeInMegaBytes = 5,
}: {
  maxFilesCount: number
  maxFileSizeInMegaBytes?: number
}) {
  const [dragActive, setDragActive] = useState<boolean>(false)
  const [isUploading, setIsUploading] = useState(false)
  const [files, setFiles] = useState<File[]>([])
  const hasReachedUploadLimit = useMemo(
    () => files.length >= maxFilesCount,
    [files.length, maxFilesCount]
  )
  const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      e.preventDefault()
      setIsUploading(true)
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
      setIsUploading(false)
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

  return {
    dragActive,
    files,
    handleChange,
    handleDrop,
    handleDragLeave,
    handleDragOver,
    handleDragEnter,
    removeFile,
    hasReachedUploadLimit,
    setFiles: (files: File[]) => setFiles(files),
    isUploading,
  }
}

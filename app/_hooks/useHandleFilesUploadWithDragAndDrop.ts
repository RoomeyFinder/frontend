import { useState, MutableRefObject, useCallback, DragEventHandler, ChangeEventHandler } from "react"

export default function useHandleFilesUploadWithDragAndDrop(inputRef: MutableRefObject<HTMLInputElement | null>){

  const [dragActive, setDragActive] = useState<boolean>(false)
  const [files, setFiles] = useState<File[]>([])

  const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    e.preventDefault()
    console.log("File has been added")
    const eventFiles = e.target.files
    if (eventFiles && eventFiles[0]) {
      console.log(e.target.files)
      for (let i = 0; i < eventFiles["length"]; i++) {
        setFiles((prevState: File[]) => [...prevState, eventFiles[i]])

      }
    }
  }, [])

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

  const removeFile = useCallback((fileName: string) => {
    // const newArr = [...files]
    // newArr.splice(idx, 1)
    // setFiles([])
    // setFiles(newArr)
    setFiles(prev => prev.filter(it => it.name !== fileName))
  }, [])

  const openFileExplorer = useCallback(() => {
    if(inputRef.current){
      inputRef.current.value = ""
      inputRef.current.click()
    }
  }, [inputRef])

  return {
    dragActive, files, handleChange, handleDrop, handleDragLeave, handleDragOver, handleDragEnter, removeFile, openFileExplorer, 
  }
}
"use client"
import { useSearchParams } from "next/navigation"
import DragOverFileInput from "../_components/DragOverFileInput"
import useHandleFilesUploadWithDragAndDrop from "../_hooks/useHandleFilesUploadWithDragAndDrop"
import { useRef } from "react"



export default function Profile(){
  const searchParams = useSearchParams()
  const inputRef = useRef<HTMLInputElement | null>(null)
  const { files, openFileExplorer, handleChange, handleDragOver, handleDrop, handleDragLeave, handleDragEnter, dragActive } = useHandleFilesUploadWithDragAndDrop(inputRef)
  console.log(files, "here")
  if(searchParams.get("edit") === "true"){
    return (
      <>edit profile</>
    )
  }
  return (
    <> 
      <DragOverFileInput dragActive={dragActive} handleDragOver={handleDragOver} handleDrop={handleDrop} handleDragLeave={handleDragLeave} handleDragEnter={handleDragEnter} handleChange={handleChange} inputRef={inputRef} openFileExplorer={openFileExplorer} supportedFileTypes={["jpg", "png", "svg"]}/>
    </>
  )
}
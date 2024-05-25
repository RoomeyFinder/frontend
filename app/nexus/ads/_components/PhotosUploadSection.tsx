import DragOverFileInput from "@/app/_components/DragOverFileInput"
import { VStack, Heading } from "@chakra-ui/react"
import { MutableRefObject, ChangeEventHandler, DragEventHandler } from "react"

export default function PhotosUploadSection({
  dragActive,
  handleDragEnter,
  handleChange,
  handleDragLeave,
  handleDragOver,
  handleDrop,
  openFileExplorer,
  inputRef,
  isDisabled,
}: {
  inputRef: MutableRefObject<HTMLInputElement | null>
  openFileExplorer: () => void
  handleChange: ChangeEventHandler
  handleDragOver: DragEventHandler
  handleDrop: DragEventHandler
  handleDragLeave: DragEventHandler
  handleDragEnter: DragEventHandler
  dragActive: boolean
  isDisabled: boolean
}) {
  return (
    <VStack alignItems="start" gap="2rem">
      <Heading variant="md">Upload Photos</Heading>
      <DragOverFileInput
        dragActive={dragActive}
        handleDragEnter={handleDragEnter}
        handleChange={handleChange}
        handleDragLeave={handleDragLeave}
        handleDragOver={handleDragOver}
        handleDrop={handleDrop}
        inputRef={inputRef}
        openFileExplorer={openFileExplorer}
        isDisabled={isDisabled}
        multiple
        supportedFileTypes={["png", "jpg", "jpeg", "webp"]}
        fileTypePrefix={"image"}
        maxFileSize={3}
      />
    </VStack>
  )
}

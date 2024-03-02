import { Flex, FormLabel, Text } from "@chakra-ui/react"
import FileUploadIcon from "../_assets/SVG/FileUploadIcon"
import {
  ChangeEventHandler,
  DragEventHandler,
  MutableRefObject,
  ReactNode,
} from "react"

export default function DragOverFileInput({
  supportedFileTypes,
  inputRef,
  openFileExplorer,
  handleChange,
  handleDragOver,
  handleDrop,
  handleDragLeave,
  handleDragEnter,
  dragActive,
  fileTypePrefix,
  multiple,
  isDisabled,
  maxFileSize
}: {
  supportedFileTypes: string[]
  inputRef: MutableRefObject<HTMLInputElement | null>
  openFileExplorer: () => void
  handleChange: ChangeEventHandler
  handleDragOver: DragEventHandler
  handleDrop: DragEventHandler
  handleDragLeave: DragEventHandler
  handleDragEnter: DragEventHandler
  dragActive: boolean
  fileTypePrefix: string
  multiple?: boolean
  isDisabled: boolean
  maxFileSize?: number
}) {
  return (
    <>
      <input
        ref={inputRef}
        onChange={handleChange}
        type="file"
        hidden
        multiple={multiple}
        accept={supportedFileTypes
          .map((it) => `${fileTypePrefix || "image"}/${it}`)
          .join(", ")}
        disabled={isDisabled}
      />
      <Flex
        onDragEnter={handleDragEnter}
        onDrop={handleDrop}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        as={FormLabel}
        flexDir="column"
        textAlign="center"
        opacity={dragActive ? ".7" : "1"}
        bg={dragActive ? "brand.10" : ""}
        m="0"
        fontSize={{ base: "1.2rem", md: "1.4rem" }}
        gap=".967rem"
        px={{ base: "2rem", md: "2.5rem" }}
        py={{ sm: "4rem", md: "3rem" }}
        justifyContent="center"
        alignItems="center"
        w="100%"
        maxW="33.7rem"
        minH={{ base: "12rem", lg: "28rem" }}
        border={{ sm: ".1rem solid #D9D9D9", md: ".5rem dashed #D9D9D9" }}
        borderRadius={{ base: "1.2rem", md: "3rem" }}
        lineHeight="normal"
      >
        <FileUploadIcon />
        <Text display={{ base: "none", md: "block" }}>
          Drag files to upload
        </Text>
        <Text display={{ base: "none", md: "block" }}>or</Text>
        <Text
          onClick={openFileExplorer}
          as="button"
          type="button"
          px="3rem"
          py=".639rem"
          borderRadius="10rem"
          border="1px solid black"
        >
          Browse Files
        </Text>
        <Text>
          Max file size:
          <BoldTag> {(maxFileSize || 5)}MB </BoldTag>
          Max File Upload:
          <BoldTag> {4} </BoldTag>
        </Text>
        <Text>
          Supported file types:&nbsp;
          {supportedFileTypes.map((type, idx) => (
            <BoldTag key={idx}>
              {type}
              {idx < supportedFileTypes.length - 1 && <>, </>}
            </BoldTag>
          ))}
        </Text>
      </Flex>
    </>
  )
}

function BoldTag({ children }: { children: ReactNode | ReactNode[] }) {
  return (
    <Text fontWeight="600" as="b" textTransform="uppercase">
      {children}
    </Text>
  )
}

import { Flex, FormLabel, Text } from "@chakra-ui/react"
import FileUploadIcon from "../_assets/FileUploadIcon"
import { ChangeEventHandler, DragEventHandler, MutableRefObject, ReactNode } from "react"


export default function DragOverFileInput({ 
  supportedFileTypes, inputRef, openFileExplorer, 
  handleChange, handleDragOver, handleDrop, 
  handleDragLeave, handleDragEnter, dragActive
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
}){
  return (
    <>
      <input ref={inputRef} onChange={handleChange} type="file" hidden accept={supportedFileTypes.join(" ")} />
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
        fontSize={{ base: "1.2rem", md: "1.6rem" }} 
        gap=".967rem" 
        px={{ base: ".8rem", md: "2.5rem" }} 
        py="7rem" 
        justifyContent="center" 
        alignItems="center" 
        w="100%" maxW="33.7rem" 
        border=".5rem" 
        borderColor="gray.200" 
        borderStyle="dashed" 
        borderRadius="3rem" 
        lineHeight="normal">
        <FileUploadIcon />
        <Text>Drag files to upload</Text>
        <Text>or</Text>
        <Text onClick={openFileExplorer} as="button" px="3rem" py=".639rem" borderRadius="10rem" border="1px solid black">Browse Files</Text>
        <Text>
          Max file size: 
          <BoldTag> {20}MB </BoldTag> 
          Max File Upload:
          <BoldTag> {4} </BoldTag> 
        </Text>
        <Text>
          Supported file types:&nbsp;
          {
            supportedFileTypes.map((type, idx) => 
              <BoldTag key={idx}>
                {type}{idx < supportedFileTypes.length - 1 && <>, </>}
              </BoldTag>)
          }
        </Text>
      </Flex>
    </>
  )
}

function BoldTag({ children }: {
  children: ReactNode | ReactNode[]
}){
  return (
    <Text fontWeight="600" as="b" textTransform="uppercase">{children}</Text>
  )
}
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
} from "@chakra-ui/react"
import { ReactNode, RefObject } from "react"

export default function DropDown({
  trigger,
  children,
  initialFocusRef,
  closeOnBlur,
  closeOnEsc,
  returnFocusOnClose,
  options = [],
}: {
  trigger: ReactNode | ReactNode[]
  children: ({
    isOpen,
    onClose,
  }: {
    isOpen: boolean
    onClose: () => void
  }) => ReactNode | ReactNode[]
  initialFocusRef?: RefObject<{ focus(): void }>
  closeOnBlur?: boolean
  closeOnEsc?: boolean
  returnFocusOnClose?: boolean
  options?: (
    | string
    | number
    | { [x: string]: string | number | (() => ReactNode) }
  )[]
}) {
  return (
    <Popover
      returnFocusOnClose={returnFocusOnClose || false}
      initialFocusRef={initialFocusRef}
      matchWidth
      // trigger="hover"
      closeOnBlur={closeOnBlur || true}
      closeOnEsc={closeOnEsc || true}
    >
      {({ isOpen, onClose }) => (
        <>
          <PopoverTrigger>{trigger}</PopoverTrigger>

          {options?.length > 0 && (
            <PopoverContent boxShadow="lg" w="100%" bg="white" p="0">
              <PopoverBody minW="100%" p="0">
                {children({ isOpen, onClose })}
              </PopoverBody>
            </PopoverContent>
          )}
        </>
      )}
    </Popover>
  )
}

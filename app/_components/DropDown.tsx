import { Popover, PopoverTrigger, PopoverContent, PopoverBody } from "@chakra-ui/react"
import { ReactNode, RefObject } from "react"


export default function DropDownInput({
  trigger,
  children,
  initialFocusRef,
  closeOnBlur,
  closeOnEsc,
  returnFocusOnClose,
}: {
  trigger: ReactNode | ReactNode[]
  children: ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => ReactNode | ReactNode[]
  initialFocusRef?: RefObject<{ focus(): void }>
  closeOnBlur?: boolean
  closeOnEsc?: boolean
  returnFocusOnClose?: boolean
}) {
  return (
    <Popover returnFocusOnClose={returnFocusOnClose || false} initialFocusRef={initialFocusRef} matchWidth trigger="click" closeOnBlur={closeOnBlur || true} closeOnEsc={closeOnEsc || true}>
      {({ isOpen, onClose }) => (
        <>
          <PopoverTrigger>
            {trigger}
          </PopoverTrigger>
          <PopoverContent minW="100%" bg="white" p="0">
            <PopoverBody minW="100%" p="0">
              {children({ isOpen, onClose })}
            </PopoverBody>
          </PopoverContent>
        </>
      )}
    </Popover>
  )
}
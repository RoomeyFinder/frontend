

import { BoxProps, ButtonProps, LinkProps, Button, useStyleConfig } from "@chakra-ui/react"

export default function BrandButton(props: BoxProps & ButtonProps & LinkProps & { variant: string }) {
  const { variant, ...rest } = props
  const styles = useStyleConfig("BrandButton", { variant })
  return <Button __css={styles} {...rest} />
}


import { Button, useStyleConfig } from '@chakra-ui/react'

export default function BrandButton(props: any) {
  const { variant, ...rest } = props
  const styles = useStyleConfig('BrandButton', { variant })
  return <Button __css={styles} {...rest} />
}
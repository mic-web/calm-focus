import styled from 'styled-components'

import React from 'react'

type Props = {
  mt?: number
  mr?: number
  mb?: number
  ml?: number
  className?: string
  css?: string
}

const Box: React.FC<Props> = ({ className, children }) => <div className={className}>{children}</div>

const StyledBox = styled(Box)`
  display: flex;
  margin-top: ${(props) => props.mt && `${props.theme.spacing * props.mt}px`};
  margin-right: ${(props) => props.mr && `${props.theme.spacing * props.mr}px`};
  margin-bottom: ${(props) => props.mb && `${props.theme.spacing * props.mb}px`};
  margin-left: ${(props) => props.ml && `${props.theme.spacing * props.ml}px`};
`

export default StyledBox

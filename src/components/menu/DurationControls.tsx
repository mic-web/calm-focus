import React from 'react'
import { IconButton, SvgIcon, Box } from '@material-ui/core'
import RemoveIcon from '@material-ui/icons/Remove'
import AddIcon from '@material-ui/icons/Add'
import { Phases, EditablePhases } from '../../types'
import NumberInput from '../NumberInput'
import useUpdateMinutes, { useIncreaseMinutes, useDecreaseMinutes } from '../../selectors/useUpdateMinutes'
import usePhaseDuration from '../../selectors/usePhaseDuration'

type Props = {
  phase: Phases.REST | Phases.WORK
  action: 'increase' | 'decrease'
}

export const DecreaseDuration: React.FC<{ phase: EditablePhases }> = (props) => (
  <DurationControls action="decrease" phase={props.phase} />
)

export const IncreaseDuration: React.FC<{ phase: EditablePhases }> = (props) => (
  <DurationControls action="increase" phase={props.phase} />
)

export const PhaseDuration: React.FC<{
  phase: EditablePhases
}> = (props) => {
  const min = 0.2
  const secondsDuration = usePhaseDuration(props.phase)
  const minutesDuration = Math.floor(secondsDuration / 60)
  const update = useUpdateMinutes(props.phase)
  const onChange = React.useCallback(
    (number: number) => {
      if (number < min) {
        update(min)
      } else {
        update(number)
      }
    },
    [update]
  )
  return (
    <Box width={50}>
      <NumberInput outerValue={minutesDuration} min={min} onChange={onChange} />
    </Box>
  )
}

const DurationControls: React.FC<Props> = (props) => {
  const increase = useIncreaseMinutes(props.phase)
  const decrease = useDecreaseMinutes(props.phase)
  if (props.action === 'increase') {
    return (
      <IconButton onClick={increase} title="Increase" color="primary" size="small">
        <SvgIcon>
          <AddIcon />
        </SvgIcon>
      </IconButton>
    )
  }
  return (
    <IconButton onClick={decrease} title="Decrease" color="primary" size="small">
      <SvgIcon>
        <RemoveIcon />
      </SvgIcon>
    </IconButton>
  )
}

export default DurationControls

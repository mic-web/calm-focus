import React from 'react'
import { IconButton, SvgIcon, Box } from '@material-ui/core'
import RemoveIcon from '@material-ui/icons/Remove'
import AddIcon from '@material-ui/icons/Add'
import { Phases, EditablePhases, Minutes } from '../../types'
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
  const secondsDuration = usePhaseDuration(props.phase)
  const minutesDuration: Minutes = secondsDuration / 60
  const update = useUpdateMinutes(props.phase)
  const onBlur = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const parsed = Number.parseFloat(e.target.value)
      if (parsed < 0.25) {
        update(0.25)
      } else {
        update(parsed)
      }
    },
    [update]
  )

  return (
    <Box width={50}>
      {/* Use 0 as min input, as with 0.25, the stepping with arrow keys is confusing */}
      <NumberInput outerValue={minutesDuration} min={0} onBlur={onBlur} precision={2} />
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

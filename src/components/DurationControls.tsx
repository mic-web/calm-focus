import React from 'react'
import { IconButton, SvgIcon, Box } from '@material-ui/core'
import RemoveIcon from '@material-ui/icons/Remove'
import AddIcon from '@material-ui/icons/Add'
import { Types } from '../context/timeReducer'
import { Phases, Seconds, EditablePhases, Minutes } from '../types'
import { AppContext } from '../context/context'
import NumberInput from './NumberInput'

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

const minToSec = (minutes: Minutes): Seconds => minutes * 60

const secToMin = (seconds: Seconds): Minutes => {
  const restSeconds = seconds % 60
  return seconds / 60 - restSeconds
}

export const PhaseDuration: React.FC<{
  phase: EditablePhases
}> = (props) => {
  const { state, dispatch } = React.useContext(AppContext)
  const secondsDuration: Seconds = state.timer.phaseDurations[props.phase]
  const minutesDuration = Math.floor(secondsDuration / 60)
  const update = (minutes: Minutes) =>
    dispatch({
      type: Types.UpdatePhaseSeconds,
      payload: {
        phase: props.phase,
        seconds: minToSec(minutes),
      },
    })
  return (
    <Box width={35}>
      <NumberInput
        outerValue={minutesDuration}
        onChange={(number: number) => {
          if (!Number.isNaN(number)) {
            if (number < 1) {
              update(1)
            } else {
              update(number)
            }
          }
        }}
      />
    </Box>
  )
}

const DurationControls: React.FC<Props> = (props) => {
  const { state, dispatch } = React.useContext(AppContext)
  const duration: Seconds = state.timer.phaseDurations[props.phase]
  const update = (minutes: Minutes) =>
    dispatch({
      type: Types.UpdatePhaseSeconds,
      payload: {
        phase: props.phase,
        seconds: minToSec(minutes),
      },
    })
  const mayDecrease = secToMin(duration) > 1
  const increase = () => update(secToMin(duration) + 1)
  const decrease = () => mayDecrease && update(secToMin(duration) - 1)
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

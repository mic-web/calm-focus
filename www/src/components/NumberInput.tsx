import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { TextField } from '@material-ui/core'

const useStyles = makeStyles(() => ({
  input: {
    textAlign: 'center',
  },
}))

const NumberInput: React.FC<{ value: number; onChange: (value: number) => void }> = (props) => {
  const css = useStyles()

  return (
    <TextField
      type="number"
      value={props.value}
      onChange={(e) => {
        const parsed = Number(e.target.value)
        if (Number.isNaN(parsed)) {
          props.onChange(0)
        } else {
          props.onChange(parsed)
        }
      }}
      InputLabelProps={{
        shrink: true,
      }}
      InputProps={{
        classes: {
          input: css.input,
        },
        inputProps: {
          step: 1,
          min: 1,
        },
      }}
    />
  )
}

export default NumberInput

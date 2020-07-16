import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { TextField } from '@material-ui/core'

const useStyles = makeStyles(() => ({
  input: {
    textAlign: 'center',
  },
}))

const parse = (value: string) => Number.parseFloat(value)

const NumberInput: React.FC<{
  outerValue: number
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  onBlur?: (event: React.ChangeEvent<HTMLInputElement>) => void
  min?: number
  precision: number
}> = ({ outerValue, min = 0, precision, onChange, onBlur }) => {
  const css = useStyles()

  const [tempValue, setTempValue] = React.useState(`${outerValue}`) // Needs to be string to allow temporarily invalid values
  const [editing, setEditing] = React.useState(false)

  React.useEffect(() => {
    if (!editing) {
      setTempValue(`${outerValue}`)
    }
  }, [outerValue, editing])

  const change = React.useCallback(
    (e) => {
      setEditing(true)
      if (onChange) {
        onChange(e)
      }
      setTempValue(e.target.value)
    },
    [onChange]
  )
  const blur = React.useCallback(
    (e) => {
      const parsed = parse(e.target.value)
      // Reset invalid input to previous value on blur
      if (Number.isNaN(parsed)) {
        setTempValue(`${outerValue}`)
        setEditing(false)
      } else if (onBlur) {
        const rounded = Math.round(parsed * 10 ** precision) / 10 ** precision
        if (rounded >= min) {
          e.target.value = rounded
          onBlur(e)
        } else {
          e.target.value = min
          onBlur(e)
        }
        setEditing(false)
      }
    },
    [min, outerValue, precision, onBlur]
  )

  return (
    <TextField
      type="number"
      value={tempValue}
      onChange={change}
      onBlur={blur}
      onKeyDown={(e) => {
        // Handle the keyboard event locally
        e.stopPropagation()
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
          min,
        },
      }}
    />
  )
}

export default NumberInput

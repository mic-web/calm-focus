import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { TextField } from '@material-ui/core'
import _ from 'lodash'

const useStyles = makeStyles(() => ({
  input: {
    textAlign: 'center',
  },
}))

const parse = (value: string) => Number.parseInt(value, 10)

const NumberInput: React.FC<{
  outerValue: number
  onChange: (value: number) => void
  min?: number
}> = ({ outerValue, onChange, min = 0 }) => {
  const css = useStyles()
  const [tempValue, setTempValue] = React.useState(`${outerValue}`) // Needs to be string to allow temporarily invalid values

  // Sync inner temporary value to outer value.
  // This is especially required when the outer value is changed by another component.
  React.useEffect(() => setTempValue(`${outerValue}`), [outerValue])

  const debouncedChange = React.useRef(
    // Prepare debounced calls
    _.debounce((newValue: number) => onChange(newValue), 300, { leading: true, trailing: true })
  )

  React.useEffect(() => {
    // Allow input of temporarily invalid data,
    // but only locally. Don't propagate the value change.
    const parsedTempValue = parse(tempValue)
    if (!Number.isNaN(parsedTempValue) && outerValue !== parsedTempValue) {
      debouncedChange.current(parsedTempValue)
    }
  }, [tempValue, outerValue])

  return (
    <TextField
      type="number"
      value={tempValue}
      onChange={(e) => {
        const parsed = parse(e.target.value)
        // Allow temporary empty input, but prevent negative input
        if (e.target.value === '' || parsed >= min) {
          setTempValue(`${parsed}`)
        }
      }}
      onBlur={(e) => {
        const parsed = parse(e.target.value)
        // Reset invalid input to previous value on blur
        if (Number.isNaN(parsed)) {
          setTempValue(`${outerValue}`)
        } else if (parsed > min) {
          setTempValue(`${parsed}`)
        }
      }}
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
        },
      }}
    />
  )
}

export default NumberInput

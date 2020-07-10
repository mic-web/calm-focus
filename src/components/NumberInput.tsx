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
}> = ({ outerValue, onChange }) => {
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
    const parsed = parse(tempValue)
    if (!Number.isNaN(parsed)) {
      debouncedChange.current(parsed)
    }
  }, [tempValue])

  return (
    <TextField
      type="number"
      value={tempValue}
      onChange={(e) => {
        const parsed = parse(e.target.value)
        setTempValue(`${parsed}`)
      }}
      onBlur={(e) => {
        const parsed = parse(e.target.value)
        // Reset invalid input to previous value on blur
        if (Number.isNaN(parsed)) {
          setTempValue(`${outerValue}`)
        } else {
          setTempValue(`${parsed}`)
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
        },
      }}
    />
  )
}

export default NumberInput

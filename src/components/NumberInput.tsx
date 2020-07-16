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
}> = ({ outerValue, min = 0, onChange: commit }) => {
  const css = useStyles()

  const [tempValue, setTempValue] = React.useState(`${outerValue}`) // Needs to be string to allow temporarily invalid values

  // Sync inner temporary value to outer value.
  // This is especially required when the outer value is changed by another component.
  const debouncedSync = React.useRef(
    // Debounce sync to outer value to avoid race conditions
    _.debounce((outerVal: number) => setTempValue(`${outerVal}`), 800, { leading: false, trailing: true })
  )
  React.useEffect(() => {
    debouncedSync.current(outerValue)
  }, [outerValue])

  const updateValue = React.useCallback((valueStr: string) => {
    // Allow input of temporarily invalid data,
    // but only locally. Don't propagate the value change.
    setTempValue(valueStr)
    const parsedTempValue = parse(valueStr)
    if (!Number.isNaN(parsedTempValue)) {
      // Commit only valid values
      commit(parsedTempValue)
      // debouncedCommit.current(parsedTempValue)
    }
  }, [])
  const onChange = React.useCallback(
    (e) => {
      const parsed = parse(e.target.value)
      // Allow temporary empty input, but prevent negative input
      if (e.target.value === '' || parsed >= min) {
        updateValue(`${parsed}`)
      }
    },
    [updateValue, min]
  )
  const onBlur = React.useCallback(
    (e) => {
      const parsed = parse(e.target.value)
      // Reset invalid input to previous value on blur
      if (Number.isNaN(parsed)) {
        updateValue(`${outerValue}`)
      } else if (parsed > min) {
        updateValue(`${parsed}`)
      }
    },
    [updateValue, min, outerValue]
  )

  return (
    <TextField
      type="number"
      value={tempValue}
      onChange={onChange}
      onBlur={onBlur}
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

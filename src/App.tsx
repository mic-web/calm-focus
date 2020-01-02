import React from 'react'
import './App.css'
import ResetIcon from './ResetIcon'
import PauseIcon from './PauseIcon'
import PlayIcon from './PlayIcon'

const milliSecondsPerSecond = 1000
const sessionMinutes = 25
const sessionSeconds = sessionMinutes * 60

enum States {
  INITIAL = 'INITIAL',
  COMPLETED = 'COMPLETED',
  RUNNING = 'RUNNING',
  PAUSED = 'PAUSED',
}

const StateClassMap = {
  [States.INITIAL]: 'initial',
  [States.COMPLETED]: 'completed',
  [States.RUNNING]: 'running',
  [States.PAUSED]: 'paused',
}

const App: React.FC = () => {
  const [secondsLeft, setSecondsLeft] = React.useState(sessionSeconds)
  const [isActive, setIsActive] = React.useState(false)
  const [isInitial, setIsInitial] = React.useState(true)

  function pause() {
    setIsActive(false)
  }
  function start() {
    setIsActive(true)
  }
  function reset() {
    setSecondsLeft(sessionMinutes)
    setIsActive(false)
    setIsInitial(true)
  }

  React.useEffect(() => {
    function tick() {
      setSecondsLeft(secondsLeft > 0 ? secondsLeft - 1 : 0)
    }
    let interval: number = -1
    if (isActive) {
      setIsInitial(false)
      interval = window.setInterval(tick, milliSecondsPerSecond)
    } else if (!isActive && secondsLeft !== 0) {
      clearInterval(interval)
    }
    return () => {
      clearInterval(interval)
    }
  }, [isActive, secondsLeft])

  function getProgress() {
    if (getState() === States.INITIAL) {
      return 1
    } else {
      return (sessionSeconds - secondsLeft) / sessionSeconds
    }
  }

  function getState() {
    if (isInitial) {
      return States.INITIAL
    } else if (secondsLeft === 0) {
      return States.COMPLETED
    } else if (!isActive) {
      return States.PAUSED
    } else {
      return States.RUNNING
    }
  }
  const minutesLeft = Math.round(secondsLeft / 60)
  return (
    <div className={`app app--${StateClassMap[getState()]}`}>
      <div className={`completed-background`}></div>
      <main className={`main-container`}>
        <div className={`time-container`}>
          <Circle progress={getProgress()} />
          <div className="time-left">{minutesLeft}</div>
        </div>
        <div className="controls">
          <StartButton
            state={getState()}
            start={start}
            pause={pause}
            resume={start}
          />
          <ResetIcon
            onClick={reset}
            className={`
              icon-button
              reset
            `}
          />
        </div>
      </main>
      {getState() === States.COMPLETED && (
        <div className="hint">Pause for 5 minutes</div>
      )}
    </div>
  )
}

type StartButtonProps = {
  state: States
  start: () => void
  pause: () => void
  resume: () => void
}

const StartButton: React.FC<StartButtonProps> = ({
  state,
  start,
  pause,
  resume,
}) => {
  switch (state) {
    case States.INITIAL:
    case States.COMPLETED:
      return (
        <PlayIcon
          className={`
            icon-button
            icon-button-primary
            ${state === States.COMPLETED && 'disabled'}
          `}
          onClick={start}
        />
      )
    case States.RUNNING:
      return (
        <PauseIcon
          className={`
            icon-button
            icon-button-secondary
          `}
          onClick={pause}
        />
      )
    case States.PAUSED:
      return (
        <PlayIcon
          className={`
            icon-button
            icon-button-primary
          `}
          onClick={resume}
        />
      )
  }
}

type CircleProps = {
  progress: number
}

const Circle: React.FC<CircleProps> = props => {
  const progress = props.progress
  const radius = 60
  const stroke = 2

  const normalizedRadius = radius - stroke * 2
  const circumference = normalizedRadius * 2 * Math.PI
  const strokeDashoffset = circumference - progress * circumference
  return (
    <svg height={radius * 2} width={radius * 2}>
      <circle
        className="circle"
        strokeWidth={stroke}
        strokeDasharray={circumference + ' ' + circumference}
        style={{ strokeDashoffset }}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
    </svg>
  )
}

export default App

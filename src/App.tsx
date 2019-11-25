import React from "react";
import clsx from "clsx";
import "./App.css";

const milliSecondsPerMinute = 60 * 10
const sessionMinutes = 2

const App: React.FC = () => {
  const [minutesLeft, setMinutesLeft] = React.useState(sessionMinutes);
  const [isActive, setIsActive] = React.useState(false);
  const [isComplete, setIsComplete] = React.useState(false);

  function toggle() {
    setIsActive(!isActive);
  }

  function reset() {
    setMinutesLeft(sessionMinutes);
    setIsActive(false);
    setIsComplete(false)
  }

  React.useEffect(() => {
    let interval: number = -1
    if (isActive) {
      interval = window.setInterval(tick, milliSecondsPerMinute);
    } else if (!isActive && minutesLeft !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, minutesLeft]);

  function tick() {
    if (!isTimeOver()) {
      setMinutesLeft(minutesLeft - 1);
    }
  }

  function isTimeOver() {
    return minutesLeft === 0
  }

  let progress = 1
  if (isActive || minutesLeft < sessionMinutes) {
    progress = (sessionMinutes - minutesLeft) / sessionMinutes
  }

  return (
    <div className={clsx("App", isTimeOver() && "time-over")}>
      <main className={`main-container ${isActive ? 'active' : 'inactive'}`}>
        <div className={`time-container`}>
          <Circle progress={progress} />
          <div className='time-left'>{minutesLeft}</div>
        </div>
        <div className="controls">
        <button className="button reset" onClick={reset}>Reset</button>
        <button className={`button button-primary button-primary-${isActive ? 'active' : 'inactive'} ${isComplete ? 'disabled' : ''}`} onClick={toggle}>
          {isActive ? 'Pause' : 'Start'}
        </button>
        </div>
      </main>
    </div>
  );
};

interface CircleProps {
  progress: number
}

const Circle: React.FC<CircleProps> = (props) => {
  const progress = props.progress
  const radius = 60
  const stroke = 4
 
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - progress * circumference;
  return (
    <svg
      height={radius * 2}
      width={radius * 2}
     >
      <circle
        stroke="white"
        fill="transparent"
        strokeWidth={ stroke }
        strokeDasharray={ circumference + ' ' + circumference }
        style={ { strokeDashoffset } }
        r={ normalizedRadius }
        cx={ radius }
        cy={ radius }
       />
    </svg>
  )
}

export default App;

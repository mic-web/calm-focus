import { Seconds } from './types'

export const isSupported = () => typeof Worker !== 'undefined'

let ww: Worker | null = null

type Subscriber = (passedSeconds: Seconds) => void

const subs: Subscriber[] = []

export const subscribe = (subscriber: Subscriber): (() => void) => {
  subs.push(subscriber)
  return () => {
    const idx = subs.findIndex((sub) => sub === subscriber)
    subs.splice(idx, 1)
  }
}

export const startTimer = () => {
  if (isSupported()) {
    if (ww === null) {
      ww = new Worker('/timer.worker.js') // starts counting seconds immediately
      ww.onmessage = (event) => {
        subs.forEach((sub) => sub(event.data))
      }
    }
  } else {
    console.warn('Web worker not supported')
    alert('WW not supported')
  }
}

export const stopTimer = () => {
  if (ww) {
    ww.terminate()
    ww = null
  }
}

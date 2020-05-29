import { Seconds } from '../types'

export const isSupported = () => typeof Worker !== 'undefined'

let ww: Worker | null = null

type Subscriber = (passedSeconds: Seconds) => void

const subs: Subscriber[] = []

let lastMessage: number | null = null
const setLastMessage = (data: number) => {
  lastMessage = data
}
const getLastMessage = () => lastMessage

export const startTimer = () => {
  if (isSupported()) {
    if (ww === null) {
      ww = new Worker('/timer.worker.js') // starts counting seconds immediately
      ww.onmessage = (event) => {
        if (getLastMessage() !== event.data) {
          setLastMessage(event.data)
          subs.forEach((sub) => sub(event.data))
        }
      }
    }
  } else {
    console.warn('Web worker not supported')
  }
}

export const subscribe = (subscriber: Subscriber): (() => void) => {
  subs.push(subscriber)
  const last = getLastMessage()
  if (last !== null) {
    subscriber(last)
  }
  return () => {
    const idx = subs.findIndex((sub) => sub === subscriber)
    subs.splice(idx, 1)
  }
}

export const stopTimer = () => {
  if (ww) {
    ww.terminate()
    ww = null
  }
}

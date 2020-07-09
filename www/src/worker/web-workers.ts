import { Seconds } from '../types'
import { wasmWorkerFileName } from '../../config/paths'

export const isSupported = () => typeof Worker !== 'undefined'

let ww: Worker | null = null

type Subscriber = (passedSeconds: Seconds) => void

const subs: Subscriber[] = []

let lastMessage: number | null = null
const setLastMessage = (data: number) => {
  lastMessage = data
}
const getLastMessage = () => lastMessage
const resetLastMessage = () => {
  lastMessage = null
}

export const loadWorker = () => {
  ww = new Worker(wasmWorkerFileName)
}

export const startTimer = () => {
  if (isSupported() && ww) {
    ww.onmessage = (event) => {
      if (getLastMessage() !== event.data) {
        setLastMessage(event.data)
        subs.forEach((sub) => sub(event.data))
      }
    }
    ww.postMessage(0)
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
  resetLastMessage()
}

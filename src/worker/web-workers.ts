import { Seconds } from '../types'

type Subscriber = (passedSeconds: Seconds) => void

const subs: Subscriber[] = []

const isSupported = () => typeof Worker !== 'undefined'

let ww: Worker | null = null

// Small IFFE for clean memoization of the last message
const msgMemo = (() => {
  let msg: number | null = null
  return {
    get: () => msg,
    set: (data: number) => {
      msg = data
    },
    reset: () => {
      msg = null
    },
  }
})()

export const loadWorker = () => new Worker('/timer.worker.js')

export const stopTimer = () => {
  if (ww) {
    ww.terminate()
    ww = null
  }
  msgMemo.reset()
}

export const startTimer = () => {
  if (isSupported()) {
    if (ww) {
      stopTimer()
    }
    ww = loadWorker() // starts counting seconds immediately
    ww.onmessage = (event) => {
      if (msgMemo.get() !== event.data) {
        msgMemo.set(event.data)
        subs.forEach((sub) => sub(event.data))
      }
    }
  } else {
    console.warn('Web worker not supported')
  }
}

export const subscribe = (subscriber: Subscriber): (() => void) => {
  subs.push(subscriber)
  const last = msgMemo.get()
  if (last !== null) {
    subscriber(last)
  }
  return () => {
    const idx = subs.findIndex((sub) => sub === subscriber)
    subs.splice(idx, 1)
  }
}

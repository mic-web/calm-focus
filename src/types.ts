export enum Phases {
  WORK_READY = 'WORK_READY',
  WORK = 'WORK',
  REST_READY = 'REST_READY',
  REST = 'REST',
}

export type Seconds = number
export type Minutes = number
export type Milliseconds = number

export type PhaseDurations = {
  [Phases.WORK]: Seconds
  [Phases.REST]: Seconds
}

export type Timer = {
  passedSeconds: Seconds
  // startTime: Milliseconds | null // start Date, represented in Milliseconds since 1 January 1970 00:00:00
  phase: Phases
  phaseDurations: PhaseDurations
}

export type StateType = {
  timer: Timer
}

// Automatic generation of actions
// TODO: see this link for alternative:
// dev.to/elisealcala/react-context-with-usereducer-and-typescript-4obm
export type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key
      }
    : {
        type: Key
        payload: M[Key]
      }
}

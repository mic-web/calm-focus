export enum Phases {
  WORK_READY = 'WORK_READY',
  WORK = 'WORK',
  REST_READY = 'REST_READY',
  REST = 'REST',
}

export type EditablePhases = Exclude<Phases, Phases.WORK_READY | Phases.REST_READY>

export type Seconds = number
export type Minutes = number

export type PhaseDurations = {
  [Phases.WORK]: Seconds
  [Phases.REST]: Seconds
}

export type TimerState = {
  passedSeconds: Seconds
  phase: Phases
  autoPlayStarted: boolean
  phaseDurations: PhaseDurations
  autoPlay: boolean
}

export type AppState = {
  timer: TimerState
}

// Automatic generation of actions
// TODO: see this link for alternative:
// dev.to/elisealcala/react-context-with-usereducer-and-typescript-4obm
export type ActionMap<M extends { [index: string]: unknown }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key
      }
    : {
        type: Key
        payload: M[Key]
      }
}

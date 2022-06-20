export type IClockHandsConfig = {
  jump: {
    min: boolean,
    hour: boolean
  }
}

export type IClockTicksShowConfig = {
  min5Label: boolean,
  minLabel: boolean,
  minTicks: boolean,
  hourLabel: boolean,
  hourTicks: boolean
}

export type IClockTicksConfig = {
  show: IClockTicksShowConfig
}

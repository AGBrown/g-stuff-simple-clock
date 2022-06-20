export type IClockHandsConfig = {
  jump: {
    min: boolean,
    hour: boolean
  }
}

export type IClockTicksShowConfig = {
  min5: boolean,
  min: boolean,
  minTicks: boolean,
  hour: boolean,
  hourTicks: boolean
}

export type IClockTicksConfig = {
  show: IClockTicksShowConfig
}

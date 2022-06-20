export type IClockHandsConfig = {
  jump: {
    min: boolean,
    hour: boolean
  }
}

export type IClockTicksShowConfig = {
  min: boolean,
  min5: boolean,
  hour: boolean
}

export type IClockTicksConfig = {
  show: IClockTicksShowConfig
}

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
export type IClockTicksShowConfigKeys = keyof IClockTicksShowConfig;

export type IClockTicksConfig = {
  show: IClockTicksShowConfig
}

const mergeTicksConfig = (
  ticksConfig: IClockTicksConfig,
  newConfig: Partial<IClockTicksShowConfig>) => {
  return {
    ...ticksConfig,
    show: {
      ...ticksConfig.show,
      ...newConfig
    }
  };
};

export {
  mergeTicksConfig
}


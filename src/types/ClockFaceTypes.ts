export type IClockHandsConfig = {
  jump: IClockHandsJumpConfig
}
export type IClockHandsJumpConfig = {
  min: boolean,
  hour: boolean
}

const mergeHandsConfig = (
  config: IClockHandsConfig,
  newConfig: Partial<IClockHandsJumpConfig>) => {
  return {
    ...config,
    jump: {
      ...config.jump,
      ...newConfig
    }
  };
};

export type IClockTicksShowConfig = {
  min5Label: boolean,
  minLabel: boolean,
  minTicks: boolean,
  pastTo: boolean,
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
  mergeHandsConfig,
  mergeTicksConfig
}


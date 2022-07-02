export type Action<T> = (x: T) => void;
export type StateProperty<T> = [T, Action<T>];

export type ITellsTime = {
  date: number
}

export type IClockHandsJumpConfig = {
  min: boolean,
  hour: boolean
}

export type IClockGradnsShowConfig = {
  min5Label: boolean,
  minLabel: boolean,
  minGradns: boolean,
  pastTo: boolean,
  hourLabel: boolean,
  hourGradns: boolean
}
export type IClockGradnsShowConfigKeys = keyof IClockGradnsShowConfig;

export type IClockGradnsConfig = {
  show: IClockGradnsShowConfig
}

const mergeGradnsConfig = (
  gradnsConfig: IClockGradnsConfig,
  newConfig: Partial<IClockGradnsShowConfig>) => {
  return {
    ...gradnsConfig,
    show: {
      ...gradnsConfig.show,
      ...newConfig
    }
  };
};

export {
  mergeGradnsConfig
}

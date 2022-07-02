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

const factory = {
  default: (): IClockGradnsConfig => ({
    show: {
      min5Label: false,
      minLabel: false,
      minGradns: true,
      pastTo: false,
      hourLabel: false,
      hourGradns: true,
    }
  }),
  final: (): IClockGradnsConfig => ({
    show: {
      min5Label: false,
      minLabel: false,
      minGradns: true,
      pastTo: false,
      hourLabel: false,
      hourGradns: true
    }
  })
};

const merge = (
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
  factory,
  merge
}

import type { IClockHandsConfig } from "../clock/Hands";
import { IClockGradnsConfig } from "../utils/Graduations";

export type ITellsTime = {
  date: number
}

export type IClockFaceProps = ITellsTime & {
  handsConfig: IClockHandsConfig;
  gradnsConfig: IClockGradnsConfig;
  expandGradns: boolean
}

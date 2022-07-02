import type { IClockHandsConfig } from "../clock/Hands";
import { IClockGradnsConfig } from "../utils/Graduations";
import { Action } from "./common";

export type ITellsTime = {
  date: number
}

export type IClockFaceProps = ITellsTime & {
  handsConfig: IClockHandsConfig;
  gradnsConfig: IClockGradnsConfig;
  expandGradns: boolean,
  state: string,
  setState: Action<string>
}

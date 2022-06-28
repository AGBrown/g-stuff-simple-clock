export type SetValue<T> = (newValue: T) => void;

export type KnightState = {
  ki: number,
  setKi: SetValue<number>
}

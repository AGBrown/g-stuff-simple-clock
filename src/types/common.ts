export type Action<T> = (x: T) => void;
export type StateProperty<T> = [T, Action<T>];

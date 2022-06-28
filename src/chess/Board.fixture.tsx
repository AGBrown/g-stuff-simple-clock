import { useValue } from "react-cosmos/fixture";
import Board from "./Board";

const numOrZero = (i?: number) => i === undefined ? 0 : i;
function BoardFactory(x?: number, y?: number) {
  const kx = numOrZero(x);
  const ky = numOrZero(y);
  const [ki, setKi] = useValue('ki', { defaultValue: (ky * 8 + kx) as number });
  return <Board { ...{ ki, setKi } } />;
}

const variations = {
  simple: () => BoardFactory(0, 0),
  simple0: () => BoardFactory(0, 0),
  simple1: () => BoardFactory(1, 0),
  simple2: () => BoardFactory(2, 0),
  simple8: () => BoardFactory(0, 1),
}

export default variations;

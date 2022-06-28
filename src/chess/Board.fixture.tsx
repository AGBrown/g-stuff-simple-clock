import Board from "./Board";

function BoardFactory(x?: number, y?: number) {
  var kp = [x === undefined ? 0 : x, y === undefined ? 0 : y] as [number, number];
  return <Board knightPosition={kp} />;
}

const variations = {
  simple: () => BoardFactory(0, 0),
  simple0: () => BoardFactory(0, 0),
  simple1: () => BoardFactory(1, 0),
  simple2: () => BoardFactory(2, 0),
  simple8: () => BoardFactory(0, 1),
}

export default variations;

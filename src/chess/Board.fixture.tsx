import Board from "./Board";

function BoardFactory() {
  return <Board />;
}

const variations = {
  simple: () => BoardFactory(),
}

export default variations;

import React from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import Square from "./Square";
import Knight from "./Knight";
import './Board.css';
import { canMoveKnight, getXY } from './logic/Game';

export type KnightPosition = [x: number, y: number];
export type KnightState = {
  ki: number,
  setKi: (i: number) => void
};
export type BoardProps = {} & KnightState;

function renderSquare(i: number, ki: number, setKi: (i: number) => void) {
  const isKnightHere = i === ki;
  const [x, y] = getXY(i);
  const black = (x + y) % 2 === 1;
  const piece = isKnightHere ? <Knight /> : null;

  return (
    <div key={i} className="board-square-container">
      <div className="board-droptarget"
        onClick={() => setKi(i)}>
        <Square black={black}>{piece}</Square>
      </div>
    </div>
  );
}

const handleMoveFactory = ({ki, setKi}: KnightState) => (to: number) => {
  if (canMoveKnight(ki, to)) setKi(to);
}

function Board(props: BoardProps) {
  const { ki, setKi } = props;
  const handleMove = handleMoveFactory({ki, setKi});

  const squares = [];
  for (let i = 0; i < 64; i++) {
    squares.push(renderSquare(i, ki, handleMove));
  }
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="board">
        {squares}
      </div>
    </DndProvider>
  )
}

export default Board;

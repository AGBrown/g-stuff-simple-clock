import React from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import BoardSquare from './BoardSquare';
import Knight from "./Knight";
import './Board.css';
import { canMoveKnight } from './logic/Game';
import type { SetValue } from './types/Game';

export type BoardProps = {
  ki: number,
  setKi: SetValue<number>
};

function renderSquare(i: number, ki: number, moveKnight: SetValue<number>) {
  const renderPiece = (i: number, ki: number) => (i === ki) ? <Knight /> : undefined;

  return (
    <div key={i} className="board-square-container">
      <BoardSquare { ...{ i, ki, moveKnight } }>
        {renderPiece(i, ki)}
      </BoardSquare>
    </div>
  );
}

const handleMoveFactory = ({ki, setKi}: BoardProps) => (to: number) => {
  if (canMoveKnight(ki, to)) setKi(to);
}

function Board({ki, setKi}: BoardProps) {
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

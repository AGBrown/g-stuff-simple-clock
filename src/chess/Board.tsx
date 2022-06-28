import React from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import BoardSquare from './BoardSquare';
import Knight from "./Knight";
import './Board.css';
import { canMoveKnight } from './logic/Game';
import type { KnightState, SetValue } from './types/Game';

export type BoardProps = {} & KnightState;

function renderSquare(i: number, ki: number, setKi: SetValue<number>) {
  const renderPiece = (i: number, ki: number) => (i === ki) ? <Knight /> : undefined;

  return (
    <div key={i} className="board-square-container">
      <div className="board-droptarget"
        onClick={() => setKi(i)}>
        <BoardSquare { ...{ i } }>
          {renderPiece(i, ki)}
        </BoardSquare>
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

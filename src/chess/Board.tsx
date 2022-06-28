import React from 'react'
import Square from "./Square";
import Knight from "./Knight";
import './Board.css';

export type KnightPosition = [x: number, y: number];
export type BoardProps = {
  knightPosition?: KnightPosition
}

function renderSquare(x: number, y: number, [knightX, knightY]: KnightPosition) {
  const black = (x + y) % 2 === 1;
  const isKnightHere = knightX === x && knightY === y;
  const piece = isKnightHere ? <Knight /> : null;

  return <Square black={black}>{piece}</Square>
}

function Board({ knightPosition }: BoardProps) {
  const kp = knightPosition || [1,0];
  return (
    <div className="Board">
      {renderSquare(0, 0, kp)}
      {renderSquare(1, 0, kp)}
      {renderSquare(2, 0, kp)}
    </div>
  )
}

export default Board;

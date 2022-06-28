import React from 'react'
import Square from "./Square";
import Knight from "./Knight";
import './Board.css';

export type KnightPosition = [x: number, y: number];
export type BoardProps = {
  knightPosition?: KnightPosition
}

function renderSquare(i: number, [knightX, knightY]: KnightPosition) {
  const x = i % 8
  const y = Math.floor(i / 8)
  const isKnightHere = x === knightX && y === knightY
  const black = (x + y) % 2 === 1
  const piece = isKnightHere ? <Knight /> : null

  return (
    <div key={i} style={{ width: '12.5%', height: '12.5%' }}>
      <Square black={black}>{piece}</Square>
    </div>
  )
}

function Board({ knightPosition }: BoardProps) {
  const kp = knightPosition || [1,0];
  const squares = []
  for (let i = 0; i < 64; i++) {
    squares.push(renderSquare(i, kp))
  }
  return (
    <div className="board">
      {squares}
    </div>
  )
}

export default Board;

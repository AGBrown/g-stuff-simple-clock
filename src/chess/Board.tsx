import React from 'react'
import Square from "./Square";
import Knight from "./Knight";

export type KnightPosition = [x: number, y: number];
export type BoardProps = {
  knightPosition?: KnightPosition
}

function Board({ knightPosition }: BoardProps) {
  return (
    <div>
      <Square black>
        <Knight />
      </Square>
    </div>
  )
}

export default Board;

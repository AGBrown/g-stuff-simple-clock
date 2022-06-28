import React from 'react'
import Square from "./Square";
import Knight from "./Knight";
import './Board.css';

export type KnightPosition = [x: number, y: number];
export type BoardProps = {
  ki: number,
  setKi: (i: number) => void
};

function renderSquare(i: number, [knightX, knightY]: KnightPosition, setKi: (i: number) => void) {
  const x = i % 8;
  const y = Math.floor(i / 8);
  const isKnightHere = x === knightX && y === knightY;
  const black = (x + y) % 2 === 1;
  const piece = isKnightHere ? <Knight /> : null;

  return (
    <div key={i} style={{ width: '12.5%', height: '12.5%' }} onClick={() => setKi(i)}>
      <Square black={black}>{piece}</Square>
    </div>
  );
}

function getKp(ki: number) {
  const x = ki % 8;
  const y = (ki - x) / 8;
  return [x, y] as [number, number];
}

function Board(props: BoardProps) {
  const { ki, setKi } = props;
  const squares = [];
  for (let i = 0; i < 64; i++) {
    squares.push(renderSquare(i, getKp(ki), setKi));
  }
  return (
    <div className="board">
      {squares}
    </div>
  )
}

export default Board;

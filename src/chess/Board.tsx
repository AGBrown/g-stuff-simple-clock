import React from 'react'
import Square from "./Square";
import Knight from "./Knight";
import './Board.css';
import { canMoveKnight, getKp } from './logic/Game';

export type KnightPosition = [x: number, y: number];
export type KnightState = {
  ki: number,
  setKi: (i: number) => void
};
export type BoardProps = {} & KnightState;

function renderSquare(i: number, [knightX, knightY]: KnightPosition, setKi: (i: number) => void) {
  const x = i % 8;
  const y = Math.floor(i / 8);
  const isKnightHere = x === knightX && y === knightY;
  const black = (x + y) % 2 === 1;
  const piece = isKnightHere ? <Knight /> : null;

  return (
    <div key={i} style={{ position: 'relative', height: '0', width: '12.5%', paddingBottom: '12.5%' }}>
      <div style={{
        position: 'absolute',
        top: '0',
        right: '0',
        bottom: '0',
        left: '0',
        height: '100%', width: '100%' }}
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
    squares.push(renderSquare(i, getKp(ki), handleMove));
  }
  return (
    <div className="board">
      {squares}
    </div>
  )
}

export default Board;

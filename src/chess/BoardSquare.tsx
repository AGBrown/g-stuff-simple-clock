import React from 'react'
import { getXY } from './logic/Game';
import Square from './Square';

function BoardSquare({ i, children }: { i: number, children?: React.ReactNode }) {
  const [x, y] = getXY(i);
  const black = (x + y) % 2 === 1
  return <Square black={black}>{children}</Square>
}

export default BoardSquare;

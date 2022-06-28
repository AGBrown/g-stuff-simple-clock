import React from 'react'
import { useDrop } from 'react-dnd';
import { ItemTypes } from './logic/Constants';
import { getXY } from './logic/Game';
import Square from './Square';
import type { SetValue } from './types/Game';

export type BoardSquareProps = {
  i: number,
  ki: number,
  moveKnight: SetValue<number>,
  children?: React.ReactNode
};
function BoardSquare({ i, ki, moveKnight, children }: BoardSquareProps) {
  const [, drop] = useDrop(
    () => ({
      accept: ItemTypes.KNIGHT,
      drop: () => moveKnight(i)
    }),
    [ki]
  );

  const [x, y] = getXY(i);
  const black = (x + y) % 2 === 1
  return <div
    ref={drop}
    className="board-droptarget">
    <Square black={black}>{children}</Square>
  </div>
}

export default BoardSquare;

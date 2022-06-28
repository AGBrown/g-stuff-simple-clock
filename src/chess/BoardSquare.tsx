import React from 'react'
import { useDrop } from 'react-dnd';
import { ItemTypes } from './logic/Constants';
import { canMoveKnight, getXY } from './logic/Game';
import Square from './Square';
import type { SetValue } from './types/Game';

export type BoardSquareProps = {
  i: number,
  ki: number,
  moveKnight: SetValue<number>,
  children?: React.ReactNode
};

const isBlack = (i: number) => {
  const [x, y] = getXY(i);
  return (x + y) % 2 === 1;
}
const overlays = ['grey', 'red', 'yellow', 'green'];
const getOverlayIndex = (isOver: boolean, canDrop: boolean, i: number, ki: number) =>
  i === ki && isOver ? 3
  : isOver && !canDrop ? 1
  : !isOver && canDrop ? 2
  : isOver && canDrop ? 3
  : 0;
const hasOverlay = (isOver: boolean, canDrop: boolean, i: number, ki: number) => getOverlayIndex(isOver, canDrop, i, ki) > 0;

function BoardSquare({ i, ki, moveKnight, children }: BoardSquareProps) {
  const [{ isOver, canDrop }, drop] = useDrop(
    () => ({
      accept: ItemTypes.KNIGHT,
      canDrop: () => canMoveKnight(ki, i),
      drop: () => moveKnight(i),
      collect: monitor => ({
        isOver: !!monitor.isOver(),
        canDrop: !!monitor.canDrop(),
      }),
    }),
    [ki, i]
  );

  const black = isBlack(i);
  return <div
    ref={drop}
    className="board-droptarget">
    <Square black={black}>{children}</Square>
      {hasOverlay(isOver, canDrop, i, ki) && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: '100%',
            zIndex: 1,
            opacity: 0.5,
            backgroundColor: overlays[getOverlayIndex(isOver, canDrop, i, ki)],
          }}
        />
      )}
  </div>
}

export default BoardSquare;

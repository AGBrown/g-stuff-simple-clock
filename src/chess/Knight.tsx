import React from 'react'
import { useDrag } from 'react-dnd';
import { ItemTypes } from './logic/Constants';

function Knight() {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.KNIGHT,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    })
  }))

  return <span
    ref={drag}
    style={{
      opacity: isDragging ? 0.5 : 1,
      fontSize: 25,
      fontWeight: 'bold',
      cursor: 'move',
    }}
  >
    ♘
  </span>
}

export default Knight;

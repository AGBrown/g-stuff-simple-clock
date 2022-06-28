import React from 'react'
import Square from "./Square";
import Knight from "./Knight";

function Board() {
  return (
    <div>
      <Square black>
        <Knight />
      </Square>
    </div>
  )
}

export default Board;

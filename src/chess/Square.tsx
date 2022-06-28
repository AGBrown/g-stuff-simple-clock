import React from 'react'
import './Square.css'

function Square({ children, black }: { children?: React.ReactNode, black: boolean }) {
  const sqType=black ? 'square-black' : 'square-white';
  return <div className={`square ${sqType}`}>{children}</div>
}

export default Square;

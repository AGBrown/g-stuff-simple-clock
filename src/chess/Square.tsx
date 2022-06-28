import React from 'react'
import './Square.css'

function Square({ children, black }: { children?: React.ReactNode, black: boolean }) {
  const fill = black ? 'black' : 'white';
  const stroke = !black ? 'black' : 'white';

  const style= {
    backgroundColor: fill,
    color: stroke
  }
  return <div className="square" style={ style }>{children}</div>
}

export default Square;

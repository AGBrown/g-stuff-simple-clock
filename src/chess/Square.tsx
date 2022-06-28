import React from 'react'
import './Square.css'

function Square({ children, black }: { children?: React.ReactNode, black: boolean }) {
  const fill = black ? 'black' : 'white';
  const stroke = !black ? 'black' : 'white';

  const style= {
    backgroundColor: fill,
    color: stroke
  }
  return <div style={{
    position: 'absolute',
    top: '0',
    right: '0',
    bottom: '0',
    left: '0',
    ...style }}>{children}</div>
}

export default Square;

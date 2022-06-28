

function getKp(ki: number) {
  const x = ki % 8;
  const y = (ki - x) / 8;
  return [x, y] as [number, number];
}

function canMoveKnight(from: number, to: number) {
  const [x, y] = getKp(from);
  const [toX, toY] = getKp(to);
  const dx = toX - x;
  const dy = toY - y;

  return (
    (Math.abs(dx) === 2 && Math.abs(dy) === 1) ||
    (Math.abs(dx) === 1 && Math.abs(dy) === 2)
  )
}

export {
  getKp,
  canMoveKnight
}

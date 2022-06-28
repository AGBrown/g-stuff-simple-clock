import React from 'react';

function HelloCosmos(props: { greeting: string, name: string }) {
  const {greeting, name} = props;
  return <h1>{greeting}, {name}!</h1>;
}

export default HelloCosmos;

// Hello.fixture.jsx
import { useValue } from 'react-cosmos/fixture';
import HelloCosmos from './HelloCosmos';

function Fixture() {
  const [greeting] = useValue('greeting', { defaultValue: "Aloha" } );
  const [name] = useValue('name', { defaultValue: "x" } );
  return <HelloCosmos greeting={greeting} name={name} />;
}

export default Fixture;

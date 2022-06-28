// Hello.fixture.jsx
import { useValue } from 'react-cosmos/fixture';
import CounterButton from './CounterButton';

function FixtureFactory(disabled?: boolean) {
  const [count, setCount] = useValue('count', { defaultValue: 0 as number  });
  return <CounterButton disabled={disabled} count={count} increment={() => setCount(count + 1)} />;
};

const fixture = {
  button: () => FixtureFactory(),
  buttonDisabled: () => FixtureFactory(true),
}

export default fixture;

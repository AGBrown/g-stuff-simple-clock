import Knight from "./Knight";
import Square from "./Square";

function FixtureFactory({black, knight}: {black: boolean, knight: boolean}) {
  return <Square black={black}>
    {knight && <Knight />}
    </Square>;
}

const variations = {
  black: () => FixtureFactory({black: true, knight: false}),
  blackWithKnight: () => FixtureFactory({black: true, knight: true}),
  white: () => FixtureFactory({black: false, knight: false}),
  whiteWithKnight: () => FixtureFactory({black: false, knight: true})
}

export default variations;

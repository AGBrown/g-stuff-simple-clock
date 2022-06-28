import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Knight from "./Knight";

function Fixture() {
  return (
    <DndProvider backend={HTML5Backend}>
      <Knight />
    </DndProvider>
  );
}

export default Fixture;

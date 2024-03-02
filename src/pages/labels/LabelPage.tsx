import { Note } from "../../components/note/Note";
import { useNotes } from "../../context/context.js";
import { useLocation } from "react-router-dom";
import { viewAccToState } from "../../types/values.js";

const LabelPage = () => {
  let {
    isFetchSuccessful,
    noteList,
    order,
    filter: { colors },
  } = useNotes();
  let {
    state: { label },
  } = useLocation();

  return (
    <>
      {isFetchSuccessful
        ? viewAccToState(noteList?.notes, order, {
            colors,
            labels: label,
          })?.map((note) => (
            <Note
              id={note.id}
              heading={note.heading}
              message={note.message}
              time={note.time}
              labels={note.labels}
              colors={note.colors}
              priorities={note.priorities}
              key={note.id}
            />
          ))
        : null}
    </>
  );
};

export { LabelPage };

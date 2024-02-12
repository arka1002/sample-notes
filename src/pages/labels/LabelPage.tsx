import { Note } from "../../components/note/Note";
import { useNotes } from "../../context/context.js";
import { Notes } from "../../types/custom.js";
const LabelPage = () => {
  let notes = useNotes();

  let filterLogic = (x: Notes) => {
    if (x.labels === notes.params) {
      return x;
    }
  };
  return (
    <>
      {notes.isFetchSuccessful
        ? notes.noteList?.notes
            .filter(filterLogic)
            .map((note) => (
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

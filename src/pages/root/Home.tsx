import { Note } from "../../components/note/Note.js";
import { useNotes } from "../../context/context.js";
import { viewAccToState } from "../../types/values.js";

const Home = () => {
  // read --> https://stackoverflow.com/a/37562814
  // followup --> https://note-this.vercel.app/
  // src code --> https://github.com/srejitk/Brain_Dump/blob/Temp-Dev/src/components/HomePage/HomePage.jsx#L54

  // 1. select fields ...
  // 2. sort & filter functions ...
  // 3. routes
  // 4. edit feature
  // 5. variable names ( laterzzz.... )
  // ... & done (?????????)

  let { order, isFetchSuccessful, noteList, filter } = useNotes();

  return (
    <>
      {isFetchSuccessful ? (
        viewAccToState(noteList?.notes, order, filter)?.map((note) => (
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
      ) : (
        <></>
      )}
    </>
  );
};

export { Home };

import styles from "./Home.module.css";
import { useState } from "react";
import { type NotesResponse } from "../../types/custom.js";
import { Note } from "../../components/note/Note.js";
import { Form } from "../../components/form/Form.js";
import { useQuery } from "@tanstack/react-query";

const Home = () => {
  // read --> https://stackoverflow.com/a/37562814
  // followup --> https://note-this.vercel.app/
  // src code --> https://github.com/srejitk/Brain_Dump/blob/Temp-Dev/src/components/HomePage/HomePage.jsx#L54

  // 1. select fields ...
  // 2. sort & filter functions ...
  // 3. routes
  // 4. variable names ( laterzzz.... )
  // ... & done (?????????)

  let {
    isPending,
    error: queryError,
    data: notes,
    isSuccess: qSuccessful,
    isError: qsError,
  } = useQuery({
    queryKey: ["note-list"],
    queryFn: (): Promise<NotesResponse> =>
      fetch("/api/notes").then((res) => res.json()),
  });

  const [isFormVisible, setIsFormVisible] = useState<boolean>(false);

  if (qSuccessful) {
    console.log(notes);
  }

  return (
    <>
      <nav className={styles.navigation}>
        <button>open</button>
        <h1 className={styles.heading}>Notes app</h1>
        <ul className={styles.unorderedList}>
          <li className={styles.listItems}>Sign in</li>
          <li className={styles.listItems}>Sign up</li>
        </ul>
      </nav>
      <nav>
        
      </nav>
      <main>
        <section className={styles.headerSection}>
          <h2>My Notes</h2>
          <button>sort</button>
          <button>filter</button>
        </section>
        <button onClick={() => setIsFormVisible(!isFormVisible)}>
          Add Note
        </button>

        <section>
          <Form isFormVisible={isFormVisible} />
          {isPending ? <p>Loading</p> : null}
          {qsError ? <p>{queryError?.message}</p> : null}
          {qSuccessful
            ? notes?.notes.map((note) => (
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
        </section>
      </main>
    </>
  );
};

export { Home };

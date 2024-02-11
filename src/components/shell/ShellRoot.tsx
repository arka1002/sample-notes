import { useQuery } from "@tanstack/react-query";
import { NotesResponse } from "../../types/custom.js";
import { Outlet, useOutletContext, NavLink, useParams } from "react-router-dom";
import styles from "./Shell.module.css";
import { useState } from "react";
import { Form } from "../form/Form.js";
import { labels } from "../../types/values.js";

type ContextType = {
  noteList: NotesResponse | undefined | null;
  isFetchSuccessful: boolean;
  params: string | undefined | null;
};

const ShellRoot = () => {
  // react query hook
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

  let params = useParams();

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
      <nav className={styles.navigation}>
        <NavLink to={'/'}>Home</NavLink>
        {labels.map((label, index) => (
          <NavLink to={`/labels/${label.content}`} key={index}>
            {label.content}
          </NavLink>
        ))}
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
          <div id="detail">
            <Outlet
              context={
                {
                  noteList: notes,
                  isFetchSuccessful: qSuccessful,
                  params: params.label
                } satisfies ContextType
              }
            />
          </div>
        </section>
      </main>
    </>
  );
};

const useNotes = () => {
  return useOutletContext<ContextType>();
};

export { ShellRoot, useNotes };

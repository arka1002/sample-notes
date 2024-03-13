import styles from "./Note.module.css";
import { type Notes } from "../../types/custom.js";
import { useState } from "react";
import { EditForm } from "../form/EditForm.js";

const Note = ({
  id,
  heading,
  message,
  time: forgo,
  labels,
  colors,
  priorities,
}: Notes) => {
  let time = new Date(forgo);
  let [canEdit, setCanEdit] = useState<boolean>(false);

  return (
    <>
      <div className={styles.noteCard} key={id}>
        <div className={styles.noteHeader}>
          <h3>{heading}</h3>
          <button onClick={() => setCanEdit(!canEdit)}>options</button>
        </div>
        <div className={styles.noteContent}>{message}</div>
        {/* fix css */}
        <div>{labels}</div>
        <div className={styles.noteTime}>
          Date
          {` => ${time.getDate()}/${time.getMonth() + 1}/${time.getFullYear()}`}
        </div>
      </div>
      {canEdit && <EditForm id={id} closeForm={setCanEdit} />}
    </>
  );
};

export { Note };

import { FormEvent, useState } from "react";
import styles from "./Form.module.css";
import * as VALUES from "../../types/values.js";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { formErrorMessages } from "../../types/custom.js";
import { codeForValue } from "./Form.js";

type EditFormProps = {
  id: number;
  closeForm: (val: boolean) => void;
};

export const EditForm = ({ id, closeForm }: EditFormProps) => {
  // useQueryClient hook
  let queryClient = useQueryClient();
  let {
    isPending: noteOngoing,
    isError: ongoingError,
    isSuccess: woohoo,
    error: mutationErr,
    mutate: mutOp,
  } = useMutation({
    mutationFn: (body: any) => {
      return fetch("/api/notes/edit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["note-list"],
      });
      closeForm(false);
    },
  });
  // error states
  let [errorState, setErrorState] = useState<formErrorMessages>({
    content: false,
    heading: false,
  });

  // custom functions
  let ifHeadIsEmpty = (text: string, clonedStateObject: formErrorMessages) => {
    if (text === "") {
      clonedStateObject.heading = true;
      setErrorState(clonedStateObject);
      return;
    }
    clonedStateObject.heading = false;
    setErrorState(clonedStateObject);
  };

  let ifContentIsEmpty = (
    text: string,
    clonedStateObject: formErrorMessages
  ) => {
    if (text === "") {
      clonedStateObject.content = true;
      setErrorState(clonedStateObject);
      return;
    }
    clonedStateObject.content = false;
    setErrorState(clonedStateObject);
  };

  let formSubmitter = (event: FormEvent): undefined => {
    event.preventDefault();
    let foo = new FormData(event.target as HTMLFormElement);

    if (
      (foo.get(VALUES.heading_field) as string).trim() === "" ||
      (foo.get(VALUES.content_field) as string).trim() === ""
      /* if the fields are empty ....... */
    ) {
      let foosh = structuredClone(errorState);
      ifHeadIsEmpty((foo.get(VALUES.heading_field) as string).trim(), foosh);
      ifContentIsEmpty((foo.get(VALUES.content_field) as string).trim(), foosh);
      return;
    }

    foo.append("time", new Date().toUTCString());
    const buzzy: any = {};
    foo.forEach((value, key) => (buzzy[key] = value));
    buzzy.colors = codeForValue(VALUES.colors, buzzy.colors);
    buzzy.id = id;
    console.log("edited id ->", id);
    mutOp(buzzy);
  };

  return (
    <>
      <form className={styles.form} onSubmit={formSubmitter}>
        <label>
          Heading
          <input type="text" name={VALUES.heading_field} />
        </label>
        <label>
          Content
          <textarea name={VALUES.content_field} cols={30} rows={10}></textarea>
        </label>
        <label>
          Labels
          <select name={VALUES.label_select}>
            {VALUES.labels.map((item, index) => (
              <option value={item.value} key={index}>
                {item.content}
              </option>
            ))}
          </select>
        </label>
        <label>
          Color
          <select name={VALUES.colors_select}>
            {VALUES.colors.map((color, index) => (
              <option key={index} style={{ backgroundColor: color.code }}>
                {color.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Priorities
          <select name={VALUES.priority_select}>
            {VALUES.priorities.map((priority, index) => (
              <option key={index}>{priority}</option>
            ))}
          </select>
        </label>
        <button type="submit">Submit</button>
        {noteOngoing ? <p>pending....</p> : null}
        {ongoingError ? <p>{mutationErr?.message}</p> : null}
        {woohoo ? <p>success</p> : null}
      </form>
    </>
  );
};

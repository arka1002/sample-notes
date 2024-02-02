import { useState, FormEvent, useRef } from "react";
import {
  formErrorMessages,
  ColorsField,
} from "../../types/custom.js";
import * as VALUES from "../../types/values.js";
import styles from "./Form.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type FormProps = {
  isFormVisible: boolean;
};

const codeForValue = (colorsArray: ColorsField, colorValue: string) => {
  const color = colorsArray.find((color) => color.name === colorValue);
  return color?.code;
};

const Form = ({ isFormVisible }: FormProps) => {
  // useQueryClient hook
  let queryClient = useQueryClient();
  let foo = useRef<HTMLInputElement | null>(null);

  // mutation hook
  let {
    isPending: noteOngoing,
    isError: ongoingError,
    isSuccess: woohoo,
    error: mutationErr,
    mutate: mutOp,
  } = useMutation({
    mutationFn: (body: any) => {
      return fetch("/api/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["note-list"],
      });
      let notes_form = foo.current?.parentNode as HTMLFormElement;
      notes_form.reset();
      foo.current?.focus();
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

  let formSubmitter = (event: FormEvent) => {
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

    // if it reaches here ---> fields arent empty it means;

    // react will update the state after the event handler finishes its execution - source - https://github.com/reactwg/react-18/discussions/46#discussioncomment-846862
    let buzz = structuredClone(errorState);
    buzz.content = false;
    buzz.heading = false;
    setErrorState(buzz);

    foo.append("time", new Date().toUTCString());
    const buzzy: any = {};
    foo.forEach((value, key) => (buzzy[key] = value));
    buzzy.colors = codeForValue(VALUES.colors, buzzy.colors);
    console.log(buzzy);
    mutOp(buzzy);
  };

  if (isFormVisible === false) {
    return <></>;
  }

  return (
    <>
      <form className={styles.form} onSubmit={formSubmitter}>
        <label htmlFor="note-heading">Heading</label>
        {errorState.heading ? <p>please write something in heading</p> : null}
        <input
          type="text"
          id="note-heading"
          name={VALUES.heading_field}
          ref={foo}
        />
        <label htmlFor={VALUES.content_field}>Contents</label>
        {errorState.content ? <p>please write something in content</p> : null}
        <textarea
          name={VALUES.content_field}
          id={VALUES.content_field}
          cols={30}
          rows={10}
        ></textarea>
        <label htmlFor={VALUES.label_select}>Labels</label>
        <select name={VALUES.label_select} id={VALUES.label_select}>
          {VALUES.labels.map((item, index) => (
            <option value={item.value} key={index}>
              {item.content}
            </option>
          ))}
        </select>
        <label htmlFor={VALUES.colors_select}>Color</label>
        <select name={VALUES.colors_select} id={VALUES.colors_select}>
          {VALUES.colors.map((color, index) => (
            <option key={index} style={{ backgroundColor: color.code }}>
              {color.name}
            </option>
          ))}
        </select>
        <label htmlFor={VALUES.priority_select}>Priorities</label>
        <select name={VALUES.priority_select} id={VALUES.priority_select}>
          {VALUES.priorities.map((priority, index) => (
            <option key={index}>{priority}</option>
          ))}
        </select>
        <button type="submit">Submit</button>
        {noteOngoing ? <p>pending....</p> : null}
        {ongoingError ? <p>{mutationErr?.message}</p> : null}
        {woohoo ? <p>success</p> : null}
      </form>
    </>
  );
};

export { Form };

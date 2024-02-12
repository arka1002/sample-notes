import { useQuery } from "@tanstack/react-query";
import {
  NotesResponse,
  ContextType,
  Visibilities,
  OrderTypes,
} from "../../types/custom.js";
import { Outlet, NavLink, useParams } from "react-router-dom";
import styles from "./Shell.module.css";
import { useState } from "react";
import { Form } from "../form/Form.js";
import { labels } from "../../types/values.js";
import { SortForm } from "../sort/SortForm.js";
import { FilterForm } from "../filter/FilterForm.js";

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

  let params = useParams();

  let [isVisible, setIsVisible] = useState<Visibilities>({
    isFormVisible: false,
    isSortVisible: false,
    isFilterVisible: false,
  });

  let [order, setOrder] = useState<OrderTypes>({
    dateStartFromToday: false,
    dateStartFromPast: false,
  });

  let setDateAscending = (): undefined => {
    let another_clone = structuredClone(order);
    another_clone.dateStartFromToday = true;
    another_clone.dateStartFromPast = false;
    setOrder(another_clone);
  };

  let setDateDesc = (): undefined => {
    let another_clone = structuredClone(order);
    another_clone.dateStartFromToday = false;
    another_clone.dateStartFromPast = true;
    setOrder(another_clone);
  };

  let clearAll = (): undefined => {
    let another_clone = structuredClone(order);
    another_clone.dateStartFromToday = false;
    another_clone.dateStartFromPast = false;
    setOrder(another_clone);
  };

  let viewForm = () => {
    let another_clone = structuredClone(isVisible);
    another_clone.isFormVisible = !another_clone.isFormVisible;
    setIsVisible(another_clone);
  };

  let viewSort = () => {
    let another_clone = structuredClone(isVisible);
    another_clone.isSortVisible = !another_clone.isSortVisible;
    setIsVisible(another_clone);
  };

  let viewFilter = () => {
    let another_clone = structuredClone(isVisible);
    another_clone.isFilterVisible = !another_clone.isFilterVisible;
    setIsVisible(another_clone);
  };

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
        <NavLink to={"/"}>Home</NavLink>
        {labels.map((label, index) => (
          <NavLink to={`/labels/${label.content}`} key={index}>
            {label.content}
          </NavLink>
        ))}
      </nav>
      <main>
        <section className={styles.headerSection}>
          <h2>My Notes</h2>
          <div className={styles.sort}>
            <button onClick={viewSort}>Sort</button>
            <SortForm
              isFormVisible={isVisible.isSortVisible}
              checkedValues={order}
              handleAsc={setDateAscending}
              handleDesc={setDateDesc}
              clearAll={clearAll}
            />
          </div>
          <div className={styles.sort}>
            <button onClick={viewFilter}>Filter</button>
            <FilterForm isFormVisible={isVisible.isFilterVisible}  />
          </div>
        </section>
        <button onClick={viewForm}>Add Note</button>
        <section>
          <Form isFormVisible={isVisible.isFormVisible} />
          {isPending ? <p>Loading</p> : null}
          {qsError ? <p>{queryError?.message}</p> : null}
          <div id="detail">
            <Outlet
              context={
                {
                  noteList: notes,
                  isFetchSuccessful: qSuccessful,
                  params: params.label,
                  order,
                } satisfies ContextType
              }
            />
          </div>
        </section>
      </main>
    </>
  );
};

export { ShellRoot };

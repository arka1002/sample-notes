import styles from "./SortForm.module.css";
import { OrderTypes } from "../../types/custom.js";

type SortFormProps = {
  isFormVisible: boolean;
  checkedValues: OrderTypes;
  handleAsc: () => undefined;
  handleDesc: () => undefined;
  clearAll: () => undefined;
};

const SortForm = ({
  isFormVisible,
  checkedValues: { dateStartFromPast, dateStartFromToday },
  handleAsc,
  handleDesc,
  clearAll,
}: SortFormProps) => {
  if (isFormVisible === false) {
    return <></>;
  }
  let date_ids = {
    ascending: "date-start-from-today",
    descending: "date-start-from-earliest",
  };
  return (
    <>
      <div className={styles.dropDown}>
        <input
          type="radio"
          name="date"
          id={date_ids.ascending}
          onChange={handleAsc}
          checked={dateStartFromToday}
        />
        <label htmlFor={date_ids.ascending}>{date_ids.ascending}</label>
        <input
          type="radio"
          name="date"
          id={date_ids.descending}
          onChange={handleDesc}
          checked={dateStartFromPast}
        />
        <label htmlFor={date_ids.descending}>{date_ids.descending}</label>
        <button onClick={clearAll}>Clear All</button>
      </div>
    </>
  );
};

export { SortForm };

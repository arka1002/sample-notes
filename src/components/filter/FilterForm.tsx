import styles from "../sort/SortForm.module.css";
import {
  labels,
  colors,
  label_select,
  colors_select,
} from "../../types/values.js";
import { ChangeEvent } from "react";
import { FilterTypes } from "../../types/custom.js";

type FilterForm = {
  isFormVisible: boolean;
  filterState: FilterTypes;
  changeFilter: (val: FilterTypes) => undefined;
};

const FilterForm = ({
  isFormVisible,
  filterState,
  changeFilter,
}: FilterForm) => {
  if (isFormVisible === false) {
    return <></>;
  }
  let setLabel = (labelName: string) => {
    changeFilter({ ...filterState, labels: labelName });
  };

  let setColor = (colorName: string, event: ChangeEvent<HTMLInputElement>) => {
    console.log({ colorName, event });
  };
  return (
    <>
      <div className={styles.dropDown}>
        {labels.map((label, index) => (
          <label key={index}>
            {label.value}
            <input
              type="radio"
              name={label_select}
              id={label.content}
              onChange={() => setLabel(label.content)}
            />
          </label>
        ))}
        {colors.map((color, index) => (
          <label
            style={{ backgroundColor: color.code }}
            className={styles.colorFilter}
            key={index}
          >
            <input
              type="radio"
              name={colors_select}
              id={color.name}
              onChange={(event) => setColor(color.name, event)}
            />
          </label>
        ))}
      </div>
    </>
  );
};

export { FilterForm };

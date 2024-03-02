import styles from "../sort/SortForm.module.css";
import {
  labels,
  colors,
  label_select,
  colors_select,
} from "../../types/values.js";
import { FilterTypes } from "../../types/custom.js";
import { useParams } from "react-router-dom";

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

  let { label: labelParam } = useParams();

  let setLabel = (labelName: string) => {
    if (labelParam === labelName) {
      return;
    }
    changeFilter({ ...filterState, labels: labelName });
  };

  let setColor = (colorCode: string) => {
    changeFilter({ ...filterState, colors: colorCode });
  };

  let clearFilters = () => {
    if (labelParam !== undefined) {
      changeFilter({ ...filterState, colors: undefined });
      return
    }
    changeFilter({ labels: undefined, colors: undefined });
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
              checked={
                labelParam === undefined
                  ? label.content === filterState.labels
                  : label.content === labelParam
              }
              onChange={() => setLabel(label.content)}
            />
          </label>
        ))}
        {colors.map((color, index) => (
          <label
            style={{ backgroundColor: color.code, border: "1px solid black" }}
            className={styles.colorFilter}
            key={index}
          >
            <input
              type="radio"
              name={colors_select}
              id={color.name}
              checked={color.code === filterState.colors}
              onChange={() => setColor(color.code)}
            />
          </label>
        ))}
        <button onClick={clearFilters}>Clear Filters</button>
      </div>
    </>
  );
};

export { FilterForm };

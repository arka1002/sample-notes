import {
  SelectFields,
  ColorsField,
  Notes,
  OrderTypes,
  FilterTypes,
} from "./custom.js";

let heading_field = "heading";
let content_field = "message";
let label_select = "labels";
let colors_select = "colors";
let priority_select = "priorities";

let guzz: SelectFields = [
  {
    value: "todo",
    content: "Todo",
  },
  {
    value: "work",
    content: "Work",
  },
  {
    value: "chore",
    content: "Chore",
  },
  {
    value: "shopping",
    content: "Shopping",
  },
];

let colors: ColorsField = [
  {
    code: "#fff",
    name: "white",
  },
  {
    code: "#8AB9F6",
    name: "blue",
  },
  {
    code: "#F7716E",
    name: "red",
  },
  {
    code: "#8CE590",
    name: "green",
  },
  {
    code: "#F0D042",
    name: "yellow",
  },
];

let priorities: Array<string> = ["Low", "Medium", "High"];

let viewAccToState = (
  notesArray: Notes[] | undefined,
  sortingOrder: OrderTypes,
  { colors, labels }: FilterTypes
) => {
  // if filter & sort are both applied, lets filter 1st & then sort acc to date
  // if only filter is applied, and no sort just give the filtered output
  // same with sort ed ness

  // colors can be undefined or contain a string of a color code
  // labels can be undefined or contain a label name

  let temporaryArray: Notes[];

  if (colors === undefined && labels === undefined) {
    temporaryArray = notesArray as Notes[];
  } else if (colors === undefined && labels !== undefined) {
    temporaryArray = notesArray?.filter(note => {
      if (note.labels === labels) {
        return note;
      }
    }) as Notes[];
  } else if (colors !== undefined && labels === undefined) {
    temporaryArray = notesArray?.filter(note => {
      if (note.colors === colors) {
        return note;
      }
    }) as Notes[];
  } else {
    temporaryArray = notesArray?.filter(note => {
      if (note.colors === colors && note.labels === labels) {
        return note;
      }
    }) as Notes[];
  }

  if (
    sortingOrder.dateStartFromToday === false &&
    sortingOrder.dateStartFromPast === false
  ) {
    return temporaryArray;
  }

  if (sortingOrder.dateStartFromToday) {
    return temporaryArray.sort((a, b) => {
      let foo = new Date(a.time).getTime();
      let bazz = new Date(b.time).getTime();
      return bazz - foo;
    });
  }

  if (sortingOrder.dateStartFromPast) {
    return temporaryArray.sort((a, b) => {
      let foo = new Date(a.time).getTime();
      let bazz = new Date(b.time).getTime();
      return foo - bazz;
    });
  }
};

export {
  priorities,
  colors,
  guzz as labels,
  priority_select,
  colors_select,
  label_select,
  heading_field,
  content_field,
  viewAccToState,
};

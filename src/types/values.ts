import { SelectFields, ColorsField } from "./custom.js";

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

export {
  priorities,
  colors,
  guzz as labels,
  priority_select,
  colors_select,
  label_select,
  heading_field,
  content_field,
};

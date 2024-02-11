import { createServer } from "miragejs";
import { NotesResponse } from "../types/custom.js";

let DB_v2: NotesResponse = {
  notes: [
    {
      id: 1,
      heading: "Hi Mom",
      message: "I love you mom",
      time: new Date(2009, 1, 9, 10, 0, 30),
      labels: "Todo",
      colors: "#fff",
      priorities: "Low"
    },
    {
      id: 2,
      heading: "Hi Dad",
      message: "I love you dad",
      time: new Date(2008, 1, 9, 10, 0, 30),
      labels: "Work",
      colors: "#F0D042",
      priorities: "Medium"
    },
    {
      id: 3,
      heading: "Hi Sis",
      message: "I love you sis",
      time: new Date(2007, 1, 9, 10, 0, 30),
      labels: "Chore",
      colors: "#8CE590",
      priorities: "High"
    },
  ],
};

const runServer = () => {
  createServer({
    routes() {
      this.namespace = "api";

      this.get("/notes", () => DB_v2);

      this.post("/notes", (schema, { requestBody }) => {
        let noteRes = JSON.parse(requestBody);
        noteRes.time = new Date(noteRes?.time);
        let new_id = DB_v2.notes[DB_v2.notes.length - 1].id + 1;
        noteRes.id = new_id;
        DB_v2.notes.push(noteRes);
        return { message: "success" };
      });
    },
  });
};

export { runServer };

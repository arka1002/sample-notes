/** The file for every object & complicated types. */
/** ############################################## */

/**
 * the error message format of the input form
 */
type formErrorMessages = {
  heading: boolean;
  content: boolean;
};

type Movie = {
  id: number;
  name: string;
  year: number;
};

type MovieResponse = {
  movies: Movie[];
};

type Notes = {
  id: number;
  heading: string;
  message: string;
  time: Date | string;
  labels: string;
  colors: string;
  priorities: string;
};

type NotesResponse = {
  notes: Notes[];
};

type SelectFields = {
  value: string;
  content: string;
}[];

type ColorsField = {
  code: string;
  name: string;
}[];

export {
  type formErrorMessages,
  type MovieResponse,
  type NotesResponse,
  type Notes,
  type SelectFields,
  type ColorsField
};

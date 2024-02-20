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

type FilterTypes = {
  labels: string | undefined;
  colors: string | undefined;
};

type ContextType = {
  noteList: NotesResponse | undefined | null;
  isFetchSuccessful: boolean;
  params: string | undefined | null;
  order: OrderTypes;
  filter: FilterTypes;
};

type Visibilities = {
  isFormVisible: boolean;
  isSortVisible: boolean;
  isFilterVisible: boolean;
};

type OrderTypes = {
  dateStartFromToday: boolean;
  dateStartFromPast: boolean;
};

export {
  type formErrorMessages,
  type MovieResponse,
  type NotesResponse,
  type Notes,
  type SelectFields,
  type ColorsField,
  type ContextType,
  type Visibilities,
  type OrderTypes,
  type FilterTypes,
};

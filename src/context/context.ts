import { useOutletContext } from "react-router-dom";
import { ContextType } from "../types/custom.js";

const useNotes = () => {
  return useOutletContext<ContextType>();
};

export { useNotes };

import { useSelector } from "react-redux";
import { RootState } from "../reducers";

/**
 * Determine if the user is currently typings something in the search box
 */
export function useSearching() {
  const { partialTerm, term } = useSelector(({filters: {partialTerm, term}}: RootState) => ({partialTerm, term}));

  return partialTerm !== term;

}

import { useSelector } from "react-redux";
import { RootState } from "../reducers";
import { useActions } from "../actions";
import * as ReduxActions from "../actions/favourite";

export function useFavourite(module: string) {
  const favourites = useSelector((state: RootState) => state.favourites);
  const { toggleFavourite } = useActions(ReduxActions);

  return {
    toggle: () => toggleFavourite(module),
    isFavourite: favourites.indexOf(module) !== -1
  }

}

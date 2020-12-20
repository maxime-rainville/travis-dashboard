import { ActionType } from "../reducers/ActionTypes";

export enum Actions {
  INIT_FAV = "INIT_FAV"
}

export type Action =
  | ActionType<typeof Actions.INIT_FAV, string[]>
;

const FAVOURITES = 'FAVOURITES';

function currentFavs(): string[] {
  const favs = localStorage.getItem(FAVOURITES);
  return favs?.split(',') || [];
}

export function initFavourite() {
  return {type: Actions.INIT_FAV, payload: currentFavs()}
}

export function toggleFavourite(fav: string) {
  const favs = currentFavs();

  const idx = favs.indexOf(fav);

  if (idx === -1) {
    favs.push(fav)
  } else {
    favs.splice(idx, 1);
  }

  localStorage.setItem(FAVOURITES, favs.join(','));

  console.dir(favs)

	return {type: Actions.INIT_FAV, payload: favs};
}

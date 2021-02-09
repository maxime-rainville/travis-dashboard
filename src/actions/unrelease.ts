import { genericHttpAction, CompareDataPayload, ActionType } from "./genericHttpAction";

export enum UnreleaseActions {
  LOADING = "LOADING_UNRELEASE",
  LOADED = "UNRELEASE_LOADED"
}

export type UnreleaseAction =
  | ActionType<typeof UnreleaseActions.LOADING, void>
  | ActionType<typeof UnreleaseActions.LOADED, CompareDataPayload>
;

export const initUnreleaseData = genericHttpAction(
  'unrelease',
  UnreleaseActions.LOADING,
  UnreleaseActions.LOADED
);

import { genericHttpAction, CompareDataPayload, ActionType } from "./genericHttpAction";

export enum MergeupActions {
  LOADING = "LOADING_MERGEUP",
  LOADED = "MERGEUP_LOADED"
}

export type MergeupAction =
  | ActionType<typeof MergeupActions.LOADING, void>
  | ActionType<typeof MergeupActions.LOADED, CompareDataPayload>
;

export const initMergeupData = genericHttpAction(
  'mergeup',
  MergeupActions.LOADING,
  MergeupActions.LOADED
);

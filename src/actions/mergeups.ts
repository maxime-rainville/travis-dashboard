import { MergeupData } from "../model";
import { genericHttpAction, DataPayload, ActionType } from "./genericHttpAction";

export interface MergeupDataPayload extends  DataPayload<MergeupData> {};

export enum MergeupActions {
  LOADING = "LOADING_MERGEUP",
  LOADED = "MERGEUP_LOADED"
}

export type MergeupAction =
  | ActionType<typeof MergeupActions.LOADING, void>
  | ActionType<typeof MergeupActions.LOADED, MergeupDataPayload>
;

export const initMergeupData = genericHttpAction(
  'mergeup',
  MergeupActions.LOADING,
  MergeupActions.LOADED
);

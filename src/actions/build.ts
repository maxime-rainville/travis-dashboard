import { BuildData } from "../model";
import { genericHttpAction, DataPayload, ActionType } from "./genericHttpAction";

export interface BuildDataPayload extends  DataPayload<BuildData> {};

export enum BuildActions {
  LOADING_BUILDS = "LOADING_BUILDS",
  BUILD_LOADED = "BUILD_LOADED",
}

export type BuildAction =
  | ActionType<typeof BuildActions.LOADING_BUILDS, void>
  | ActionType<typeof BuildActions.BUILD_LOADED, BuildDataPayload>
;

export const initBuildData = genericHttpAction(
  'buildData',
  BuildActions.LOADING_BUILDS,
  BuildActions.BUILD_LOADED
);

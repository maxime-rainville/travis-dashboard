
export type BuildStateType = 'passed'|'errored'|'failed'|'running'|'expired'|'canceled'|'created'|'started';
export type FilterType = 'all'|'latestStable';
export type CategoryFilterType = 'core'|'supported'|'unsupported'|'nonmodule';

export interface BranchData {
  id: number
  started_at: string
  state: BuildStateType
}

export interface BranchList {
  [branch: string]: BranchData
}

export interface BuildData {
  [module: string]: {
    [branch: string]: BranchData
  }
}

export interface BuildDataPayload {
  json: BuildData
  lastModified: Date
}

export interface SetTermPayload {
  term: string, 
  triggerSearchTimeout: number
}

export interface SetCatPayload {
  categoryFilters: CategoryFilterType[]
}
export interface Module {
  name: string
  branches: BranchList
  state: BuildStateType
}

export type BuildActionType<t,p> = {
  type: t
  payload: p
}

export enum BuildActions {
  LOADING_BUILDS = "LOADING_BUILDS",
  BUILD_LOADED = "BUILD_LOADED",
  TOGGLE_FILTER = "TOGGLE_FILTER",
  SET_TERM = "SET_TERM",
  TRIGGER_SEARCH = "TRIGGER_SEARCH",
  SET_CATEGORY_FILTER = "SET_CATEGORY_FILTER",
}

export type BuildAction =
  | BuildActionType<typeof BuildActions.LOADING_BUILDS, void>
  | BuildActionType<typeof BuildActions.BUILD_LOADED, BuildDataPayload>
  | BuildActionType<typeof BuildActions.TOGGLE_FILTER, void>
  | BuildActionType<typeof BuildActions.SET_TERM, SetTermPayload>
  | BuildActionType<typeof BuildActions.TRIGGER_SEARCH, void>
  | BuildActionType<typeof BuildActions.SET_CATEGORY_FILTER, SetCatPayload>
;

export interface BuildState {
  modules: Module[],
  loading: boolean,
  lastModified?: Date,
  raw: BuildData,
  filter: FilterType,
  term: string,
  triggerSearchTimeout?: number,
  categoryFilters: CategoryFilterType[],
  stats: {[state in BuildStateType]: number}
}


export type BuildStateType = 'passed'|'errored'|'failed'|'running';

export interface BranchData {
  id: number
  started_at: string
  state: BuildStateType
}

export interface BuildData {
  [module: string]: {
    [branch: string]: BranchData
  }
}

export interface Module {
  name: string
  branches: {[branch: string]: BranchData}
  state: BuildStateType
}

export type BuildActionType<t,p> = {
  type: t
  payload: p
}

export enum BuildActions {
  LOADING_BUILDS = "LOADING_BUILDS",
  BUILD_LOADED = "BUILD_LOADED",
}

export type BuildAction =
  | BuildActionType<typeof BuildActions.LOADING_BUILDS, void>
  | BuildActionType<typeof BuildActions.BUILD_LOADED, BuildData>
;

export interface BuildState {
  modules: Module[],
  loading: boolean
}

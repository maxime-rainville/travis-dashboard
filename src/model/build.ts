import { FetchState } from "./generic";

export type BuildStateType = 'passed'|'errored'|'failed'|'running'|'expired'|'canceled'|'created'|'started';

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

export interface Module {
  name: string
  branches: BranchList
  state: BuildStateType
}

export interface BuildState extends FetchState {
  modules: Module[],
}

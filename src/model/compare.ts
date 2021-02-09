import { FetchState } from "./generic";

/**
 * A single comparaison between two branches on a git hub repo.
 */
export interface Comparaison {
  base: string
  head: string
  ahead_by: number
}

/**
 * All the comparaison for a given repository
 */
export interface CompareEntry {
  repo: string
  compares: Comparaison[]
}

/**
 * Merge up data combino in a single array.
 */
export type CompareData = CompareEntry[];

export interface CompareState extends FetchState {
  compares: CompareData
}

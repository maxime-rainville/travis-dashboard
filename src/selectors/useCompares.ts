import { useSelector } from "react-redux";
import { RootState } from "../reducers";
import { useMemo } from "react";
import { filterModuleByCategory } from "./filterModuleByCategory";
import { Comparaison, CompareEntry, CompareState } from "../model";
import { latestBranchFilter } from "./latestBranchFilter";
import { CategoryFilterType } from "../reducers/filters";

/**
 * Which key to use on the comparaison as the branch name
 */
type BranchKey = 'head'|'base';

function branchFilter(compares: Comparaison[], repo: string, branchKey: BranchKey): Comparaison[] {
  const branches = latestBranchFilter(
    compares.map((compare) => compare[branchKey]),
    repo
  );

  return compares.filter((compare) => branches.includes(compare[branchKey]));
}

function sort(a: CompareEntry, b: CompareEntry) {
  if (a.compares.length !== 0 && b.compares.length === 0) {
    return -1;
  }

  if (a.compares.length === 0 && b.compares.length !== 0) {
    return 1;
  }

  const aUpToDate = a.compares.find(({ahead_by}) => ahead_by > 0) === undefined;
  const bUpToDate = b.compares.find(({ahead_by}) => ahead_by > 0) === undefined;

  if (aUpToDate && !bUpToDate) {
    return 1;
  }

  if (!aUpToDate && bUpToDate) {
    return -1;
  }

  return a.repo.localeCompare(b.repo);
}

/**
 * Filter a comparaison list
 * @param compareList
 * @param filter
 * @param categoryFilters
 * @param term
 */
function process(
  compareList: CompareEntry[],
  filter: string,
  categoryFilters: CategoryFilterType[],
  term: string,
  branchKey: BranchKey
) {
  return compareList
    .filter(({repo}) => filterModuleByCategory(repo, categoryFilters))
    .filter(({repo}) => repo.includes(term))
    .map(({compares, repo}) => {
      return {
        compares: filter === 'latestStable' ? branchFilter(compares, repo, branchKey) : compares,
        repo
      }
    })
    .sort(sort);
}

/**
 * Fetch and filter some comparaison data from the redux store
 * @param compareKey
 */
export function useCompares(compareKey: keyof RootState) {
  const state = useSelector((state: RootState) => state);
  const {filters: {categoryFilters, filter, term}} = state;
  const {loading, compares} = state[compareKey] as CompareState;

  // The main branch for merge up is on base, while it's on head for unrelease
  const branchKey = compareKey === 'mergeups' ? 'base' : 'head';

  return {
    loading,
    compares: useMemo(
      () => process(compares, filter, categoryFilters, term, branchKey),
      [compares, categoryFilters, filter, term, branchKey]
    )
  };

}

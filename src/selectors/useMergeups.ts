import { useSelector } from "react-redux";
import { RootState } from "../reducers";
import { useMemo } from "react";
import { filterModuleByCategory } from "./filterModuleByCategory";
import { Comparaison, CompareEntry } from "../model";
import { latestBranchFilter } from "./latestBranchFilter";
import { CategoryFilterType, FilterType } from "../reducers/filters";

function branchFilter(compares: Comparaison[], repo: string): Comparaison[] {
  const branches = latestBranchFilter(
    compares.map(({base}) => base),
    repo
  );

  return compares.filter(({base}) => branches.includes(base));
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

function process(mergeups: CompareEntry[], filter: FilterType, categoryFilters: CategoryFilterType[], term: string) {
  return mergeups
    .filter(({repo}) => filterModuleByCategory(repo, categoryFilters))
    .filter(({repo}) => repo.includes(term))
    .map(({compares, repo}) => ({
      compares: filter === 'latestStable' ? branchFilter(compares, repo) : compares,
      repo
    }))
    .sort(sort);
}

export function useMergeups() {
  const {filters: {categoryFilters, filter, term}, mergeups: {mergeups, loading}} = useSelector((state: RootState) => state);

  return {
    loading,
    mergeups: useMemo(
      () => process(mergeups, filter, categoryFilters, term),
      [mergeups, categoryFilters, filter, term]
    )
  };

}

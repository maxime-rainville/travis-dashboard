import { BranchData, BranchList, BuildStateType, Module } from "../model";
import { CategoryFilterType } from "../reducers/filters";
import { useSelector } from "react-redux";
import { RootState } from "../reducers";
import { useMemo } from "react";
import { filterModuleByCategory } from "./filterModuleByCategory";
import { latestBranchFilter } from "./latestBranchFilter";
import { ReleaseLine, releases, data as SSModules } from "silverstripe-cms-meta";


const statePriority: BuildStateType[][] = [
	['errored', 'failed'],
	['canceled'],
	['expired'],
	['running', 'created', 'started'],
	['passed']
];

/**
 * Sort states with the least desirable one showing up first.
 * @param a
 * @param b
 */
function sortByState(a: BuildStateType, b: BuildStateType) {
	if (a === b) {
		return 0;
	}

	for (const stateGroups of statePriority) {
		if (stateGroups.indexOf(a) > -1) {
			return -1;
		}
		if (stateGroups.indexOf(b) > -1) {
			return 1;
		}
	}

	return 0;
}

/**
 * Sort module by build state and then by name.
 * @param a
 * @param b
 */
function sortModule(a: Module, b: Module) {
	if (a === b) {
		return 0;
	}
	const stateSort = sortByState(a.state, b.state);
	return stateSort !== 0 ? stateSort : a.name.localeCompare(b.name);
}

/**
 * Filter out branches that are not the latest. Branches that will be returned are:
 * - master/main
 * - the next minor release branch
 * - the last two patch release branch
 * @param branches
 * @param mod
 */
function moduleBranchFilter(branches: BranchList, mod: string): BranchList {
	const filteredBranches = latestBranchFilter(
    Object.keys(branches),
    mod
  );

	return filteredBranches.reduce((nextBranches, key) => {
		return key === undefined ?
			nextBranches :
			{...nextBranches, [key]: branches[key]}
	}, {});
}

/**
 * Filter a branch list to return only the branches that ship with a specific release
 * @param branches
 * @param repoName
 * @param releaseName
 * @returns
 */
function moduleBranchFilterByReleaseLine(branches: BranchList, repoName: string, releaseName: string): BranchList {
  const releaseLine: ReleaseLine = releases[releaseName]
  if (!releaseLine) {
    return {}
  }

  const module = SSModules.find(({repo}) => repo === repoName);
  if (!module) {
    return {}
  }

  const moduleVersion = releaseLine[module.name ?? module.repo]
  if (!moduleVersion || !branches[moduleVersion]) {
    return {}
  }

	return {
    [moduleVersion]: branches[moduleVersion]
  }
}

/**
 * Given a list of branches, find the worst "state". (e.g "Running" is worst than "Passing" and "Failed" is worst than "running")
 * This is use to attach a state to a given module.
 * @param accumulator
 * @param param1
 */
function branchStateReduce(accumulator:BuildStateType, {state}:BranchData) {
  return sortByState(accumulator, state) > 0 ? state : accumulator;
}

function postProcess(data: Module[], filter: string, categoryFilters: CategoryFilterType[], term: string) {
  return data
		.filter(({name}) => filterModuleByCategory(name, categoryFilters))
		.filter(({name}) => (name.indexOf(term) !== -1))
		.map(({branches, ...data}) => ({
			branches:
        filter === 'latestStable' ? moduleBranchFilter(branches, data.name) :
        filter === 'all' ? branches :
        moduleBranchFilterByReleaseLine(branches, data.name, filter),
			...data
		}))
		.map(data => ({...data, state: Object.values(data.branches).reduce(branchStateReduce, 'passed')}))
		.sort((a, b) => sortModule(a, b));
}

export function useBuilds() {
  const {filters: {categoryFilters, filter, term}, builds} = useSelector((state: RootState) => state);

  return {
    ...builds,
    modules: useMemo(
      () => postProcess(builds.modules, filter, categoryFilters, term),
      [builds.modules, categoryFilters, filter, term]
    )
  }

}

import { BranchData, BranchList, BuildStateType, Module } from "../model";
import { data as ssModuleData } from "silverstripe-cms-meta";
import { CategoryFilterType, FilterType } from "../reducers/filters";
import { useSelector } from "react-redux";
import { RootState } from "../reducers";
import { useMemo } from "react";


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
	let nextBranches: {
		nextMajor ?: string,
		nextMinor ?: string,
		nextPatch ?: string,
		previousPatch ?: string,
	} = { }

	const keys = Object.keys(branches);


	if (keys.indexOf('master') > -1) {
		nextBranches.nextMajor = 'master';
	} else if (keys.indexOf('main') > -1) {
		nextBranches.nextMajor = 'main';
	}

	const nextMinor = keys.filter(key => key.match(/^\d+$/))
		.map(key => parseInt(key))
		.reduce((a,b) => Math.max(a,b), 0);

	if (nextMinor) {
		nextBranches.nextMinor = nextMinor.toString();
		const patches = keys
			.filter(key => key.match(new RegExp(`^${nextMinor}\\.\\d+$`)))
			.map(key => {
				return key.replace(`${nextMinor}.`, '').trim()
			})
			.map(key => parseInt(key)).sort()
			.slice(-2)
			.map(subVersion => `${nextMinor}.${subVersion}`);

		if (patches.length === 2) {
			nextBranches.nextPatch = patches[1];
			nextBranches.previousPatch = patches[0];
		} else if (patches.length === 1) {
			nextBranches.nextPatch = patches[0];
		}
	}


	return Object.values(nextBranches).reduce((nextBranches, key) => {
		return key === undefined ?
			nextBranches :
			{...nextBranches, [key]: branches[key]}
	}, {});
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

function filterModule(moduleName:string, categoryFilters: CategoryFilterType[]) {
	if (categoryFilters.length === 4) {
		return true;
	}

	const moduleMetaDada = ssModuleData.find((meta) => meta.repo === moduleName );
	return moduleMetaDada ? (
		(categoryFilters.indexOf('core') > -1 && moduleMetaDada.core ) ||
		(categoryFilters.indexOf('supported') > -1 && moduleMetaDada.supported ) ||
		(categoryFilters.indexOf('unsupported') > -1 && !moduleMetaDada.supported )
	) : categoryFilters.indexOf('nonmodule') > -1;
}

function postProcess(data: Module[], filter: FilterType, categoryFilters: CategoryFilterType[], term: string) {
	return data
		.filter((module) => filterModule(module.name, categoryFilters))
		.filter(({name}) => (name.indexOf(term) !== -1))
		.map(({branches, ...data}) => ({
			branches: filter === 'latestStable' ? moduleBranchFilter(branches, data.name) : branches,
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

const removeNulls = <S>(value: S | undefined | null): value is S => value != null && value !== undefined;

/**
 * Filter out branches that are not the latest. Branches that will be returned are:
 * - master/main
 * - the next minor release branch
 * - the last two patch release branches
 * @param branches
 * @param mod
 */
export function latestBranchFilter(branches: string[], mod: string): string[] {
  let nextBranches: {
		nextMajor ?: string,
		nextMinor ?: string,
		nextPatch ?: string,
		previousPatch ?: string,
	} = { }

	if (branches.includes('master')) {
		nextBranches.nextMajor = 'master';
	} else if (branches.includes('main')) {
		nextBranches.nextMajor = 'main';
	}

  const nextMinor = branches.filter(branch => branch.match(/^\d+$/))
		.map(branch => parseInt(branch))
    .reduce((a,b) => Math.max(a,b), 0);

	if (nextMinor) {
		nextBranches.nextMinor = nextMinor.toString();
		const patches = branches
      // Only look at the branches on the same release line as the next minor
      .filter(branch => branch.match(new RegExp(`^${nextMinor}\\.\\d+$`)))
      // Convert the subversion to an INT and sort
      .map(branch => branch.replace(`${nextMinor}.`, '').trim())
			.map(branch => parseInt(branch)).sort()
      // Only keep the last two entries
      .slice(-2)
      // Reconstruct the patch release branch
			.map(subVersion => `${nextMinor}.${subVersion}`);

		if (patches.length === 2) {
			nextBranches.nextPatch = patches[1];
			nextBranches.previousPatch = patches[0];
		} else if (patches.length === 1) {
			nextBranches.nextPatch = patches[0];
		}
  }

  return Object.values(nextBranches).filter(removeNulls);

}

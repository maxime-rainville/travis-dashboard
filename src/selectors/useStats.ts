import { useBuilds } from "./useBuilds";

export function useStats() {
  const {loading, modules} = useBuilds();

  const initStats = {
		'passed': 0,
		'errored': 0,
		'failed': 0,
		'running': 0,
		'expired': 0,
		'canceled': 0,
		'created': 0,
		'started': 0
	};

	const stats =  modules.reduce((accumulator, module) => {
		Object.values(module.branches).forEach(branch => accumulator[branch.state]++);
		return accumulator;
  }, initStats);

  return {stats, loading};
}

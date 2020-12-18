import { BuildState } from "../../model";

/**
 * Inital state of the Build State
 */
export const initialState: BuildState = {
	modules: [],
	loading: true,
	stats: {
		'passed': 0,
		'errored': 0,
		'failed': 0,
		'running': 0,
		'expired': 0,
		'canceled': 0,
		'created': 0,
		'started': 0
	}
};
